'use client'
import { isBaseImgLoadedAtom } from '@/store/atoms'
import { useAtomValue } from 'jotai'

import { Canvas } from '@/components/Canvas'
import { Unloaded } from '@/components/Unloaded'

export const Container = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  if (isLoaded) {
    return <Canvas />
  }

  return <Unloaded />
}
