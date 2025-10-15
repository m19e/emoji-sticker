'use client'
import { InfoIcon } from 'lucide-react'

import { GA4Event, sendEvent } from '@/ga'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Logo } from '@/components/Logo'

// TODO 共通テキストをDictに移す
export const AboutDialog = () => {
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => open && sendEvent(GA4Event.ShowAbout)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="place-items-center"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>このアプリについて</DialogTitle>
        </DialogHeader>
        <Logo />
        <Accordion
          type="single"
          defaultValue="item-1"
          className="w-full max-w-80"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>このアプリについて</AccordionTrigger>
            <AccordionContent>
              「絵文字ステッカー！」は画像に絵文字を貼りつけて装飾したり、情報を隠すことのできる画像編集アプリです。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>画像データの取り扱いについて</AccordionTrigger>
            <AccordionContent>
              このアプリは画像編集処理を利用者の端末内でのみ行っており、読み込んだ画像を外部に送信することはありません。画像がサーバーに保存されたり、外部に漏洩する心配はありません。
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  )
}
