import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useImageSize } from '@/hooks/useImageSize'
import { baseImgSizeAtom, baseImgUrlAtom } from '@/store/atoms'

export const useBaseImageSize = () => {
  const url = useAtomValue(baseImgUrlAtom)
  const setSize = useSetAtom(baseImgSizeAtom)
  const [imgSize] = useImageSize(url)

  useEffect(() => {
    setSize(imgSize)
  }, [setSize, imgSize])
}
