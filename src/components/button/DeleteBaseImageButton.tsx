'use client'
import { useResetAtom } from 'jotai/utils'
import { XIcon } from 'lucide-react'
import { useMedia } from 'react-use'
import { toast } from 'sonner'

import { baseImgUrlAtom } from '@/store/atoms'
import type { ButtonProps } from '@/types'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

// TODO モバイル時のみダークテーマに
export const DeleteBaseImageButton = ({ disabled }: ButtonProps) => {
  const resetBaseImg = useResetAtom(baseImgUrlAtom)
  const isDesktop = useMedia('(min-width: 640px)')

  const handleClick = () => {
    resetBaseImg()
    toast.warning('画像を削除しました')
  }

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="text-slate-300"
            variant="ghost"
            size="icon"
            disabled={disabled}
          >
            <XIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>画像を削除しますか？</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DrawerClose asChild>
              <Button variant="destructive" onClick={handleClick}>
                削除
              </Button>
            </DrawerClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="text-slate-300"
          variant="ghost"
          size="icon"
          disabled={disabled}
        >
          <XIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-none bg-slate-800">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-slate-100">
            画像を削除しますか？
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              className="font-semibold text-lg"
              variant="destructive"
              onClick={handleClick}
            >
              削除
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
