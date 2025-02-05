import type Konva from 'konva'
import { type RefObject, useRef } from 'react'

type CanvasAction = (pixelRatio: number) => void

export const useCanvasData = (): [
  RefObject<Konva.Stage | null>,
  {
    save: CanvasAction
    share: CanvasAction
  },
] => {
  const canvasRef = useRef<Konva.Stage>(null)

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

  const save = (pixelRatio: number) => {
    const uri = canvasRef.current?.toDataURL({ pixelRatio })

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
  const share = async (pixelRatio: number) => {
    if (!isSupported()) {
      return
    }
    const blob = (await canvasRef.current?.toBlob({ pixelRatio })) as Blob
    const file = new File([blob], getFileName(), { type: blob.type })

    const text = '絵文字ステッカー！'
    const url = 'https://emoij-sticker.vercel.app'

    navigator
      .share({ text, url, files: [file] })
      .catch((error) => console.error(error))
  }

  return [canvasRef, { save, share }]
}
