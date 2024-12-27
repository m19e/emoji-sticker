'use client'
import dynamic from 'next/dynamic'

import { EmojiStyle } from 'emoji-picker-react'

import { DEFAULT_PREVIEW_CONFIG, EPR_CATEGORIES_JA } from '@/constants'
import { getSvgUrl } from '@/tools'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
})

export const Picker = () => {
  return (
    <EmojiPicker
      emojiStyle={EmojiStyle.TWITTER}
      categories={EPR_CATEGORIES_JA}
      previewConfig={DEFAULT_PREVIEW_CONFIG}
      skinTonesDisabled
      searchPlaceholder="検索"
      onEmojiClick={(e) => console.log(getSvgUrl(e.unifiedWithoutSkinTone))}
    />
  )
}
