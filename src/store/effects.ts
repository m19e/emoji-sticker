import { atomEffect } from 'jotai-effect'
import { withHistory } from 'jotai-history'
import { RESET } from 'jotai/utils'

import {
  baseImgUrlAtom,
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'

const baseImgUrlHistory = withHistory(baseImgUrlAtom, 2)

/**
 * baseImgUrlがリセットされた時、
 * 1. すべての絵文字を削除
 * 2. すべての図形を削除
 * 3. ステッカーの選択状態をリセット
 * 4. ベース画像atomに格納していたblobUrlをrevokeする
 */
export const revokeEffect = atomEffect((get, set) => {
  const [url, prevUrl] = get(baseImgUrlHistory)
  if (url === null) {
    set(emojiDatasAtom, RESET)
    set(rectanglesAtom, RESET)
    // TODO selectedDataAtomをリセットする
    set(selectedStickerIdAtom, RESET)
    prevUrl && URL.revokeObjectURL(prevUrl)
  }
})
