import type { Dimensions } from '@/types'
import { useMedia, useWindowSize } from 'react-use'

import { CANVAS_MARGIN_Y, DESKTOP_CONTENTS_WIDTH } from '@/constants'

export const useCanvasDimensions = (
  img: Dimensions,
): { isFullWidth: boolean } => {
  const { width, height } = useWindowSize({ initialWidth: 0, initialHeight: 0 })
  const isDesktop = useMedia('(min-width: 640px)')

  const canvasWidth = isDesktop ? DESKTOP_CONTENTS_WIDTH : width
  const canvasHeight = height - CANVAS_MARGIN_Y

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

  // w-fullで縦幅あふれる場合を計算する
  const clientHeight = canvasWidth * (img.height / img.width)
  const isOverflowY = clientHeight >= canvasHeight
  return { isFullWidth: !isOverflowY }
}
