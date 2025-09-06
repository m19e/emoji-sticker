export type Dimensions = {
  width: number
  height: number
}

// TODO モバイルのStageドラッグ移動のためのpositionフィールド追加
// TODO position to required
export type EmojiData = {
  id: string
  u: string
  fallback: string
  copySize?: number
  position: {
    x: number
    y: number
  }
}

// TODO モバイルのStageドラッグ移動のためのpositionフィールド追加
// TODO position to required
export type RectData = {
  id: string
  copy?: {
    w: number
    h: number
  }
  position: {
    x: number
    y: number
  }
}

export type ButtonProps = {
  disabled?: boolean
}

export type StickerProps = {
  position: {
    x: number
    y: number
  }
  isDesktop: boolean
}
