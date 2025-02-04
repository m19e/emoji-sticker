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
  const [imgSize] = useImageSize(url)
  const [canvasRef, { save, share }] = useCanvasData()

  const {
    isFullWidth,
    canvas: { width, height },
  } = useCanvasSize(imgSize)

  const handleSave = () => {
    const ratio = isFullWidth ? imgSize.width / width : imgSize.height / height
    save(ratio)
  }

  const handleShare = async () => {
    const ratio = isFullWidth ? imgSize.width / width : imgSize.height / height
    await share(ratio)
  }

  return (
    <>
      <Canvas ref={canvasRef} width={width} height={height} imgSize={imgSize} />
      <ShareDialog onSave={handleSave} onShare={handleShare} />
    </>
  )
}
