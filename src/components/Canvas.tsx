'use client'
import { useAtom, useAtomValue } from 'jotai'
import { RESET } from 'jotai/utils'
import type Konva from 'konva'
import type { RefObject } from 'react'
import { Image, Layer, Stage } from 'react-konva'

import { Emoji } from '@/components/sticker/Emoji'
import { Rectangle } from '@/components/sticker/Rectangle'
import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { useImageSize } from '@/hooks/useImageSize'
import {
  baseImgUrlAtom,
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

type Props = {
  ref: RefObject<Konva.Stage | null>
  width: number
  height: number
}

export const Canvas = ({ ref, width, height }: Props) => {
  const emojis = useAtomValue(emojiDatasAtom)
  const rects = useAtomValue(rectanglesAtom)
  const [selectedStickerId, setSelectedStickerId] = useAtom(
    selectedStickerIdAtom,
  )

  const url = useAtomValue(baseImgUrlAtom)
  const [dimensions] = useImageSize(url)
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
        {emojis.map((e) => (
          <Emoji
            key={e.id}
            u={e.u}
            selected={e.id === selectedStickerId}
            onSelect={() => handleSelect(e.id)}
            x={dimensions.width / 2}
            y={dimensions.height / 2}
          />
        ))}
        {rects.map((r) => (
          <Rectangle
            key={r.id}
            selected={r.id === selectedStickerId}
            onSelect={() => handleSelect(r.id)}
            x={dimensions.width / 2}
            y={dimensions.height / 2}
          />
        ))}
      </Layer>
    </Stage>
  )
}
