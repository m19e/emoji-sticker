'use client'
import { useAtomValue } from 'jotai'
import { Layer } from 'react-konva'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { emojiDatasAtom, rectanglesAtom } from '@/store/atoms'
import type { Dimensions } from '@/types'

import { Emoji } from '@/components/sticker/Emoji'
import { Rectangle } from '@/components/sticker/Rectangle'

type Props = {
  img: Dimensions
}

export const StickerLayer = ({ img }: Props) => {
  const emojis = useAtomValue(emojiDatasAtom)
  const rects = useAtomValue(rectanglesAtom)

  const { isDesktop } = useMediaQuery()

  const initialPosition = {
    x: img.width / 2,
    y: img.height / 2,
  }

  return (
    <Layer>
      {rects.map(({ id, copy, position }) => (
        <Rectangle
          key={id}
          id={id}
          w={copy ? copy.w : img.width / 3}
          h={copy ? copy.h : img.width / 12}
          position={position ?? initialPosition}
          isDesktop={isDesktop}
        />
      ))}
      {emojis.map((e) => (
        <Emoji
          key={e.id}
          data={e}
          size={e.copySize ?? img.width / 5}
          position={e.position ?? initialPosition}
          isDesktop={isDesktop}
        />
      ))}
    </Layer>
  )
}
