'use client'
import { useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { Image, Layer } from 'react-konva'

import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { baseImgUrlAtom, selectedStickerAtom } from '@/store/atoms'

export const BaseImageLayer = () => {
  const url = useAtomValue(baseImgUrlAtom)
  const resetSelected = useResetAtom(selectedStickerAtom)
  const [image] = useAnonymousImage(url ?? '')

  const handleUnselect = () => {
    resetSelected()
  }

  return (
    <Layer onMouseDown={handleUnselect} onTouchStart={handleUnselect}>
      <Image image={image} x={0} y={0} />
    </Layer>
  )
}
