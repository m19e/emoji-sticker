import { sendGAEvent } from '@next/third-parties/google'
import { useAtom } from 'jotai'
import type Konva from 'konva'
import { toast } from 'sonner'

import { useCanvasSize } from '@/hooks/useCanvasSize'
import { canvasRefAtom } from '@/store/atoms'

// FIXME => constants.ts
const OUTPUT_MIME_TYPE = 'image/jpeg'

type Return = {
  ref: (ref: Konva.Stage) => void
  save: () => void
  share: () => Promise<void>
}

// FIXME pixelRatio: 画像が大きくなりすぎる
// FIXME => 縦横比は正しいがjpeg入力→png出力の場合に圧縮されずに大きくなる
// FIXME => 出力形式を.jpgに固定
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
      const fileName = getFileName()
      downloadUri(uri, fileName)
      toast.success('画像を保存しました')
      sendGAEvent('event', 'click_save_button', { value: 'SAVE' })
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
      return
    }
    const blob = (await canvasRef?.toBlob({
      pixelRatio,
      mimeType: OUTPUT_MIME_TYPE,
    })) as Blob
    const file = new File([blob], getFileName(), { type: blob.type })

    const text = '絵文字ステッカー！'
    const url = 'https://emoij-sticker.vercel.app'

    navigator
      .share({ text, url, files: [file] })
      .catch((error) => console.error(error))
    sendGAEvent('event', 'click_share_button', { value: 'SHARE' })
  }

  return { ref: setCanvasRef, save, share }
}
