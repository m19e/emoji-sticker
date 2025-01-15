'use client'
import { useAtomValue } from 'jotai'

import { Dropzone } from '@/components/Dropzone'
import { DeleteBaseImageButton } from '@/components/button/DeleteBaseImageButton'
import { OpenShareDialogButton } from '@/components/button/OpenShareDialogButton'
import { isBaseImgLoadedAtom } from '@/store/atoms'

export const Header = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  return (
    <div className="flex justify-between gap-4">
      <DeleteBaseImageButton disabled={!isLoaded} />
      <div>
        <OpenShareDialogButton disabled={!isLoaded} />
        <Dropzone disabled={isLoaded} />
      </div>
    </div>
  )
}
