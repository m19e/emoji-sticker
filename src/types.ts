export type Dimensions = {
  width: number
  height: number
}

export type EmojiData = {
  id: string
  u: string
  fallback: string
  copySize?: number
}

export type RectData = {
  id: string
  copy?: {
    w: number
    h: number
  }
}

export type ButtonProps = {
  disabled?: boolean
}

// TODO selected関連を削除
export type StickerProps = {
  position: {
    x: number
    y: number
  }
  isDesktop: boolean
}
