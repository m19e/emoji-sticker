import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import type Konva from 'konva'

import type { SelectedSticker } from '@/brand'
import type { EmojiData, RectData } from '@/types'

// Atoms
export const baseImgUrlAtom = atomWithReset<string | null>(null)

export const isPickerOpenAtom = atom(false)

export const emojiDatasAtom = atomWithReset<EmojiData[]>([])

// TODO Rectsがcopy-sizeを持つ
export const rectanglesAtom = atomWithReset<RectData[]>([])

// TODO IDatomを消してselectedStickerAtomに情報をまとめる
// TODO IdAtomをdataAtomに依存するDerived atomにする？
// export const selectedStickerIdAtom = atomWithReset<string | null>(null)

// TODO feat:選択ステッカーの複製: ステッカー選択時に更新
// TODO scaleはデータとして持たず、更新時に計算してwidth,heightに含める
// TODO こちらでIDも持つ
// TODO 絵文字はw,h両方は要らないのでrectとは使うフィールドを分けたい(branded types?)
// TODO この型は消す
type SelectedStickerData = {
  type: 'emoji' | 'rect'
  id: string
  w: number
  h: number
}

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
