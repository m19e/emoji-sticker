'use client'
import { useAtom, useAtomValue } from 'jotai'
import { RESET } from 'jotai/utils'
import { Image, Layer, Stage } from 'react-konva'

import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useCanvasSize } from '@/hooks/useCanvasSize'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  baseImgUrlAtom,
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

import { Emoji } from '@/components/sticker/Emoji'
import { Rectangle } from '@/components/sticker/Rectangle'
import { useBaseImageSize } from '@/hooks/useBaseImageSize'

export const Canvas = () => {
  const emojis = useAtomValue(emojiDatasAtom)
  const rects = useAtomValue(rectanglesAtom)
  const [selectedStickerId, setSelectedStickerId] = useAtom(
    selectedStickerIdAtom,
  )
  const url = useAtomValue(baseImgUrlAtom)

  const [image] = useAnonymousImage(url ?? '')
  const { isDesktop } = useMediaQuery()
  const { ref } = useCanvasData()

  const {
    canvas: { width, height },
  } = useCanvasSize()
  const { imgSize } = useBaseImageSize()

  const handleUnselect = () => {
    setSelectedStickerId(RESET)
  }

  const handleSelect = (id: string) => {
    setSelectedStickerId(id)
  }

  const initialPosition = {
    x: imgSize.width / 2,
    y: imgSize.height / 2,
  }

  return (
    <Stage
      ref={ref}
      width={width}
      height={height}
      scaleX={width / imgSize.width}
      scaleY={height / imgSize.height}
    >
      <Layer onMouseDown={handleUnselect} onTouchStart={handleUnselect}>
        <Image image={image} x={0} y={0} />
      </Layer>
      <Layer>
        {rects.map(({ id }) => (
          <Rectangle
            key={id}
            selected={selectedStickerId === id}
            onSelect={() => handleSelect(id)}
            position={initialPosition}
            size={imgSize.width / 3}
            isDesktop={isDesktop}
          />
        ))}
        {emojis.map(({ id, u }) => (
          <Emoji
            key={id}
            u={u}
            selected={selectedStickerId === id}
            onSelect={() => handleSelect(id)}
            position={initialPosition}
            size={imgSize.width / 5}
            isDesktop={isDesktop}
          />
        ))}
      </Layer>
    </Stage>
  )
}
