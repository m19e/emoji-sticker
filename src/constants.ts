import { Categories } from 'emoji-picker-react'

import { getSvgUrl } from '@/tools'

export const EPR_CATEGORIES_JA = [
  { category: Categories.SUGGESTED, name: 'よく使う絵文字' },
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
  minus: '2796', // "➖"
  open_hands: '1f450', // "👐"
} as const

export type HIDDEN_EMOJIS_ID = keyof typeof HIDDEN_EMOJIS

export const HIDDEN_EMOJIS_UNICODE = Object.values(HIDDEN_EMOJIS)

export const CUSTOM_EMOJIS: {
  id: HIDDEN_EMOJIS_ID
  imgUrl: string
  names: string[]
}[] = [
  {
    id: 'minus', // "➖"
    names: ['heavy minus sign', 'hide'],
    imgUrl: getSvgUrl(HIDDEN_EMOJIS.minus),
  },
  {
    id: 'open_hands', // "👐"
    names: ['open hands', 'open hands sign', 'hide'],
    imgUrl: getSvgUrl(HIDDEN_EMOJIS.open_hands),
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
