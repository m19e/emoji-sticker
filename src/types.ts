export type Dimensions = {
  width: number
  height: number
}

export type EmojiData = {
  id: string
  u: string
  fallback: string
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
