'use client'
import { useAtomValue } from 'jotai'
import { Layer } from 'react-konva'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { baseImgSizeAtom, emojiDatasAtom, rectanglesAtom } from '@/store/atoms'

import { Emoji } from '@/components/sticker/Emoji'
import { Rectangle } from '@/components/sticker/Rectangle'

// TODO リファクタしたのでimgProps削除してatomから取得する
// TODO センター座標をデフォルトで設定しているのでコンポーネント上から削除
export const StickerLayer = () => {
  const emojis = useAtomValue(emojiDatasAtom)
  const rects = useAtomValue(rectanglesAtom)
  const img = useAtomValue(baseImgSizeAtom)

  const { isDesktop } = useMediaQuery()

  return (
    <Layer>
      {rects.map(({ id, copy, position }) => (
        <Rectangle
          key={id}
          id={id}
          position={position}
          isDesktop={isDesktop}
          w={copy ? copy.w : img.width / 3}
          h={copy ? copy.h : img.width / 12}
        />
      ))}
      {emojis.map((e) => (
        <Emoji
          key={e.id}
          data={e}
          position={e.position}
          isDesktop={isDesktop}
          size={e.copySize ?? img.width / 5}
        />
      ))}
    </Layer>
  )
}
