'use client'
import { type EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { useAtom, useSetAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { v4 } from 'uuid'

import { DEFAULT_PREVIEW_CONFIG, EPR_CATEGORIES_JA } from '@/constants'
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

// TODO SR-only drawer description
// TODO ピッカーの初期絵文字にマイナス配置
export const Picker = () => {
  const setEmojis = useSetAtom(emojiDatasAtom)
  const [open, setOpen] = useAtom(isPickerOpenAtom)
  const setSelectedStickerId = useSetAtom(selectedStickerIdAtom)

  const handleClick = ({ unifiedWithoutSkinTone }: EmojiClickData) => {
    const id = v4()
    setSelectedStickerId(id)
    setEmojis((prev) => [...prev, { id, u: unifiedWithoutSkinTone }])
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="mx-auto w-full items-center sm:w-min">
        <DrawerHeader className="w-96 max-w-full">
          <DrawerTitle className="text-center">絵文字を選択</DrawerTitle>
          <DrawerDescription className="sr-only">
            画像に貼りつける絵文字を選択してください
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-x-hidden p-4 pt-0">
          <EmojiPicker
            className="!flex"
            emojiStyle={EmojiStyle.TWITTER}
            categories={EPR_CATEGORIES_JA}
            previewConfig={DEFAULT_PREVIEW_CONFIG}
            skinTonesDisabled
            autoFocusSearch={false}
            searchPlaceholder="検索"
            onEmojiClick={handleClick}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
