import { atomEffect } from 'jotai-effect'
import { withHistory } from 'jotai-history'
import { RESET, atomWithReset } from 'jotai/utils'

export const baseImgUrlAtom = atomWithReset<string | undefined>(undefined)

export const emojiSvgIdsAtom = atomWithReset<{ id: string; u: string }[]>([])

const baseImgUrlHistory = withHistory(baseImgUrlAtom, 2)

/**
 * baseImgUrlがリセットされた時、
 * 1. Konva上のすべての絵文字を削除
 * 2. ベース画像atomに格納していたblobをrevokeする
 */
export const revokeEffect = atomEffect((get, set) => {
  const [url, prevUrl] = get(baseImgUrlHistory)
  if (typeof url === 'undefined') {
    set(emojiSvgIdsAtom, RESET)
    prevUrl && URL.revokeObjectURL(prevUrl)
  }
})
