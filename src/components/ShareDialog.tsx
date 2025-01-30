'use client'
import { useAtom } from 'jotai'
import { SaveIcon, Share2Icon } from 'lucide-react'
import { useMedia } from 'react-use'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { isShareDialogOpenAtom } from '@/store/atoms'

type Props = {
  onSave: () => void
}

export const ShareDialog = ({ onSave }: Props) => {
  const [open, setOpen] = useAtom(isShareDialogOpenAtom)

  const isDesktop = useMedia('(min-width: 640px)')

  const handleSave = () => {
    onSave()
    setOpen(false)
    toast.success('画像を保存しました')
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>画像を保存・共有</DialogTitle>
          </DialogHeader>
          <DrawerFooter>
            <ShareActions onSave={handleSave} />
          </DrawerFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>画像を保存・共有</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <ShareActions onSave={handleSave} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const ShareActions = ({ onSave }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-1 place-self-center">
      <Button variant="outline" size="icon">
        X
      </Button>
      <Button variant="outline" size="icon" onClick={onSave}>
        <SaveIcon />
      </Button>
      <Button variant="outline" size="icon">
        <Share2Icon />
      </Button>
    </div>
  )
}
