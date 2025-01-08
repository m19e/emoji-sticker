'use client'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { Image, Layer, Stage } from 'react-konva'

import { SvgImage } from '@/components/SvgImage'
import { useImageSize } from '@/hooks/useImageSize'
import { baseImgUrlAtom, emojiDatasAtom } from '@/store/atoms'
import type { Dimensions } from '@/types'
import { useMeasure } from 'react-use'
import useImage from 'use-image'

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
  const [selectedEmojiId, setSelectedEmojiId] = useState<string | null>(null)

  const url = useAtomValue(baseImgUrlAtom)
  const [dimensions] = useImageSize(url)
  const [image] = useImage(url ?? '')

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const handleUnselect = () => {
    setSelectedEmojiId(null)
  }

  const handleSelect = (id: string) => {
    setSelectedEmojiId(id)
  }

  const isFullWidth = dimensions.width >= dimensions.height

  return (
    <div
      ref={ref}
      className={isFullWidth ? 'max-h-fit w-full' : 'h-full max-w-fit'}
      style={{
        aspectRatio: `${dimensions.width} / ${dimensions.height}`,
      }}
    >
      <Stage
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
    </div>
  )
}
