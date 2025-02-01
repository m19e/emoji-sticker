'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { Trash2Icon } from 'lucide-react'

import {
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

export const DeleteEmojiButton = () => {
  const selectedStickerId = useAtomValue(selectedStickerIdAtom)
  const setEmojiDatas = useSetAtom(emojiDatasAtom)
  const setRectangles = useSetAtom(rectanglesAtom)

  const handleClick = () => {
    setEmojiDatas((p) => p.filter((e) => e.id !== selectedStickerId))
    setRectangles((p) => p.filter((r) => r.id !== selectedStickerId))
  }

  return (
    <Button
      className="text-slate-300"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={selectedStickerId === null}
    >
      <Trash2Icon />
    </Button>
  )
}
