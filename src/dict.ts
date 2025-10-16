// TODO aboutフィールド追加
export const Dict = {
  cancel: 'キャンセル',
  duplicate: '複製',
  delete: {
    sticker: '削除',
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
  about: {
    title: 'このアプリについて',
  },
} as const
