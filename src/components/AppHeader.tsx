'use client'
import { useAtomValue } from 'jotai'

import { DeleteBaseImageButton } from '@/components/button/DeleteBaseImageButton'
import { Dropzone } from '@/components/Dropzone'
import { SaveImageButton } from '@/components/button/SaveImageButton'
import { isBaseImgLoadedAtom } from '@/store/atoms'

export const Header = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  return (
    <div className="flex justify-between gap-4">
      <DeleteBaseImageButton disabled={!isLoaded} />
      <div>
        <SaveImageButton disabled={!isLoaded} />
        <Dropzone disabled={isLoaded} />
      </div>
    </div>
  )
}
