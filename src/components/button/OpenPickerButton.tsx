'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { SmilePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { isBaseImgLoadedAtom, isPickerOpenAtom } from '@/store/atoms'

export const OpenPickerButton = () => {
  const setOpenPicker = useSetAtom(isPickerOpenAtom)
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  const handleClick = () => {
    setOpenPicker(true)
  }

  return (
    <Button
      className="text-slate-300"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={!isLoaded}
    >
      <SmilePlusIcon />
    </Button>
  )
}
