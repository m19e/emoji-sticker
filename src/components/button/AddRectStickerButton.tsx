'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { StickyNoteIcon } from 'lucide-react'
import { v4 } from 'uuid'

import { GA4Event, sendEvent } from '@/ga'
import {
  isBaseImgLoadedAtom,
  rectanglesAtom,
  selectedStickerAtom,
  stageCenterAxisAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

// TODO rect追加時にpositionも設定
export const AddRectStickerButton = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)
  const position = useAtomValue(stageCenterAxisAtom)
  const setRectangles = useSetAtom(rectanglesAtom)
  const resetSelected = useResetAtom(selectedStickerAtom)

  const handleClick = () => {
    sendEvent(GA4Event.Rect)

    const id = v4()
    setRectangles((prev) => [...prev, { id, position }])
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
