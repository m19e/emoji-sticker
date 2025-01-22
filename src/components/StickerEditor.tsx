'use client'
import { useAtomValue } from 'jotai'
import { useMeasure, useMedia, useWindowSize } from 'react-use'

import { Canvas } from '@/components/Canvas'
import { ShareDialog } from '@/components/ShareDialog'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useImageSize } from '@/hooks/useImageSize'
import { baseImgUrlAtom } from '@/store/atoms'
import type { Dimensions } from '@/types'

const useCanvasDimensions = (img: Dimensions): { isFullWidth: boolean } => {
  const { width, height } = useWindowSize({ initialWidth: 0, initialHeight: 0 })
  const isDesktop = useMedia('(min-width: 640px)')
  const desktopContentsWidth = 384
  const marginY = 72

  const canvasWidth = isDesktop ? desktopContentsWidth : width
  const canvasHeight = height - marginY

  if (img.width === img.height) {
    return { isFullWidth: true }
  }

  const isPortraitImg = img.width < img.height

  if (isPortraitImg) {
    // h-fullで横幅あふれる場合を計算する
    const clientWidth = canvasHeight * (img.width / img.height)
    const isOverflowX = clientWidth >= canvasWidth
    return { isFullWidth: isOverflowX }
  }

  const clientHeight = canvasWidth * (img.height / img.width)
  const isOverflowY = clientHeight >= canvasHeight
  return { isFullWidth: !isOverflowY }
}

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
