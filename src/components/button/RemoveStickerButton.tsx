'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { Trash2Icon } from 'lucide-react'

import { Dict } from '@/dict'
import { GA4Event, sendEvent } from '@/ga'
import {
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerDataAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

// TODO Reset selected data
export const RemoveStickerButton = () => {
  const selectedId = useAtomValue(selectedStickerIdAtom)
  const resetSelected = useResetAtom(selectedStickerDataAtom)
  const setEmojiDatas = useSetAtom(emojiDatasAtom)
  const setRectangles = useSetAtom(rectanglesAtom)

  const handleClick = () => {
    sendEvent(GA4Event.Remove)
    resetSelected()
    setEmojiDatas((p) => p.filter((e) => e.id !== selectedId))
    setRectangles((p) => p.filter((r) => r.id !== selectedId))
  }

  const isSelected = selectedId !== null

  return (
    <Button
      className="h-10 px-[10px]"
      variant="ghost"
      onClick={handleClick}
      disabled={!isSelected}
    >
      <Trash2Icon />
      {isSelected && (
        <span className="font-bold text-xs">{Dict.delete.sticker}</span>
      )}
    </Button>
  )
}
