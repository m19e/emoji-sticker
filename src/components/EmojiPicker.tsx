'use client'
import { type EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { v4 } from 'uuid'

import { createSelectedEmoji } from '@/brand'
import {
  CUSTOM_EMOJIS,
  DEFAULT_PREVIEW_CONFIG,
  EPR_CATEGORIES_JA,
  HIDDEN_EMOJIS,
  type HIDDEN_EMOJIS_ID,
  HIDDEN_EMOJIS_UNICODE,
} from '@/constants'
import { GA4Event, sendEvent } from '@/ga'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  emojiDatasAtom,
  isPickerOpenAtom,
  selectedStickerAtom,
  stageCenterAxisAtom,
} from '@/store/atoms'
import { convertToValidTwemojiCodepoint } from '@/tools'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

const DynamicPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
})

// TODO emoji追加時にpositionも設定
export const Picker = () => {
  const [open, setOpen] = useAtom(isPickerOpenAtom)
  const position = useAtomValue(stageCenterAxisAtom)
  const setEmojis = useSetAtom(emojiDatasAtom)
  const setSelected = useSetAtom(selectedStickerAtom)

  const { isDesktop } = useMediaQuery()

  const sendEmojiEvent = ({
    emoji,
    names,
    unified,
    isCustom,
  }: Pick<EmojiClickData, 'emoji' | 'names' | 'unified' | 'isCustom'>) => {
    const name = names[0].split(' ').join('_')
    const params = {
      emoji,
      name,
      unified,
      isCustom,
    }
    sendEvent(GA4Event.Emoji, params)
  }

  const handleClick = ({
    isCustom,
    unified,
    imageUrl: fallback,
    names,
    emoji,
  }: EmojiClickData) => {
    const u = isCustom
      ? HIDDEN_EMOJIS[unified as HIDDEN_EMOJIS_ID]
      : convertToValidTwemojiCodepoint(unified)

    sendEmojiEvent({
      emoji,
      names,
      isCustom,
      unified: u,
    })

    const id = v4()
    setEmojis((prev) => [...prev, { id, u, fallback, position }])
    // ノード側でサイズ更新するので`0`を設定
    setSelected(createSelectedEmoji({ id, size: 0 }))
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
          <DynamicPicker
            className="!flex"
            theme={Theme.DARK}
            emojiStyle={EmojiStyle.TWITTER}
            categories={EPR_CATEGORIES_JA}
            previewConfig={{
              ...DEFAULT_PREVIEW_CONFIG,
              showPreview: isDesktop,
            }}
            hiddenEmojis={HIDDEN_EMOJIS_UNICODE}
            customEmojis={CUSTOM_EMOJIS}
            skinTonesDisabled
            autoFocusSearch={false}
            onEmojiClick={handleClick}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
