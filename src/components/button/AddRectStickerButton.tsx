'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { StickyNoteIcon } from 'lucide-react'
import { v4 } from 'uuid'

import { GA4Event, sendEvent } from '@/ga'
import {
  isBaseImgLoadedAtom,
  rectanglesAtom,
  selectedStickerDataAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

// TODO ID atom依存箇所を削除
// TODO 矩形追加時に選択リセット
export const AddRectStickerButton = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)
  const setRectangles = useSetAtom(rectanglesAtom)
  const resetSelected = useResetAtom(selectedStickerDataAtom)

  const handleClick = () => {
    sendEvent(GA4Event.Rect)

    // TODO 矩形追加時に選択しなければIdAtomを削除できるかも
    const id = v4()
    setRectangles((prev) => [...prev, { id }])
    resetSelected()
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={!isLoaded}
    >
      <StickyNoteIcon />
    </Button>
  )
}
