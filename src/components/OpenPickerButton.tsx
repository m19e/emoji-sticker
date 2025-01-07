'use client'
import { SmilePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { isPickerOpenAtom } from '@/store/atoms'
import { useSetAtom } from 'jotai'

export const OpenPickerButton = () => {
  const setOpenPicker = useSetAtom(isPickerOpenAtom)

  const handleClick = () => {
    setOpenPicker(true)
  }

  return (
    <Button
      className="text-slate-300"
      variant="ghost"
      size="icon"
      onClick={handleClick}
    >
      <SmilePlusIcon />
    </Button>
  )
}
