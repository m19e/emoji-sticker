import { useMedia, useWindowSize } from 'react-use'

import { CANVAS_MARGIN_Y, DESKTOP_CONTENTS_WIDTH } from '@/constants'
import { useCanvasDimensions } from '@/hooks/useCanvasDimensions'
import type { Dimensions } from '@/types'

export const useCanvasSize = (img: Dimensions) => {
  const { width, height } = useWindowSize({ initialWidth: 0, initialHeight: 0 })
  const isDesktop = useMedia('(min-width: 640px)')

  const fullWidth = isDesktop ? DESKTOP_CONTENTS_WIDTH : width
  const fullHeight = height - CANVAS_MARGIN_Y

  const { isFullWidth } = useCanvasDimensions(img)

  const style = isFullWidth
    ? {
        width: fullWidth,
        height: fullWidth * (img.height / img.width),
      }
    : {
        height: fullHeight,
        width: fullHeight * (img.width / img.height),
      }

  return { isFullWidth, canvas: style }
}
