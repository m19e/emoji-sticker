import { useAtom } from 'jotai'
import type Konva from 'konva'
import { toast } from 'sonner'

import { OUTPUT_MIME_TYPE } from '@/constants'
import { CustomEvent, sendEvent } from '@/ga'
import { useCanvasSize } from '@/hooks/useCanvasSize'
import { canvasRefAtom } from '@/store/atoms'

type Return = {
  ref: (ref: Konva.Stage) => void
  save: () => void
  share: () => Promise<void>
}

// TODO GA4カスタムイベントの追加(add_emoji, add_rectなど)
export const useCanvasData = (): Return => {
  const [canvasRef, setCanvasRef] = useAtom(canvasRefAtom)
  const { pixelRatio } = useCanvasSize()

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
    return `censored-${ts}.jpg`
  }

  const save = () => {
    const uri = canvasRef?.toDataURL({
      pixelRatio,
      mimeType: OUTPUT_MIME_TYPE,
    })

    if (uri) {
      sendEvent(CustomEvent.Save)

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

  const share = async () => {
    if (!isSupported()) {
      toast.error('現在の環境では共有機能をご利用いただけません')
      return
    }

    sendEvent(CustomEvent.Share)

    const blob = (await canvasRef?.toBlob({
      pixelRatio,
      mimeType: OUTPUT_MIME_TYPE,
    })) as Blob
    const file = new File([blob], getFileName(), { type: blob.type })

    const text = '#絵文字ステッカー！\nhttps://emoji-sticker.vercel.app'
    const url = 'https://emoji-sticker.vercel.app'

    navigator
      .share({ text, url, files: [file] })
      .catch((error) => console.error(error))
  }

  return { ref: setCanvasRef, save, share }
}
