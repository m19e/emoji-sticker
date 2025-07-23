'use client'
import { useAtom, useSetAtom } from 'jotai'
import { CopyIcon } from 'lucide-react'
import { v4 } from 'uuid'

import { createSelectedEmoji, createSelectedRect } from '@/brand'
import { GA4Event, sendEvent } from '@/ga'
import {
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerDataAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

// TODO ID atom依存箇所を削除
// TODO Dict for duplicate
export const CopyStickerButton = () => {
  const [selected, setSelected] = useAtom(selectedStickerDataAtom)
  const [emojis, setEmojiDatas] = useAtom(emojiDatasAtom)
  const setRectangles = useSetAtom(rectanglesAtom)

  // TODO selected-emojiの構造修正
  const handleCopyEmoji = () => {
    if (selected === null || selected.type !== 'emoji') {
      return
    }
    const copyTarget = emojis.findLast((e) => e.id === selected.id)
    if (!copyTarget) {
      return
    }

    const { type, size } = selected
    const { u, fallback } = copyTarget

    sendEvent(GA4Event.Duplicate, { type, u })

    const id = v4()
    setSelected(createSelectedEmoji({ id, size }))
    setEmojiDatas((prev) => [...prev, { id, u, fallback, copySize: size }])
  }

  const handleCopyRect = () => {}

  const isSelected = selected !== null

  if (!isSelected) {
    return (
      <Button className="h-10 px-[10px]" variant="ghost" disabled>
        <CopyIcon />
      </Button>
    )
  }

  return (
    <Button
      className="h-10 px-[10px]"
      variant="ghost"
      onClick={selected.type === 'emoji' ? handleCopyEmoji : handleCopyRect}
    >
      <CopyIcon />
      {isSelected && <span className="font-bold text-xs">複製</span>}
    </Button>
  )
}
