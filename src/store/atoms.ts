import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import type Konva from 'konva'

import type { EmojiData } from '@/types'

// Atoms
export const baseImgUrlAtom = atomWithReset<string | null>(null)

export const isPickerOpenAtom = atom(false)

export const emojiDatasAtom = atomWithReset<EmojiData[]>([])

export const rectanglesAtom = atomWithReset<{ id: string }[]>([])

export const selectedStickerIdAtom = atomWithReset<string | null>(null)

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

// TODO iOS判定用のderived atom追加
export const osAtom = atom((get) => {
  const { os } = get(userAgentAtom)

  return { ios: os === 'iOS', android: os === 'Android' }
})
