'use client'
import { useAtomValue } from 'jotai'
import { useMeasure } from 'react-use'

import { Canvas } from '@/components/Canvas'
import { ShareDialog } from '@/components/ShareDialog'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions'
import { useImageSize } from '@/hooks/useImageSize'
import { baseImgUrlAtom } from '@/store/atoms'
import { type CSSProperties, useMemo } from 'react'

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

  const containerStyle = useMemo(() => {
    const aspectRatio = `${dimensions.width} / ${dimensions.height}`
    const style: CSSProperties = isFullWidth
      ? {
          aspectRatio,
          width: '100%',
          height: `calc(${height} * ${dimensions.height} / ${dimensions.width})`,
          maxHeight: 'fit-content',
        }
      : {
          aspectRatio,
          width: `calc(${width} * ${dimensions.width} / ${dimensions.height})`,
          height: '100%',
          maxWidth: 'fit-content',
        }

    return style
  }, [dimensions, isFullWidth, width, height])

  return (
    <>
      <div
        ref={ref}
        // className={isFullWidth ? 'max-h-fit w-full' : 'h-full max-w-fit'}
        style={containerStyle}
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
