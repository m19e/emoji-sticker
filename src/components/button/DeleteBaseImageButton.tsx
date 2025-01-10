'use client'
import { useResetAtom } from 'jotai/utils'
import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { baseImgUrlAtom } from '@/store/atoms'
import type { ButtonProps } from '@/types'

export const DeleteBaseImageButton = ({ disabled }: ButtonProps) => {
  const resetBaseImg = useResetAtom(baseImgUrlAtom)

  return (
    <Button
      className="text-slate-300"
      variant="ghost"
      size="icon"
      onClick={resetBaseImg}
      disabled={disabled}
    >
      <XIcon />
    </Button>
  )
}
