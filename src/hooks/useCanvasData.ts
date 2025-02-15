import { sendGTMEvent } from '@next/third-parties/google'
import { useAtom } from 'jotai'
import type Konva from 'konva'
import { toast } from 'sonner'

import { useCanvasSize } from '@/hooks/useCanvasSize'
import { canvasRefAtom } from '@/store/atoms'

type Return = {
  ref: (ref: Konva.Stage) => void
  save: () => void
  share: () => Promise<void>
}

// TODO GAでイベント追跡
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
    return `censored-${ts}.png`
  }

  const save = () => {
    const uri = canvasRef?.toDataURL({ pixelRatio })

    if (uri) {
      const fileName = getFileName()
      downloadUri(uri, fileName)
      toast.success('画像を保存しました')
      sendGTMEvent({ event: 'click_save_button', value: 'SAVE' })
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
    const blob = (await canvasRef?.toBlob({ pixelRatio })) as Blob
    const file = new File([blob], getFileName(), { type: blob.type })

    const text = '絵文字ステッカー！'
    const url = 'https://emoij-sticker.vercel.app'

    navigator
      .share({ text, url, files: [file] })
      .catch((error) => console.error(error))
    sendGTMEvent({ event: 'click_share_button', value: 'SHARE' })
  }

  return { ref: setCanvasRef, save, share }
}
