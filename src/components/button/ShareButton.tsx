'use client'
import { useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { SaveIcon, Share2Icon, ShareIcon } from 'lucide-react'

import { isShareDialogOpenAtom, selectedStickerIdAtom } from '@/store/atoms'
import type { ButtonProps } from '@/types'

import { useCanvasData } from '@/hooks/useCanvasData'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const ShareButton = ({ disabled }: ButtonProps) => {
  const setOpenDrawer = useSetAtom(isShareDialogOpenAtom)
  const resetSelectedStickerId = useResetAtom(selectedStickerIdAtom)

  const { isDesktop } = useMediaQuery()
  const { save, share } = useCanvasData()

  const handleClick = () => {
    resetSelectedStickerId()
    setOpenDrawer(true)
  }

  if (isDesktop) {
    return (
      <DropdownMenu onOpenChange={resetSelectedStickerId}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={disabled}>
            <ShareIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-900">
          <DropdownMenuItem className="justify-between" onClick={save}>
            保存する
            <SaveIcon />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-between" onClick={share}>
            共有する
            <Share2Icon />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={disabled}
    >
      <ShareIcon />
    </Button>
  )
}
