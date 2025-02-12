'use client'
import { useAtom } from 'jotai'
import { SaveIcon, Share2Icon } from 'lucide-react'

import { useCanvasData } from '@/hooks/useCanvasData'
import { isShareDialogOpenAtom } from '@/store/atoms'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerFooter } from '@/components/ui/drawer'

// TODO descriptionに展開できる説明UIを作る？
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
      <DrawerContent className="border-none bg-slate-800 font-[family-name:var(--font-rounded)]">
        <DrawerFooter className="pt-4 pb-8">
          <Button
            className="flex justify-between border-none bg-slate-700 px-4 font-bold text-lg text-slate-100"
            size="lg"
            onClick={handleSave}
          >
            保存する
            <SaveIcon />
          </Button>
          <Button
            className="flex justify-between border-none bg-slate-700 px-4 font-bold text-lg text-slate-100"
            size="lg"
            onClick={handleShare}
          >
            共有する
            <Share2Icon />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
