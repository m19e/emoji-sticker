import { useMemo } from 'react'
import { useMedia, useWindowSize } from 'react-use'

import { CANVAS_MARGIN_Y, DESKTOP_CONTENTS_WIDTH } from '@/constants'
import type { Dimensions } from '@/types'

type Args = {
  img: Dimensions
  maxWidth: number
  maxHeight: number
}

// TODO maxWidth, maxHeightをそのまま受け取る
// TODO isFullWidth => fullWidth
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

export const useCanvasSize = (img: Dimensions) => {
  const { width, height } = useWindowSize({ initialWidth: 0, initialHeight: 0 })
  const isDesktop = useMedia('(min-width: 640px)')

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

  // TODO わかりやすい命名に
  const canvas = fullWidth
    ? {
        width: maxWidth,
        height: maxWidth * (img.height / img.width),
      }
    : {
        height: maxHeight,
        width: maxHeight * (img.width / img.height),
      }

  return { fullWidth, canvas }
}
