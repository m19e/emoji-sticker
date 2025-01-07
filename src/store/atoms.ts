import type { EmojiData } from '@/types'
import { atom } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { withHistory } from 'jotai-history'
import { RESET, atomWithReset } from 'jotai/utils'

export const baseImgUrlAtom = atomWithReset<string | null>(null)

export const emojiDatasAtom = atomWithReset<EmojiData[]>([])

const baseImgUrlHistory = withHistory(baseImgUrlAtom, 2)

/**
 * baseImgUrlがリセットされた時、
 * 1. Konva上のすべての絵文字を削除
 * 2. ベース画像atomに格納していたblobをrevokeする
 */
export const revokeEffect = atomEffect((get, set) => {
  const [url, prevUrl] = get(baseImgUrlHistory)
  if (typeof url === 'undefined') {
    set(emojiDatasAtom, RESET)
    prevUrl && URL.revokeObjectURL(prevUrl)
  }
})

export const isPickerOpenAtom = atom(false)
