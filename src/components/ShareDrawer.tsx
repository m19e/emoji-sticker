'use client'
import { useAtom } from 'jotai'
import { SaveIcon, Share2Icon } from 'lucide-react'

import { useCanvasData } from '@/hooks/useCanvasData'
import { isShareDialogOpenAtom } from '@/store/atoms'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

export const ShareDrawer = () => {
  const [open, setOpen] = useAtom(isShareDialogOpenAtom)
  const { save, share } = useCanvasData()

  const handleSave = () => {
    save()
    setOpen(false)
  }

  const handleShare = async () => {
    await share()
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>編集した画像を共有する</DrawerTitle>
          <DrawerDescription>
            編集した画像を保存・共有できます
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-4 pb-8">
          <Button
            className="flex justify-between bg-zinc-700 px-4 font-bold text-lg"
            size="lg"
            variant="outline"
            onClick={handleSave}
          >
            保存する
            <SaveIcon />
          </Button>
          <Button
            className="flex justify-between bg-zinc-700 px-4 font-bold text-lg"
            size="lg"
            variant="outline"
            onClick={handleShare}
            // TODO リリース前に削除
            disabled
          >
            共有する
            <Share2Icon />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
