'use client'
import { isBaseImgLoadedAtom } from '@/store/atoms'
import { useAtomValue } from 'jotai'

import { Canvas } from '@/components/Canvas'
import { Dropzone } from '@/components/Dropzone'

export const Container = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  if (isLoaded) {
    return <Canvas />
  }

  return <Dropzone />
}
