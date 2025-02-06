'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { Trash2Icon } from 'lucide-react'

import {
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

// TODO 削除可能であるとき、ボタンテキストを表示
// TODO 削除時に選択ステッカーIDをリセット
export const DeleteEmojiButton = () => {
  const selectedStickerId = useAtomValue(selectedStickerIdAtom)
  const resetSelectedId = useResetAtom(selectedStickerIdAtom)
  const setEmojiDatas = useSetAtom(emojiDatasAtom)
  const setRectangles = useSetAtom(rectanglesAtom)

  const handleClick = () => {
    resetSelectedId()
    setEmojiDatas((p) => p.filter((e) => e.id !== selectedStickerId))
    setRectangles((p) => p.filter((r) => r.id !== selectedStickerId))
  }

  const isSelected = selectedStickerId !== null

  if (isSelected) {
    return (
      <Button
        className="h-10 px-[10px] text-slate-300"
        variant="ghost"
        onClick={handleClick}
      >
        <Trash2Icon />
        <span className="font-semibold text-xs">ステッカーを削除</span>
      </Button>
    )
  }

  return (
    <Button className="text-slate-300" variant="ghost" size="icon" disabled>
      <Trash2Icon />
    </Button>
  )
}
