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
  onShare: () => Promise<void>
}

export const ShareDialog = ({ onSave, onShare }: Props) => {
  const [open, setOpen] = useAtom(isShareDialogOpenAtom)

  const isDesktop = useMedia('(min-width: 640px)')

  const handleSave = () => {
    onSave()
    setOpen(false)
    toast.success('画像を保存しました')
  }

  const handleShare = async () => {
    await onShare()
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>画像を保存・共有</DialogTitle>
          </DialogHeader>
          <DrawerFooter>
            <ShareActions onSave={handleSave} onShare={handleShare} />
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
          <ShareActions onSave={handleSave} onShare={handleShare} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const ShareActions = ({ onSave, onShare }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-1 place-self-center">
      <Button
        className="h-12 w-12"
        variant="outline"
        size="icon"
        onClick={onSave}
      >
        <SaveIcon className="!size-6" />
      </Button>
      <Button
        className="h-12 w-12"
        variant="outline"
        size="icon"
        onClick={onShare}
      >
        <Share2Icon className="!size-6" />
      </Button>
    </div>
  )
}
