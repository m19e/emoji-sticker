'use client'
import { useAtom, useAtomValue } from 'jotai'
import { RESET } from 'jotai/utils'
import { Image, Layer, Stage } from 'react-konva'
import { useMeasure } from 'react-use'

import { ShareDialog } from '@/components/ShareDialog'
import { SvgImage } from '@/components/SvgImage'
import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useImageSize } from '@/hooks/useImageSize'
import {
  baseImgUrlAtom,
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
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
  const rects = useAtomValue(rectanglesAtom)
  const [selectedStickerId, setSelectedStickerId] = useAtom(
    selectedStickerIdAtom,
  )

  const url = useAtomValue(baseImgUrlAtom)
  const [dimensions] = useImageSize(url)
  const [image] = useAnonymousImage(url ?? '')

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const [canvasRef, { save }] = useCanvasData()

  const isFullWidth = dimensions.width >= dimensions.height

  const handleSave = () => {
    const ratio = isFullWidth
      ? dimensions.width / width
      : dimensions.height / height
    save(ratio)
  }

  const handleUnselect = () => {
    setSelectedStickerId(RESET)
  }

  const handleSelect = (id: string) => {
    setSelectedStickerId(id)
  }

  return (
    <>
      <div
        ref={ref}
        className={isFullWidth ? 'max-h-fit w-full' : 'h-full max-w-fit'}
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
                selected={e.id === selectedStickerId}
                onSelect={() => handleSelect(e.id)}
                x={dimensions.width / 2}
                y={dimensions.height / 2}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <ShareDialog onSave={handleSave} />
    </>
  )
}
