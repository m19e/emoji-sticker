'use client'
import { useResetAtom } from 'jotai/utils'
import { Trash2Icon, XIcon } from 'lucide-react'
import { useMedia } from 'react-use'
import { toast } from 'sonner'

import { baseImgUrlAtom } from '@/store/atoms'
import type { ButtonProps } from '@/types'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// TODO ダークモード対応
export const DeleteBaseImageButton = ({ disabled }: ButtonProps) => {
  const resetBaseImg = useResetAtom(baseImgUrlAtom)
  const isDesktop = useMedia('(min-width: 640px)')

  const handleClick = () => {
    resetBaseImg()
    toast.warning('画像を削除しました')
  }

  if (isDesktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={disabled}>
            <XIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-900">
          <DropdownMenuItem className="justify-between" onClick={handleClick}>
            画像を削除する
            <Trash2Icon className="ml-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled}>
          <XIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerFooter className="pt-4 pb-8">
          <DrawerClose asChild>
            <Button
              className="bg-zinc-700 font-bold text-lg text-red-500 hover:text-red-600"
              size="lg"
              variant="outline"
              onClick={handleClick}
            >
              画像を削除する
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button
              className="bg-zinc-700 px-4 font-bold text-lg"
              size="lg"
              variant="outline"
            >
              キャンセル
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
