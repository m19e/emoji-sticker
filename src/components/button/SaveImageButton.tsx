'use client'
import { useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { ShareIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { isShareDrawerOpenAtom, selectedEmojiIdAtom } from '@/store/atoms'
import type { ButtonProps } from '@/types'

export const SaveImageButton = ({ disabled }: ButtonProps) => {
  const setOpenDrawer = useSetAtom(isShareDrawerOpenAtom)
  const resetSelectedEmojiId = useResetAtom(selectedEmojiIdAtom)

  const handleClick = () => {
    resetSelectedEmojiId()
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
