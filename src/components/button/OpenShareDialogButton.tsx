'use client'
import { useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { ShareIcon } from 'lucide-react'

import { isShareDialogOpenAtom, selectedStickerIdAtom } from '@/store/atoms'
import type { ButtonProps } from '@/types'

import { Button } from '@/components/ui/button'

export const OpenShareDialogButton = ({ disabled }: ButtonProps) => {
  const setOpenDrawer = useSetAtom(isShareDialogOpenAtom)
  const resetSelectedStickerId = useResetAtom(selectedStickerIdAtom)

  const handleClick = () => {
    resetSelectedStickerId()
    setOpenDrawer(true)
  }

  return (
    <Button
      className="text-slate-300"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={disabled}
    >
      <ShareIcon />
    </Button>
  )
}
