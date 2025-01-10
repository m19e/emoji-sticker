'use client'
import { useResetAtom } from 'jotai/utils'
import { SaveIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { selectedEmojiIdAtom } from '@/store/atoms'
import type { ButtonProps } from '@/types'

export const SaveImageButton = ({ disabled }: ButtonProps) => {
  const resetSelectedEmojiId = useResetAtom(selectedEmojiIdAtom)

  const handleClick = () => {
    resetSelectedEmojiId()
    // TODO
    // openShareDialog()
  }

  return (
    <Button
      className="text-slate-300"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={disabled}
    >
      <SaveIcon />
    </Button>
  )
}
