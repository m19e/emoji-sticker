'use client'
import dynamic from 'next/dynamic'

import { EmojiStyle } from 'emoji-picker-react'

import { EPR_CATEGORIES_JA } from '@/constants'
import { getSvgUrl } from '@/tools'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
})

export const Picker = () => {
  return (
    <EmojiPicker
      emojiStyle={EmojiStyle.TWITTER}
      categories={EPR_CATEGORIES_JA}
      onEmojiClick={(e) => console.log(getSvgUrl(e.unifiedWithoutSkinTone))}
      skinTonesDisabled
      searchPlaceholder="検索"
      previewConfig={{
        defaultEmoji: '1f60e',
        defaultCaption: '今の気分はどう？',
      }}
    />
  )
}
