'use client'
import { useAtom, useAtomValue } from 'jotai'
import { Layer } from 'react-konva'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { emojiDatasAtom, rectanglesAtom } from '@/store/atoms'
import type { Dimensions } from '@/types'

import { Emoji } from '@/components/sticker/Emoji'
import { Rectangle } from '@/components/sticker/Rectangle'

type Props = {
  img: Dimensions
}

// TODO ID atom依存箇所を削除
// TODO Rectのcopy-size
export const StickerLayer = ({ img }: Props) => {
  const [emojis, setEmojis] = useAtom(emojiDatasAtom)
  const rects = useAtomValue(rectanglesAtom)

  const { isDesktop } = useMediaQuery()

  const initialPosition = {
    x: img.width / 2,
    y: img.height / 2,
  }

  return (
    <Layer>
      {rects.map(({ id }) => (
        <Rectangle
          key={id}
          id={id}
          position={initialPosition}
          size={img.width / 3}
          isDesktop={isDesktop}
        />
      ))}
      {emojis.map((e) => (
        <Emoji
          key={e.id}
          data={e}
          position={initialPosition}
          size={e.copySize ?? img.width / 5}
          isDesktop={isDesktop}
        />
      ))}
    </Layer>
  )
}
