'use client'
import { useAtom, useAtomValue } from 'jotai'
import { RESET } from 'jotai/utils'
import type Konva from 'konva'
import type { RefObject } from 'react'
import { Image, Layer, Stage } from 'react-konva'

import { Emoji } from '@/components/sticker/Emoji'
import { Rectangle } from '@/components/sticker/Rectangle'
import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import {
  baseImgUrlAtom,
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'
import type { Dimensions } from '@/types'

type Props = {
  ref: RefObject<Konva.Stage | null>
  width: number
  height: number
  dimensions: Dimensions
}

export const Canvas = ({ ref, width, height, dimensions }: Props) => {
  const emojis = useAtomValue(emojiDatasAtom)
  const rects = useAtomValue(rectanglesAtom)
  const [selectedStickerId, setSelectedStickerId] = useAtom(
    selectedStickerIdAtom,
  )

  const url = useAtomValue(baseImgUrlAtom)
  const [image] = useAnonymousImage(url ?? '')

  const handleUnselect = () => {
    setSelectedStickerId(RESET)
  }

  const handleSelect = (id: string) => {
    setSelectedStickerId(id)
  }

  return (
    <Stage
      ref={ref}
      width={width}
      height={height}
      scaleX={width / dimensions.width}
      scaleY={height / dimensions.height}
    >
      <Layer onMouseDown={handleUnselect} onTouchStart={handleUnselect}>
        <Image image={image} x={0} y={0} />
      </Layer>
      <Layer>
        {emojis.map(({ id, u }) => (
          <Emoji
            key={id}
            u={u}
            selected={selectedStickerId === id}
            onSelect={() => handleSelect(id)}
            x={dimensions.width / 2}
            y={dimensions.height / 2}
          />
        ))}
        {rects.map(({ id }) => (
          <Rectangle
            key={id}
            selected={selectedStickerId === id}
            onSelect={() => handleSelect(id)}
            x={dimensions.width / 2}
            y={dimensions.height / 2}
          />
        ))}
      </Layer>
    </Stage>
  )
}
