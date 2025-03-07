import { Categories } from 'emoji-picker-react'

import { getSvgUrl } from '@/tools'

export const EPR_CATEGORIES_JA = [
  { category: Categories.SUGGESTED, name: 'よく使う絵文字' },
  { category: Categories.CUSTOM, name: '情報を隠す' },
  { category: Categories.SMILEYS_PEOPLE, name: 'スマイリーと人' },
  { category: Categories.ANIMALS_NATURE, name: '動物と自然' },
  { category: Categories.FOOD_DRINK, name: 'フードとドリンク' },
  { category: Categories.TRAVEL_PLACES, name: '旅行と場所' },
  { category: Categories.ACTIVITIES, name: 'アクティビティ' },
  { category: Categories.OBJECTS, name: 'オブジェクト' },
  { category: Categories.SYMBOLS, name: '記号' },
  { category: Categories.FLAGS, name: '旗' },
]

export const DEFAULT_PREVIEW_CONFIG = {
  defaultEmoji: '1f60e',
  defaultCaption: '今の気分はどう？',
}

export const HIDDEN_EMOJIS = {
  minus: '2796',
  open_hands: '1f450',
  innocent: '1f607',
  sunglasses: '1f60e',
  hundred: '1f4af',
  earth_asia: '1f30f',
} as const

export type HIDDEN_EMOJIS_ID = keyof typeof HIDDEN_EMOJIS

export const HIDDEN_EMOJIS_UNICODE = Object.values(HIDDEN_EMOJIS)

export const CUSTOM_EMOJIS: {
  id: HIDDEN_EMOJIS_ID
  names: string[]
  imgUrl: string
}[] = [
  {
    // ➖
    id: 'minus',
    names: ['heavy minus sign', 'hide'],
    imgUrl: getSvgUrl(HIDDEN_EMOJIS.minus),
  },
  {
    // 👐
    id: 'open_hands',
    names: ['open hands', 'open hands sign', 'hide'],
    imgUrl: getSvgUrl(HIDDEN_EMOJIS.open_hands),
  },
  {
    // 😇
    id: 'innocent',
    names: ['innocent', 'smiling face with halo', 'hide'],
    imgUrl: getSvgUrl(HIDDEN_EMOJIS.innocent),
  },
  {
    // 😎
    id: 'sunglasses',
    names: ['sunglasses', 'smiling face with sunglasses', 'hide'],
    imgUrl: getSvgUrl(HIDDEN_EMOJIS.sunglasses),
  },
  {
    // 💯
    id: 'hundred',
    names: ['100', 'hundred points symbol', 'hide'],
    imgUrl: getSvgUrl(HIDDEN_EMOJIS.hundred),
  },
  {
    // 🌏
    id: 'earth_asia',
    names: ['earth asia', 'earth globe asia-australia', 'hide'],
    imgUrl: getSvgUrl(HIDDEN_EMOJIS.earth_asia),
  },
] as const

export const DROPZONE_ACCEPT_FILE = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/webp': ['.webp'],
}

export const OUTPUT_MIME_TYPE = 'image/jpeg'

export const ERROR_MESSAGE = {
  windowIsNotDefined: 'Window is not defined',
  urlIsNotDefined: 'Url is not defined',
} as const

export const INITIAL_DIMENSIONS = {
  width: 0,
  height: 0,
} as const

export const DESKTOP_CONTENTS_WIDTH = 640

export const CANVAS_MARGIN_Y = 80
