import { getSvgUrl } from '@/tools'
import { Categories } from 'emoji-picker-react'

// Emoji Picker
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
  two_hearts: '1f495',
  innocent: '1f607',
  open_hands: '1f450',
  sunglasses: '1f60e',
  hundred: '1f4af',
  heart_eyes: '1f60d',
  earth_asia: '1f30f',
  see_no_evil: '1f648',
  minus: '2796',
  dark_sunglasses: '1f576',
  thumbsup: '1f44d',
  joy: '1f602',
  crown: '1f451',
  relaxed: '263a',
  // fire
  // sparkling_heart
  // peace_symbol
  // stuck_out_tongue_winking_eye
  // confetti_ball
  // headphone
} as const

export type HIDDEN_EMOJIS_ID = keyof typeof HIDDEN_EMOJIS

export const HIDDEN_EMOJIS_UNICODE = Object.values(HIDDEN_EMOJIS)

const CUSTOM_EMOJIS_NAMES: { [id in HIDDEN_EMOJIS_ID]: string[] } = {
  two_hearts: ['two hearts'],
  innocent: ['innocent', 'smiling face with halo'],
  open_hands: ['open hands', 'open hands sign'],
  sunglasses: ['sunglasses', 'smiling face with sunglasses'],
  hundred: ['100', 'hundred points symbol'],
  heart_eyes: ['heart eyes', 'smiling face with heart-shaped eyes'],
  earth_asia: ['earth asia', 'earth globe asia-australia'],
  see_no_evil: ['see no evil', 'see-no-evil monkey'],
  minus: ['heavy minus sign'],
  dark_sunglasses: ['sunglasses', 'dark sunglasses'],
  thumbsup: ['+1', 'thumbsup', 'thumbs up sign'],
  joy: ['joy', 'face with tears of joy'],
  crown: ['crown'],
  relaxed: ['relaxed', 'white smiling face'],
}

// TODO 増やす
const CUSTOM_EMOJIS_IDS: HIDDEN_EMOJIS_ID[] = [
  'two_hearts', // 💕
  'innocent', // 😇
  'open_hands', // 👐
  'sunglasses', // 😎
  'hundred', // 💯
  'heart_eyes', // 😍
  'earth_asia', // 🌏
  'see_no_evil', // 🙈
  'minus', // ➖
  'dark_sunglasses', // 🕶️
  'thumbsup', // 👍
  'joy', // 😂
  'crown', // 👑
  'relaxed', // ☺️
]

export const CUSTOM_EMOJIS: {
  id: HIDDEN_EMOJIS_ID
  names: string[]
  imgUrl: string
}[] = CUSTOM_EMOJIS_IDS.map((id) => ({
  id,
  names: [...CUSTOM_EMOJIS_NAMES[id], 'hide'],
  imgUrl: getSvgUrl(HIDDEN_EMOJIS[id]),
}))

// Dropzone
export const DROPZONE_ACCEPT_FILE = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/webp': ['.webp'],
}

export const OUTPUT_MIME_TYPE = 'image/jpeg'

// Canvas
export const ERROR_MESSAGE = {
  WINDOW_IS_NOT_DEFINED: 'Window is not defined',
  URL_IS_NOT_DEFINED: 'Url is not defined',
} as const

export const INITIAL_DIMENSIONS = {
  width: 0,
  height: 0,
} as const

export const DESKTOP_CONTENTS_WIDTH = 640

export const CANVAS_MARGIN_Y = 80

// Sticker
export const StickerSnap = {
  CENTER: ['top-center', 'bottom-center', 'middle-right', 'middle-left'],
  CORNER: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
}
