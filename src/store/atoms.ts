import { atomWithReset } from 'jotai/utils'

export const baseImgUrlAtom = atomWithReset<string | undefined>(undefined)
