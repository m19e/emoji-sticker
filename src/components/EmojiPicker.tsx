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
import { GA4Event, sendEvent } from '@/ga'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  emojiDatasAtom,
  isPickerOpenAtom,
  selectedStickerDataAtom,
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

// TODO ID atom依存箇所を削除
export const Picker = () => {
  const setEmojis = useSetAtom(emojiDatasAtom)
  const [open, setOpen] = useAtom(isPickerOpenAtom)
  const setSelectedSticker = useSetAtom(selectedStickerDataAtom)

  const { isDesktop } = useMediaQuery()

  // デバッグ用
  const _debugPrint = ({
    names,
    unified,
    emoji,
  }: Pick<EmojiClickData, 'names' | 'unified' | 'emoji'>) => {
    const name = names[0].split(' ').join('_')
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(
      JSON.stringify(
        [
          {
            [name]: unified,
          },
          {
            [name]: names,
          },
          [name, `// ${emoji}`],
        ],
        null,
        2,
      ),
    )
  }

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
    // _debugPrint({ names, unified, emoji })

    const u = isCustom
      ? HIDDEN_EMOJIS[unified as HIDDEN_EMOJIS_ID]
      : convertToValidTwemojiCodepoint(unified)

    // TODO ステッカー複製時にもGAイベントを送信
    sendEmojiEvent({
      emoji,
      names,
      isCustom,
      unified: u,
    })

    // TODO 絵文字追加時に選択しなければID atomを削除できるかも
    const id = v4()
    setEmojis((prev) => [...prev, { id, u, fallback }])
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
