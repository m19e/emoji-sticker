export type Dimensions = {
  width: number
  height: number
}

export type UseImageSizeResult = [
  Dimensions,
  { loading: boolean; error: string | null },
]

export type EmojiData = {
  id: string
  u: string
}
