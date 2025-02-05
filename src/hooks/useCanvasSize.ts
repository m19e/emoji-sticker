import { useMemo } from 'react'
import { useMedia, useWindowSize } from 'react-use'

import { CANVAS_MARGIN_Y, DESKTOP_CONTENTS_WIDTH } from '@/constants'
import type { Dimensions } from '@/types'

type Args = {
  img: Dimensions
  canvas: Dimensions
}

// TODO maxWidth, maxHeightをそのまま受け取る
const getIsFullWidth = ({ img, canvas }: Args) => {
  if (img.width === img.height) {
    return { isFullWidth: true }
  }

  const isPortraitImg = img.width < img.height

  // h-fullの場合にwidthがあふれる場合を計算する
  if (isPortraitImg) {
    const clientWidth = canvas.height * (img.width / img.height)
    const isOverflowX = clientWidth >= canvas.width
    return { isFullWidth: isOverflowX }
  }

  // w-fullの場合にheightがあふれる場合を計算する
  const clientHeight = canvas.width * (img.height / img.width)
  const isOverflowY = clientHeight >= canvas.height
  return { isFullWidth: !isOverflowY }
}

export const useCanvasSize = (img: Dimensions) => {
  const { width, height } = useWindowSize({ initialWidth: 0, initialHeight: 0 })
  const isDesktop = useMedia('(min-width: 640px)')

  const maxWidth = isDesktop ? DESKTOP_CONTENTS_WIDTH : width
  const maxHeight = height - CANVAS_MARGIN_Y

  const { isFullWidth } = useMemo(
    () =>
      getIsFullWidth({
        img,
        canvas: {
          width: maxWidth,
          height: maxHeight,
        },
      }),
    [img, maxWidth, maxHeight],
  )

  // TODO わかりやすい命名に
  const style = isFullWidth
    ? {
        width: maxWidth,
        height: maxWidth * (img.height / img.width),
      }
    : {
        height: maxHeight,
        width: maxHeight * (img.width / img.height),
      }

  return { isFullWidth, canvas: style }
}
