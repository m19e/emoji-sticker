'use client'
import { useAtomValue } from 'jotai'

import { DeleteBaseImageButton } from '@/components/DeleteBaseImageButton'
import { Dropzone } from '@/components/Dropzone'
import { SaveImageButton } from '@/components/SaveImageButton'
import { isBaseImgLoadedAtom } from '@/store/atoms'

export const Header = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  return (
    <div className="flex justify-between gap-4">
      <DeleteBaseImageButton disabled={!isLoaded} />
      {isLoaded ? <SaveImageButton /> : <Dropzone />}
    </div>
  )
}
