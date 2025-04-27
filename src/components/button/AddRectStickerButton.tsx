'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { StickyNoteIcon } from 'lucide-react'
import { v4 } from 'uuid'

import { CustomEvent, sendEvent } from '@/ga'
import {
  isBaseImgLoadedAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

export const AddRectStickerButton = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)
  const setRectangles = useSetAtom(rectanglesAtom)
  const setSelectedStickerId = useSetAtom(selectedStickerIdAtom)

  const handleClick = () => {
    sendEvent(CustomEvent.Rect)

    const id = v4()
    setSelectedStickerId(id)
    setRectangles((prev) => [...prev, { id }])
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
