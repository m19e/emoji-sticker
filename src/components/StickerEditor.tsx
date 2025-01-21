'use client'
import { useAtomValue } from 'jotai'
import { useMeasure } from 'react-use'

import { Canvas } from '@/components/Canvas'
import { ShareDialog } from '@/components/ShareDialog'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useImageSize } from '@/hooks/useImageSize'
import { baseImgUrlAtom } from '@/store/atoms'
import type { Dimensions } from '@/types'

const checkAspectRatio = ({
  img,
  parent,
}: { img: Dimensions; parent: Dimensions }): { isFullWidth: boolean } => {
  if (img.width === img.height) {
    return { isFullWidth: true }
  }
  const isPortraitImg = img.width < img.height

  if (isPortraitImg) {
    // h-fullで横幅あふれる場合を計算する
    const clientWidth = parent.height * (img.width / img.height)
    const isOverflowX = clientWidth >= parent.width
    return { isFullWidth: isOverflowX }
  }

  return { isFullWidth: false }
}

export const Editor = () => {
  const url = useAtomValue(baseImgUrlAtom)
  const [dimensions] = useImageSize(url)
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [canvasRef, { save }] = useCanvasData()

  const isFullWidth = dimensions.width >= dimensions.height

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
