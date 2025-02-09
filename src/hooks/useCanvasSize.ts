import { useMemo } from 'react'
import { useWindowSize } from 'react-use'

import { CANVAS_MARGIN_Y, DESKTOP_CONTENTS_WIDTH } from '@/constants'
import { useBaseImageSize } from '@/hooks/useBaseImageSize'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Dimensions } from '@/types'

type Args = {
  img: Dimensions
  maxWidth: number
  maxHeight: number
}

const getFullWidth = ({
  img,
  maxWidth,
  maxHeight,
}: Args): { fullWidth: boolean } => {
  if (img.width === img.height) {
    return { fullWidth: true }
  }

  const isPortraitImg = img.width < img.height

  // h-fullの場合にwidthがあふれる場合を計算する
  if (isPortraitImg) {
    const canvasWidth = maxHeight * (img.width / img.height)
    const isOverflowX = canvasWidth >= maxWidth
    return { fullWidth: isOverflowX }
  }

  // w-fullの場合にheightがあふれる場合を計算する
  const canvasHeight = maxWidth * (img.height / img.width)
  const isOverflowY = canvasHeight >= maxHeight
  return { fullWidth: !isOverflowY }
}

export const useCanvasSize = () => {
  const { width, height } = useWindowSize({ initialWidth: 0, initialHeight: 0 })
  const { isDesktop } = useMediaQuery()
  const { imgSize: img } = useBaseImageSize()

  const maxWidth = isDesktop ? DESKTOP_CONTENTS_WIDTH : width
  const maxHeight = height - CANVAS_MARGIN_Y

  const { fullWidth } = useMemo(
    () =>
      getFullWidth({
        img,
        maxWidth,
        maxHeight,
      }),
    [img, maxWidth, maxHeight],
  )

  const pixelRatio = fullWidth ? img.width / maxWidth : img.height / maxHeight
  const canvas = fullWidth
    ? {
        width: maxWidth,
        height: maxWidth * (img.height / img.width),
      }
    : {
        height: maxHeight,
        width: maxHeight * (img.width / img.height),
      }

  return { pixelRatio, canvas }
}
