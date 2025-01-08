'use client'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { Image, Layer, Stage } from 'react-konva'

import { SvgImage } from '@/components/SvgImage'
import { useImageSize } from '@/hooks/useImageSize'
import { baseImgUrlAtom, emojiDatasAtom } from '@/store/atoms'
import { useMeasure } from 'react-use'
import useImage from 'use-image'

export const Demo = () => {
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
      className={isFullWidth ? 'max-h-fit w-full' : 'h-full max-w-fit'}
      ref={ref}
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
