export type Dimensions = {
  width: number
  height: number
}

// TODO ステッカー複製時にサイズを設定
export type EmojiData = {
  id: string
  u: string
  fallback: string
  copySize?: number
}

export type ButtonProps = {
  disabled?: boolean
}

export type StickerProps = {
  selected: boolean
  onSelect: () => void
  position: {
    x: number
    y: number
  }
  size: number
  isDesktop: boolean
}
