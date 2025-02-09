import { useAtomValue } from 'jotai'

import { useImageSize } from '@/hooks/useImageSize'
import { baseImgUrlAtom } from '@/store/atoms'

export const useBaseImageSize = () => {
  const url = useAtomValue(baseImgUrlAtom)
  const [imgSize] = useImageSize(url)

  return { imgSize }
}
