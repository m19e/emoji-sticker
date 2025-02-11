'use client'
import { useAtomValue } from 'jotai'

import { isBaseImgLoadedAtom } from '@/store/atoms'

import { DeleteBaseImageButton } from '@/components/button/DeleteBaseImageButton'
import { OpenShareDialogButton } from '@/components/button/OpenShareDialogButton'

export const Header = () => {
  const isLoaded = useAtomValue(isBaseImgLoadedAtom)

  return (
    <div className="flex justify-between">
      <DeleteBaseImageButton disabled={!isLoaded} />
      <OpenShareDialogButton disabled={!isLoaded} />
    </div>
  )
}
