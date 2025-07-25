import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import type Konva from 'konva'

import type { SelectedSticker } from '@/brand'
import type { EmojiData, RectData } from '@/types'

// Atoms
export const baseImgUrlAtom = atomWithReset<string | null>(null)

export const isPickerOpenAtom = atom(false)

export const emojiDatasAtom = atomWithReset<EmojiData[]>([])

export const rectanglesAtom = atomWithReset<RectData[]>([])

// TODO IDatomを消してselectedStickerAtomに情報をまとめる
// TODO IdAtomをdataAtomに依存するDerived atomにする？
// export const selectedStickerIdAtom = atomWithReset<string | null>(null)

// TODO Rename to `selectedStickerAtom`
export const selectedStickerDataAtom = atomWithReset<SelectedSticker | null>(
  null,
)

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
  const data = get(selectedStickerDataAtom)

  return data === null ? null : data.id
})
