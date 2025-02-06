'use client'
import { useAtom } from 'jotai'
import { useMedia } from 'react-use'
import { toast } from 'sonner'

import { SaveIcon, Share2Icon } from 'lucide-react'

import { isShareDialogOpenAtom } from '@/store/atoms'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerFooter } from '@/components/ui/drawer'

type Props = {
  onSave: () => void
  onShare: () => Promise<void>
}

// TODO descriptionに展開できる説明UIを作る？
// TODO デスクトップ時dropdown menuにする？
// TODO 共有後にToast
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
        <DialogContent className="border-none bg-slate-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-slate-100">
              画像を保存・共有
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              ※共有から選択すると直接ツイートできます
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <ShareActions onSave={handleSave} onShare={handleShare} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="border-none bg-slate-800">
        {/* <DrawerHeader className="text-left">
          <DrawerTitle className="text-slate-100">画像を保存・共有</DrawerTitle>
          <DrawerDescription>
            ※共有から選択すると直接ツイートできます
          </DrawerDescription>
        </DrawerHeader> */}
        <DrawerFooter className="py-4">
          <ShareActions onSave={handleSave} onShare={handleShare} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const ShareActions = ({ onSave, onShare }: Props) => {
  return (
    <>
      <Button
        className="flex justify-between border-none bg-slate-700 text-slate-100"
        variant="outline"
        onClick={onSave}
      >
        画像を保存する
        <SaveIcon className="text-slate-300" />
      </Button>
      <Button
        className="flex justify-between border-none bg-slate-700 text-slate-100"
        variant="outline"
        onClick={onShare}
      >
        画像を共有する
        <Share2Icon className="text-slate-300" />
      </Button>
    </>
  )
}
