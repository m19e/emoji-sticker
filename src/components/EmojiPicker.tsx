'use client'
import { EmojiStyle } from 'emoji-picker-react'
import { useSetAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { v4 } from 'uuid'

import { DEFAULT_PREVIEW_CONFIG, EPR_CATEGORIES_JA } from '@/constants'
import { emojiSvgIdsAtom } from '@/store/atoms'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
})

export const Picker = () => {
  const setEmojis = useSetAtom(emojiSvgIdsAtom)

  const addEmoji = (u: string) => {
    setEmojis((prev) => [...prev, { id: v4(), u }])
  }

  return (
    <EmojiPicker
      className="!fixed bottom-0"
      emojiStyle={EmojiStyle.TWITTER}
      categories={EPR_CATEGORIES_JA}
      previewConfig={DEFAULT_PREVIEW_CONFIG}
      skinTonesDisabled
      searchPlaceholder="検索"
      onEmojiClick={(e) => addEmoji(e.unifiedWithoutSkinTone)}
    />
  )
}
