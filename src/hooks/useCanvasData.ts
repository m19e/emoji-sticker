import { useAtom, useAtomValue } from 'jotai'
import type Konva from 'konva'
import { toast } from 'sonner'

import { OUTPUT_MIME_TYPE } from '@/constants'
import { Dict } from '@/dict'
import { GA4Event, sendEvent } from '@/ga'
import { canvasRefAtom, emojiDatasAtom, rectanglesAtom } from '@/store/atoms'

import { useCanvasSize } from '@/hooks/useCanvasSize'
import { useUserAgent } from '@/hooks/useUserAgent'

type Return = {
  ref: (ref: Konva.Stage) => void
  save: () => void
  share: () => Promise<void>
}

// TODO GA4上で確認・集計しやすいようにフラット化
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
  const { os, browser } = useUserAgent()

  const downloadUri = (uri: string, name: string) => {
    const link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getFileName = () => {
    const ts = Date.now().toString(16)
    return `es-${ts}.jpg`
  }

  const getEventParams = () => {
    const params: SendEventParams = {
      count_emoji: emojis.length,
      count_rect: rects.length,
      count_all: emojis.length + rects.length,
      os,
      browser,
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
      toast.success(Dict.save.toast)
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

  const share = async () => {
    if (!isSupported()) {
      toast.error(Dict.share.toast.error)

      const env = `${os} / ${browser}`
      sendEvent(GA4Event.ShareNotSupported, { env })

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
      .then(() => {
        toast.success(Dict.share.toast.success)
      })
      .catch((error) => console.error(error))
  }

  return { ref: setCanvasRef, save, share }
}
