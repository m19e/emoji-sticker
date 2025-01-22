'use client'
import { useAtomValue } from 'jotai'
import { useMeasure } from 'react-use'

import { Canvas } from '@/components/Canvas'
import { ShareDialog } from '@/components/ShareDialog'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions'
import { useImageSize } from '@/hooks/useImageSize'
import { baseImgUrlAtom } from '@/store/atoms'

export const Editor = () => {
  const url = useAtomValue(baseImgUrlAtom)
  const [dimensions] = useImageSize(url)
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [canvasRef, { save }] = useCanvasData()

  const { isFullWidth } = useCanvasDimensions(dimensions)

  const handleSave = () => {
    const ratio = isFullWidth
      ? dimensions.width / width
      : dimensions.height / height
    save(ratio)
  }

  return (
    <>
      <div
        ref={ref}
        className={isFullWidth ? 'max-h-fit w-full' : 'h-full max-w-fit'}
        style={{
          aspectRatio: `${dimensions.width} / ${dimensions.height}`,
        }}
      >
        <Canvas
          ref={canvasRef}
          width={width}
          height={height}
          dimensions={dimensions}
        />
      </div>
      <ShareDialog onSave={handleSave} />
    </>
  )
}
