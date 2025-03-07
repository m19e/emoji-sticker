'use client'
import { type EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react'
import { useAtom, useSetAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { v4 } from 'uuid'

import {
  CUSTOM_EMOJIS,
  DEFAULT_PREVIEW_CONFIG,
  EPR_CATEGORIES_JA,
  HIDDEN_EMOJIS,
  type HIDDEN_EMOJIS_ID,
  HIDDEN_EMOJIS_UNICODE,
} from '@/constants'
import {
  emojiDatasAtom,
  isPickerOpenAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
})

// TODO ピッカーの初期絵文字にマイナス配置
// TODO ダークモード
// TODO DrawerTitle .sr-only
export const Picker = () => {
  const setEmojis = useSetAtom(emojiDatasAtom)
  const [open, setOpen] = useAtom(isPickerOpenAtom)
  const setSelectedStickerId = useSetAtom(selectedStickerIdAtom)

  const handleClick = (data: EmojiClickData) => {
    // TODO Remove debug print
    console.log(data)

    const { isCustom, unified } = data
    const u = isCustom ? HIDDEN_EMOJIS[unified as HIDDEN_EMOJIS_ID] : unified

    const id = v4()
    setSelectedStickerId(id)
    setEmojis((prev) => [...prev, { id, u }])
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="mx-auto w-full items-center sm:w-min">
        <DrawerHeader className="sr-only">
          <DrawerTitle>絵文字を選択</DrawerTitle>
          <DrawerDescription>
            画像に貼りつける絵文字を選択してください
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-96 max-w-full overflow-x-hidden p-4">
          <EmojiPicker
            className="!flex"
            theme={Theme.DARK}
            emojiStyle={EmojiStyle.TWITTER}
            categories={EPR_CATEGORIES_JA}
            previewConfig={DEFAULT_PREVIEW_CONFIG}
            hiddenEmojis={HIDDEN_EMOJIS_UNICODE}
            customEmojis={CUSTOM_EMOJIS}
            skinTonesDisabled
            autoFocusSearch={false}
            searchPlaceholder="絵文字を検索"
            onEmojiClick={handleClick}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
