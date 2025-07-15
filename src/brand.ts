type Branded<T, Brand> = T & { readonly __brand: Brand }

export type SelectedEmoji = Branded<
  {
    type: 'emoji'
    id: string
    size: number
  },
  'Emoji'
>

export type SelectedRect = Branded<
  {
    type: 'rect'
    id: string
    w: number
    h: number
  },
  'Rect'
>

export const createSelectedEmoji = ({
  id,
  size,
}: Pick<SelectedEmoji, 'id' | 'size'>): SelectedEmoji =>
  ({ type: 'emoji', id, size }) as SelectedEmoji

export const createSelectedRect = ({
  id,
  w,
  h,
}: Pick<SelectedRect, 'id' | 'w' | 'h'>): SelectedRect =>
  ({ type: 'rect', id, w, h }) as SelectedRect

export type SelectedSticker = SelectedEmoji | SelectedRect
