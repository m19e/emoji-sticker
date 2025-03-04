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

  return (
    <Button
      className="h-10 px-[10px]"
      variant="ghost"
      onClick={handleClick}
      disabled={!isSelected}
    >
      <Trash2Icon />
      {isSelected && (
        <span className="font-bold text-xs">ステッカーを削除</span>
      )}
    </Button>
  )
}
