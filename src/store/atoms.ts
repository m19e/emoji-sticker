import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import type Konva from 'konva'

import type { SelectedSticker } from '@/brand'
import { INITIAL_DIMENSIONS } from '@/constants'
import type { Dimensions, EmojiData, RectData } from '@/types'

// Atoms
export const baseImgUrlAtom = atomWithReset<string | null>(null)

export const baseImgSizeAtom = atomWithReset<Dimensions>(INITIAL_DIMENSIONS)

export const isPickerOpenAtom = atom(false)

export const emojiDatasAtom = atomWithReset<EmojiData[]>([])

export const rectanglesAtom = atomWithReset<RectData[]>([])

export const selectedStickerAtom = atomWithReset<SelectedSticker | null>(null)

export const isShareDialogOpenAtom = atom(false)

export const canvasRefAtom = atom<Konva.Stage | null>(null)

export const userAgentAtom = atom({
  os: '',
  browser: '',
})

// Derived atoms
export const isBaseImgLoadedAtom = atom((get) => {
  const url = get(baseImgUrlAtom)
  return url !== null
})

export const osAtom = atom((get) => {
  const { os } = get(userAgentAtom)

  return { ios: os === 'iOS', android: os === 'Android' }
})

export const selectedStickerIdAtom = atom((get) => {
  const data = get(selectedStickerAtom)

  return data === null ? null : data.id
})
