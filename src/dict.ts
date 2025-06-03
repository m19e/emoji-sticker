// TODO グローバル辞書
// TODO 削除 > ステッカー,ベース画像
// TODO 保存
// TODO 共有
// TODO トースト
// TODO 処理 > UIの構造に
export const Dict = {
  cancel: 'キャンセル',
  delete: {
    sticker: 'ステッカーを削除',
    baseImage: {
      btn: '画像を削除する',
      toast: '画像を削除しました',
    },
  },
  save: {
    btn: '保存する',
    toast: '画像を保存しました',
  },
  share: {
    btn: '共有する',
    toast: {
      success: '画像を共有しました',
      error: '現在の環境では共有機能をご利用いただけません',
    },
  },
} as const
