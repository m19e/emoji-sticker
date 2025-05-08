'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { SaveIcon, Share2Icon, ShareIcon } from 'lucide-react'

import { GA4Event, sendEvent } from '@/ga'
import {
  isShareDialogOpenAtom,
  osAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'
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

// TODO iOSの場合、保存ボタンを表示しない
export const ShareButton = ({ disabled }: ButtonProps) => {
  const { ios } = useAtomValue(osAtom)
  const setOpenDrawer = useSetAtom(isShareDialogOpenAtom)
  const resetSelectedStickerId = useResetAtom(selectedStickerIdAtom)

  const { isDesktop } = useMediaQuery()
  const { save, share } = useCanvasData()

  const handleClick = () => {
    sendEvent(GA4Event.ShowShare)
    resetSelectedStickerId()
    setOpenDrawer(true)
  }

  const handleOpenChange = (open: boolean) => {
    open && sendEvent(GA4Event.ShowShare)
    resetSelectedStickerId()
  }

  if (isDesktop) {
    return (
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={disabled}>
            <ShareIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-900">
          {!ios && (
            <DropdownMenuItem className="justify-between" onClick={save}>
              保存する
              <SaveIcon />
            </DropdownMenuItem>
          )}
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
