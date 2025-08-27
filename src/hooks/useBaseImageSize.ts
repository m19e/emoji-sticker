import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useImageSize } from '@/hooks/useImageSize'
import { baseImgSizeAtom, baseImgUrlAtom } from '@/store/atoms'

// TODO imgSizeをjotaiで管理して画像読み込み処理を一度だけに抑える
// TODO このhooksではimgSizeを返さず、atomから直接データ取得する
export const useBaseImageSize = () => {
  const url = useAtomValue(baseImgUrlAtom)
  const setSize = useSetAtom(baseImgSizeAtom)
  const [imgSize] = useImageSize(url)

  useEffect(() => {
    setSize(imgSize)
  }, [setSize, imgSize])
}
