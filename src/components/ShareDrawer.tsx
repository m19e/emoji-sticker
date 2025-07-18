'use client'
import { useAtom, useAtomValue } from 'jotai'
import { SaveIcon, Share2Icon } from 'lucide-react'

import { Dict } from '@/dict'
import { useCanvasData } from '@/hooks/useCanvasData'
import { isShareDialogOpenAtom, osAtom } from '@/store/atoms'

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
  const { ios } = useAtomValue(osAtom)
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
          {!ios && (
            <Button
              className="flex justify-between bg-zinc-700 px-4 font-bold text-lg"
              size="lg"
              variant="outline"
              onClick={handleSave}
            >
              {Dict.save.btn}
              <SaveIcon />
            </Button>
          )}
          <Button
            className="flex justify-between bg-zinc-700 px-4 font-bold text-lg"
            size="lg"
            variant="outline"
            onClick={handleShare}
          >
            {Dict.share.btn}
            <Share2Icon />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
