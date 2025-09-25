'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { SaveIcon, Share2Icon, ShareIcon } from 'lucide-react'

import { Dict } from '@/dict'
import { GA4Event, sendEvent } from '@/ga'
import {
  isBaseImgLoadedAtom,
  isShareDialogOpenAtom,
  osAtom,
  selectedStickerAtom,
} from '@/store/atoms'

import { useCanvasData } from '@/hooks/useCanvasData'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// TODO disabledを受け取らない
export const ShareButton = () => {
  const { ios } = useAtomValue(osAtom)
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)
  const setOpenDrawer = useSetAtom(isShareDialogOpenAtom)
  const resetSelected = useResetAtom(selectedStickerAtom)

  const { isDesktop } = useMediaQuery()
  const { save, share } = useCanvasData()

  const handleClick = () => {
    sendEvent(GA4Event.ShowShare)
    resetSelected()
    setOpenDrawer(true)
  }

  const handleOpenChange = (open: boolean) => {
    open && sendEvent(GA4Event.ShowShare)
    resetSelected()
  }

  if (isDesktop) {
    return (
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={!isLoaded}>
            <ShareIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-900">
          {!ios && (
            <DropdownMenuItem className="justify-between" onClick={save}>
              {Dict.save.btn}
              <SaveIcon />
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="justify-between" onClick={share}>
            {Dict.share.btn}
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
      disabled={!isLoaded}
    >
      <ShareIcon />
    </Button>
  )
}
