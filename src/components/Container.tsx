'use client'
import { isBaseImgLoadedAtom } from '@/store/atoms'
import { useAtomValue } from 'jotai'

import { Canvas } from '@/components/Canvas'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ
// TODO 免責事項
// TODO 各種リンク(SNS, github)
// TODO コンポーネント分割
export const Container = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  if (isLoaded) {
    return <Canvas />
  }

  return <Dropzone />
}
