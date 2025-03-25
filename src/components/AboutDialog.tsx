'use client'
import { InfoIcon } from 'lucide-react'
import { useState } from 'react'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// TODO 免責事項はAccordionで
export const AboutDialog = () => {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="place-items-center">
        <DialogHeader>
          <DialogTitle>このアプリについて</DialogTitle>
        </DialogHeader>
        <Logo />
        <DialogDescription>
          「絵文字ステッカー！」は画像に絵文字を貼りつけて装飾したり、情報を隠すことのできる画像編集アプリです。
        </DialogDescription>
        <DialogDescription>※画像データの取り扱いについて</DialogDescription>
        <DialogDescription>
          このアプリは画像編集を利用者の端末内ブラウザ内でのみ行っており、読み込んだ画像を外部に送信することはありません。画像の内容がサーバーに保存されたり、外部に漏洩する心配はありません。
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
