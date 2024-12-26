'use client'
import { baseImgUrlAtom } from '@/store/atoms'
import { useAtomValue } from 'jotai'

export const BaseImage = () => {
  const url = useAtomValue(baseImgUrlAtom)

  return <img src={url} alt={url} />
}
