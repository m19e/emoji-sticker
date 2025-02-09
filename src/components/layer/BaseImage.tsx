'use client'
import { useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { Image, Layer } from 'react-konva'

import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { baseImgUrlAtom, selectedStickerIdAtom } from '@/store/atoms'

export const BaseImageLayer = () => {
  const resetSelectedStickerId = useResetAtom(selectedStickerIdAtom)
  const url = useAtomValue(baseImgUrlAtom)

  const [image] = useAnonymousImage(url ?? '')

  const handleUnselect = () => {
    resetSelectedStickerId()
  }

  return (
    <Layer onMouseDown={handleUnselect} onTouchStart={handleUnselect}>
      <Image image={image} x={0} y={0} />
    </Layer>
  )
}
