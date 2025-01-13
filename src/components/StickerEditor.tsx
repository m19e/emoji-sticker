'use client'
import { useAtom, useAtomValue } from 'jotai'
import { RESET } from 'jotai/utils'
import { SaveIcon } from 'lucide-react'
import { Image, Layer, Stage } from 'react-konva'
import { useMeasure } from 'react-use'

import { SvgImage } from '@/components/SvgImage'
import { Button } from '@/components/ui/button'
import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useImageSize } from '@/hooks/useImageSize'
import {
  baseImgUrlAtom,
  emojiDatasAtom,
  selectedEmojiIdAtom,
} from '@/store/atoms'
import type { Dimensions } from '@/types'

const checkAspectRatio = ({
  img,
  parent,
}: { img: Dimensions; parent: Dimensions }): { isFullWidth: boolean } => {
  if (img.width === img.height) {
    return { isFullWidth: true }
  }
  const isPortraitImg = img.width < img.height

  if (isPortraitImg) {
    // h-fullで横幅あふれる場合を計算する
    const clientWidth = parent.height * (img.width / img.height)
    const isOverflowX = clientWidth >= parent.width
    return { isFullWidth: isOverflowX }
  }

  return { isFullWidth: false }
}

export const Editor = () => {
  const emojis = useAtomValue(emojiDatasAtom)
  const [selectedEmojiId, setSelectedEmojiId] = useAtom(selectedEmojiIdAtom)

  const url = useAtomValue(baseImgUrlAtom)
  const [dimensions] = useImageSize(url)
  const [image] = useAnonymousImage(url ?? '')

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const [canvasRef, { save }] = useCanvasData()

  const handleSave = () => {
    save()
  }

  const handleUnselect = () => {
    setSelectedEmojiId(RESET)
  }

  const handleSelect = (id: string) => {
    setSelectedEmojiId(id)
  }

  const isFullWidth = dimensions.width >= dimensions.height

  return (
    <div
      ref={ref}
      className={
        isFullWidth ? 'relative max-h-fit w-full' : 'relative h-full max-w-fit'
      }
      style={{
        aspectRatio: `${dimensions.width} / ${dimensions.height}`,
      }}
    >
      <Stage
        ref={canvasRef}
        width={width}
        height={height}
        scaleX={width / dimensions.width}
        scaleY={height / dimensions.height}
      >
        <Layer onMouseDown={handleUnselect} onTouchStart={handleUnselect}>
          <Image image={image} x={0} y={0} />
        </Layer>
        <Layer>
          {emojis.map((e) => (
            <SvgImage
              key={e.id}
              u={e.u}
              selected={e.id === selectedEmojiId}
              onSelect={() => handleSelect(e.id)}
            />
          ))}
        </Layer>
      </Stage>
      <Button className="absolute right-0 bottom-0" onClick={handleSave}>
        <SaveIcon />
      </Button>
    </div>
  )
}
