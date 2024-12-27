import { atomEffect } from 'jotai-effect'
import { withHistory } from 'jotai-history'
import { atomWithReset } from 'jotai/utils'

export const baseImgUrlAtom = atomWithReset<string | undefined>(undefined)

const baseImgUrlHistory = withHistory(baseImgUrlAtom, 2)
export const revokeEffect = atomEffect((get) => {
  const [url, prevUrl] = get(baseImgUrlHistory)
  if (typeof url === 'undefined') {
    prevUrl && URL.revokeObjectURL(prevUrl)
  }
})
