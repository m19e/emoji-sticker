'use client'
import { useAtomValue } from 'jotai'

import { useBaseImageSize } from '@/hooks/useBaseImageSize'
import { isBaseImgLoadedAtom } from '@/store/atoms'

import { Canvas } from '@/components/Canvas'
import { Unloaded } from '@/components/Unloaded'

export const Container = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)
  useBaseImageSize()

  if (isLoaded) {
    return <Canvas />
  }

  return <Unloaded />
}
