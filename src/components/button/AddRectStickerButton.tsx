'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { StickyNoteIcon } from 'lucide-react'
import { v4 } from 'uuid'

import { Button } from '@/components/ui/button'
import {
  isBaseImgLoadedAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

export const AddRectStickerButton = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)
  const setRectangles = useSetAtom(rectanglesAtom)
  const setSelectedStickerId = useSetAtom(selectedStickerIdAtom)

  const handleClick = () => {
    const id = v4()
    setSelectedStickerId(id)
    setRectangles((prev) => [...prev, { id }])
  }

  return (
    <Button
      className="text-slate-300"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={!isLoaded}
    >
      <StickyNoteIcon />
    </Button>
  )
}
