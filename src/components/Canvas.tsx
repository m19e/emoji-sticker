'use client'
import { useAtomValue } from 'jotai'
import { Stage } from 'react-konva'

import { useBaseImageSize } from '@/hooks/useBaseImageSize'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useCanvasSize } from '@/hooks/useCanvasSize'
import { isBaseImgLoadedAtom } from '@/store/atoms'

import { Dropzone } from '@/components/Dropzone'
import { BaseImageLayer } from '@/components/layer/BaseImage'
import { StickerLayer } from '@/components/layer/Sticker'

// TODO アプリのロゴ
// TODO 免責事項
// TODO 各種リンク(SNS, github)
export const Canvas = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  const { ref } = useCanvasData()
  const {
    canvas: { width, height },
  } = useCanvasSize()
  const { imgSize } = useBaseImageSize()

  if (isLoaded) {
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

  return <Dropzone />
}
