'use client'
import { useAtom, useAtomValue } from 'jotai'
import { Layer } from 'react-konva'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'
import type { Dimensions } from '@/types'

import { Emoji } from '@/components/sticker/Emoji'
import { Rectangle } from '@/components/sticker/Rectangle'

type Props = {
  img: Dimensions
}

export const StickerLayer = ({ img }: Props) => {
  const [selectedStickerId, setSelectedStickerId] = useAtom(
    selectedStickerIdAtom,
  )
  const [emojis, setEmojis] = useAtom(emojiDatasAtom)
  const rects = useAtomValue(rectanglesAtom)

  const { isDesktop } = useMediaQuery()

  const handleSelectRect = (id: string) => {
    setSelectedStickerId(id)
  }

  const handleSelectEmoji = (id: string) => {
    // 選択された絵文字を最後尾に追加してレイヤー最前面に配置
    setEmojis((prev) => [
      ...prev.filter((e) => e.id !== id),
      ...prev.filter((e) => e.id === id),
    ])
    setSelectedStickerId(id)
  }

  const initialPosition = {
    x: img.width / 2,
    y: img.height / 2,
  }

  return (
    <Layer>
      {rects.map(({ id }) => (
        <Rectangle
          key={id}
          selected={selectedStickerId === id}
          onSelect={() => handleSelectRect(id)}
          position={initialPosition}
          size={img.width / 3}
          isDesktop={isDesktop}
        />
      ))}
      {emojis.map((e) => (
        <Emoji
          key={e.id}
          data={e}
          selected={selectedStickerId === e.id}
          onSelect={() => handleSelectEmoji(e.id)}
          position={initialPosition}
          size={e.copySize ?? img.width / 5}
          isDesktop={isDesktop}
        />
      ))}
    </Layer>
  )
}
