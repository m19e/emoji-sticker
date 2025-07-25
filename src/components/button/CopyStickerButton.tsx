'use client'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { CopyIcon } from 'lucide-react'
import { v4 } from 'uuid'

import { Dict } from '@/dict'
import { GA4Event, sendEvent } from '@/ga'
import {
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerDataAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

// TODO 複製時に選択リセットする方がUX良い可能性(選択してるとワンタッチでサイズ変更してしまうので)
export const CopyStickerButton = () => {
  const [selected, setSelected] = useAtom(selectedStickerDataAtom)
  const [emojis, setEmojiDatas] = useAtom(emojiDatasAtom)
  const [rects, setRectangles] = useAtom(rectanglesAtom)

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
    // 複製時に選択をリセット(サイズ変更してしまわないように)
    setSelected(RESET)
    setEmojiDatas((prev) => [...prev, { id, u, fallback, copySize: size }])
  }

  const handleCopyRect = () => {
    if (selected === null || selected.type !== 'rect') {
      return
    }
    const copyTarget = rects.findLast((r) => r.id === selected.id)
    if (!copyTarget) {
      return
    }

    const { type, w, h } = selected

    sendEvent(GA4Event.Duplicate, { type })

    const id = v4()
    // 複製時に選択をリセット(サイズ変更してしまわないように)
    setSelected(RESET)
    setRectangles((prev) => [...prev, { id, copy: { w, h } }])
  }

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
      {isSelected && (
        <span className="font-bold text-xs">{Dict.duplicate}</span>
      )}
    </Button>
  )
}
