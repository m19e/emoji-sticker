import type Konva from 'konva'
import { type RefObject, useRef } from 'react'

export const useCanvasData = (): [
  RefObject<Konva.Stage | null>,
  { save: (pixelRatio: number) => void },
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

  const save = (pixelRatio: number) => {
    const uri = canvasRef.current?.toDataURL({ pixelRatio })

    if (uri) {
      const fileName = `output.png`
      downloadUri(uri, fileName)
    }
  }

  return [canvasRef, { save }]
}
