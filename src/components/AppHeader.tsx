'use client'
import { useAtomValue } from 'jotai'

import { isBaseImgLoadedAtom } from '@/store/atoms'

import { DeleteBaseImageButton } from '@/components/button/DeleteBaseImageButton'
import { ShareButton } from '@/components/button/ShareButton'

export const Header = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  return (
    <div className="flex justify-between">
      <DeleteBaseImageButton disabled={!isLoaded} />
      <ShareButton disabled={!isLoaded} />
    </div>
  )
}
