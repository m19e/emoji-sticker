import { Categories } from 'emoji-picker-react'

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

export const DROPZONE_ACCEPT_FILE = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/webp': ['.webp'],
}

export const ERROR_MESSAGE = {
  windowIsNotDefined: 'Window is not defined',
  urlIsNotDefined: 'Url is not defined',
} as const

export const INITIAL_DIMENSIONS = {
  width: 0,
  height: 0,
} as const

export const DESKTOP_CONTENTS_WIDTH = 384

export const CANVAS_MARGIN_Y = 80
