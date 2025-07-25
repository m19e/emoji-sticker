import { atomEffect } from 'jotai-effect'
import { withHistory } from 'jotai-history'
import { RESET } from 'jotai/utils'

import {
  baseImgUrlAtom,
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerDataAtom,
} from '@/store/atoms'

const baseImgUrlHistory = withHistory(baseImgUrlAtom, 2)

/**
 * baseImgUrlがリセットされた時、
 * 1. すべての絵文字をリセット
 * 2. すべての図形をリセット
 * 3. 選択状態をリセット
 * 4. ベース画像atomに格納していたblobUrlをrevokeする
 */
export const revokeEffect = atomEffect((get, set) => {
  const [url, prevUrl] = get(baseImgUrlHistory)
  if (url === null) {
    set(emojiDatasAtom, RESET)
    set(rectanglesAtom, RESET)
    // TODO selectedDataAtomをリセットする
    set(selectedStickerDataAtom, RESET)
    prevUrl && URL.revokeObjectURL(prevUrl)
  }
})
