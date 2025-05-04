'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { SmilePlusIcon } from 'lucide-react'

import { GA4Event, sendEvent } from '@/ga'
import { isBaseImgLoadedAtom, isPickerOpenAtom } from '@/store/atoms'

import { Button } from '@/components/ui/button'

export const OpenPickerButton = () => {
  const setOpenPicker = useSetAtom(isPickerOpenAtom)
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  const handleClick = () => {
    sendEvent(GA4Event.ShowPicker)
    setOpenPicker(true)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={!isLoaded}
    >
      <SmilePlusIcon />
    </Button>
  )
}
