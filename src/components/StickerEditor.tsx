'use client'
import { useAtomValue } from 'jotai'

import { Canvas } from '@/components/Canvas'
import { ShareDialog } from '@/components/ShareDialog'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useCanvasSize } from '@/hooks/useCanvasSize'
import { useImageSize } from '@/hooks/useImageSize'
import { baseImgUrlAtom } from '@/store/atoms'

export const Editor = () => {
  const url = useAtomValue(baseImgUrlAtom)
  const [dimensions] = useImageSize(url)
  const [canvasRef, { save, share }] = useCanvasData()

  const {
    isFullWidth,
    canvas: { width, height },
  } = useCanvasSize(dimensions)

  const handleSave = () => {
    const ratio = isFullWidth
      ? dimensions.width / width
      : dimensions.height / height
    save(ratio)
  }

  const handleShare = async () => {
    const ratio = isFullWidth
      ? dimensions.width / width
      : dimensions.height / height
    await share(ratio)
  }

  return (
    <>
      {/* <div
        ref={ref}
        className={isFullWidth ? 'max-h-fit w-full' : 'h-full max-w-fit'}
        style={containerStyle}
      > */}
      <Canvas
        ref={canvasRef}
        width={width}
        height={height}
        dimensions={dimensions}
      />
      {/* </div> */}
      <ShareDialog onSave={handleSave} onShare={handleShare} />
    </>
  )
}
