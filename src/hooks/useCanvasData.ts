import type Konva from 'konva'
import { type RefObject, useRef } from 'react'

export const useCanvasData = (): [
  RefObject<Konva.Stage | null>,
  { save: () => void },
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

  const save = () => {
    // const pixelRatio = DEFAULT_CANVAS_SIZE / size
    const uri = canvasRef.current?.toDataURL()
    console.log(uri)

    if (uri) {
      console.log('run save process')

      const fileName = `output.png`
      downloadUri(uri, fileName)
    }
  }

  return [canvasRef, { save }]
}
