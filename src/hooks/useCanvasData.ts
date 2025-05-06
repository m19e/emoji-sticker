import { useAtom, useAtomValue } from 'jotai'
import type Konva from 'konva'
import { toast } from 'sonner'
import { UAParser } from 'ua-parser-js'

import { OUTPUT_MIME_TYPE } from '@/constants'
import { GA4Event, sendEvent } from '@/ga'
import { useCanvasSize } from '@/hooks/useCanvasSize'
import { canvasRefAtom, emojiDatasAtom, rectanglesAtom } from '@/store/atoms'

type Return = {
  ref: (ref: Konva.Stage) => void
  save: () => void
  share: () => Promise<void>
}

// GA4上で確認・集計しやすいようにフラット化する
type SendEventParams = {
  count_emoji: number
  count_rect: number
  count_all: number
  os: string
  browser: string
}

export const useCanvasData = (): Return => {
  const [canvasRef, setCanvasRef] = useAtom(canvasRefAtom)
  const emojis = useAtomValue(emojiDatasAtom)
  const rects = useAtomValue(rectanglesAtom)

  const { pixelRatio } = useCanvasSize()

  const downloadUri = (uri: string, name: string) => {
    const link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // TODO 見栄えのよいファイル名に
  const getFileName = () => {
    const ts = Date.now().toString(16)
    return `censored-${ts}.jpg`
  }

  // FIXME 共有のたびにnewするの重そうなので先に取得して保持する
  const getEventParams = () => {
    const parser = new UAParser()
    const params: SendEventParams = {
      count_emoji: emojis.length,
      count_rect: rects.length,
      count_all: emojis.length + rects.length,
      os: parser.getOS().name || '',
      browser: parser.getBrowser().name || '',
    }

    return params
  }

  const save = () => {
    const uri = canvasRef?.toDataURL({
      pixelRatio,
      mimeType: OUTPUT_MIME_TYPE,
    })

    if (uri) {
      sendEvent(GA4Event.Save, getEventParams())

      const fileName = getFileName()
      downloadUri(uri, fileName)
      toast.success('画像を保存しました')
    }
  }

  const isSupported = () => {
    const testFile = new File(['test'], 'test.txt', { type: 'text/plain' })
    return (
      !!navigator.share &&
      !!navigator.canShare &&
      navigator.canShare({
        files: [testFile],
      })
    )
  }

  // TODO 共有できない環境でのGA4イベント追加、送信
  const share = async () => {
    if (!isSupported()) {
      toast.error('現在の環境では共有機能をご利用いただけません')
      return
    }

    sendEvent(GA4Event.Share, getEventParams())

    const blob = (await canvasRef?.toBlob({
      pixelRatio,
      mimeType: OUTPUT_MIME_TYPE,
    })) as Blob
    const file = new File([blob], getFileName(), { type: blob.type })

    const text = '#絵文字ステッカー！\nhttps://emoji-sticker.vercel.app'
    const url = 'https://emoji-sticker.vercel.app'

    navigator
      .share({
        // TODO リリース時に戻す
        // text,
        // url,
        files: [file],
      })
      .catch((error) => console.error(error))
  }

  return { ref: setCanvasRef, save, share }
}
