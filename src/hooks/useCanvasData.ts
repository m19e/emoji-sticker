import { useAtom } from 'jotai'
import type Konva from 'konva'

import { useCanvasSize } from '@/hooks/useCanvasSize'
import { canvasRefAtom } from '@/store/atoms'

type Return = {
  ref: (ref: Konva.Stage) => void
  save: () => void
  share: () => void
}

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

  // TODO 共有内容にテキストを含めることができるか調査する
  const share = async () => {
    if (!isSupported()) {
      return
    }
    const blob = (await canvasRef?.toBlob({ pixelRatio })) as Blob
    const file = new File([blob], getFileName(), { type: blob.type })

    // FIXME リリース時削除
    const title = 'タイトル'
    const text = '絵文字ステッカー！'
    const url = 'https://emoij-sticker.vercel.app'

    navigator
      .share({ title, text, url, files: [file] })
      .catch((error) => console.error(error))
  }

  return { ref: setCanvasRef, save, share }
}
