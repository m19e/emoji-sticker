'use client'
import { type EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { useAtom, useSetAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { v4 } from 'uuid'

import { DEFAULT_PREVIEW_CONFIG, EPR_CATEGORIES_JA } from '@/constants'
import { emojiDatasAtom, isPickerOpenAtom } from '@/store/atoms'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
})

export const Picker = () => {
  const setEmojis = useSetAtom(emojiDatasAtom)
  const [open, setOpen] = useAtom(isPickerOpenAtom)

  const handleClick = ({ unifiedWithoutSkinTone }: EmojiClickData) => {
    setEmojis((prev) => [
      ...prev,
      {
        id: v4(),
        u: unifiedWithoutSkinTone,
      },
    ])
    setOpen(false)
  }

  return (
    <EmojiPicker
      open={open}
      className="!fixed bottom-0"
      emojiStyle={EmojiStyle.TWITTER}
      categories={EPR_CATEGORIES_JA}
      previewConfig={DEFAULT_PREVIEW_CONFIG}
      skinTonesDisabled
      searchPlaceholder="検索"
      onEmojiClick={handleClick}
    />
  )
}
