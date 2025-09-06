'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { StickyNoteIcon } from 'lucide-react'
import { v4 } from 'uuid'

import { createSelectedRect } from '@/brand'
import { GA4Event, sendEvent } from '@/ga'
import {
  isBaseImgLoadedAtom,
  rectanglesAtom,
  selectedStickerAtom,
  stageCenterAxisAtom,
} from '@/store/atoms'

import { Button } from '@/components/ui/button'

// TODO rect追加時にpositionも設定
// TODO やっぱり初期選択
export const AddRectStickerButton = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)
  const position = useAtomValue(stageCenterAxisAtom)
  const setRectangles = useSetAtom(rectanglesAtom)
  const setSelected = useSetAtom(selectedStickerAtom)

  const handleClick = () => {
    sendEvent(GA4Event.Rect)

    const id = v4()
    setRectangles((prev) => [...prev, { id, position }])
    // ノード側でサイズ更新するので`0`を設定
    setSelected(createSelectedRect({ id, w: 0, h: 0 }))
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
