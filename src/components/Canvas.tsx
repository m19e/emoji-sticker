'use client'
import { Stage } from 'react-konva'

import { useBaseImageSize } from '@/hooks/useBaseImageSize'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useCanvasSize } from '@/hooks/useCanvasSize'

import { BaseImageLayer } from '@/components/layer/BaseImage'
import { StickerLayer } from '@/components/layer/Sticker'

// TODO コンポーネント分割
export const Canvas = () => {
  const { ref } = useCanvasData()
  const {
    canvas: { width, height },
  } = useCanvasSize()
  const { imgSize } = useBaseImageSize()

  return (
    <Stage
      ref={ref}
      width={width}
      height={height}
      scaleX={width / imgSize.width}
      scaleY={height / imgSize.height}
    >
      <BaseImageLayer />
      <StickerLayer img={imgSize} />
    </Stage>
  )
}
