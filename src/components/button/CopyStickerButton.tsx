'use client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { CopyIcon } from 'lucide-react'
import { v4 } from 'uuid'

import {} from '@/ga'
import {
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerDataAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

export const CopyStickerButton = () => {
  const [selectedId, setSelectedId] = useAtom(selectedStickerIdAtom)
  const selectedData = useAtomValue(selectedStickerDataAtom)
  const [emojis, setEmojiDatas] = useAtom(emojiDatasAtom)
  const setRectangles = useSetAtom(rectanglesAtom)

  const handleCopyEmoji = () => {
    const copyTarget = emojis.findLast((e) => e.id === selectedId)
    if (!copyTarget || selectedData === null) {
      return
    }

    const { w } = selectedData
    const { u, fallback } = copyTarget

    const id = v4()
    setSelectedId(id)
    setEmojiDatas((prev) => [...prev, { id, u, fallback, copySize: w }])
  }

  const handleCopyRect = () => {}

  const isSelected = selectedId !== null && selectedData !== null

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
      onClick={selectedData.type === 'emoji' ? handleCopyEmoji : handleCopyRect}
    >
      <CopyIcon />
      {isSelected && <span className="font-bold text-xs">複製</span>}
    </Button>
  )
}
