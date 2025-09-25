'use client'
import { useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { Trash2Icon, XIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Dict } from '@/dict'
import { GA4Event, sendEvent } from '@/ga'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { baseImgUrlAtom, isBaseImgLoadedAtom } from '@/store/atoms'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// TODO disabledを受け取らない
export const DeleteBaseImageButton = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)
  const resetBaseImg = useResetAtom(baseImgUrlAtom)
  const { isDesktop } = useMediaQuery()

  const handleClick = () => {
    sendEvent(GA4Event.DeleteImage)
    resetBaseImg()
    toast.warning(Dict.delete.baseImage.toast)
  }

  const handleOpenChange = (open: boolean) => {
    open && sendEvent(GA4Event.ShowDeleteImage)
  }

  if (isDesktop) {
    return (
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={!isLoaded}>
            <XIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-900">
          <DropdownMenuItem className="justify-between" onClick={handleClick}>
            {Dict.delete.baseImage.btn}
            <Trash2Icon className="ml-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" disabled={!isLoaded}>
          <XIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>{Dict.delete.baseImage.btn}</DrawerTitle>
          <DrawerDescription>読み込んだ画像を削除しますか？</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-4 pb-8">
          <DrawerClose asChild>
            <Button
              className="bg-red-700 font-bold text-lg"
              size="lg"
              variant="destructive"
              onClick={handleClick}
            >
              {Dict.delete.baseImage.btn}
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button
              className="bg-zinc-700 font-bold text-lg"
              size="lg"
              variant="outline"
            >
              {Dict.cancel}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
