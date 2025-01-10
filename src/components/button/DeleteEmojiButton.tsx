'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { emojiDatasAtom, selectedEmojiIdAtom } from '@/store/atoms'

export const DeleteEmojiButton = () => {
  const selectedEmojiId = useAtomValue(selectedEmojiIdAtom)
  const setEmojiDatas = useSetAtom(emojiDatasAtom)

  const handleClick = () => {
    setEmojiDatas((p) => p.filter((e) => e.id !== selectedEmojiId))
  }

  return (
    <Button
      className="text-slate-300"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={selectedEmojiId === null}
    >
      <Trash2Icon />
    </Button>
  )
}
