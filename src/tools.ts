import type Konva from 'konva'

export const getSvgUrl = (u: string) =>
  `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${u}.svg`

const REGEXP = /-fe0f$/

const checkSuffix = (u: string) => u.match(REGEXP) && u.split('-').length === 2

const trimSuffix = (u: string) => (checkSuffix(u) ? u.split('-')[0] : u)

const CODEPOINT_MATCH: Record<string, string> = {
  '00a9-fe0f': 'a9', // ©️
  '00ae-fe0f': 'ae', // ®️
  '0023-fe0f-20e3': '23-20e3', // #️⃣
  '002a-fe0f-20e3': '2a-20e3', // *️⃣
  '0030-fe0f-20e3': '30-20e3', // 0️⃣
  '0031-fe0f-20e3': '31-20e3', // 1️⃣
  '0032-fe0f-20e3': '32-20e3', // 2️⃣
  '0033-fe0f-20e3': '33-20e3', // 3️⃣
  '0034-fe0f-20e3': '34-20e3', // 4️⃣
  '0035-fe0f-20e3': '35-20e3', // 5️⃣
  '0036-fe0f-20e3': '36-20e3', // 6️⃣
  '0037-fe0f-20e3': '37-20e3', // 7️⃣
  '0038-fe0f-20e3': '38-20e3', // 8️⃣
  '0039-fe0f-20e3': '39-20e3', // 9️⃣
  '1f441-fe0f-200d-1f5e8-fe0f': '1f441-200d-1f5e8', // 👁️‍🗨️
}

export const convertToValidTwemojiCodepoint = (u: string) =>
  CODEPOINT_MATCH[u] ?? trimSuffix(u)

export const getRandom = <T>(target: T[]): T => {
  const randomIndex = Math.floor(Math.random() * target.length)
  return target[randomIndex]
}

export const getSelectedRect = (
  target: Konva.KonvaEventObject<Event>['target'],
) => {
  const w = target.width() * target.scaleX()
  const h = target.height() * target.scaleY()
  return { w, h }
}

export const getSelectedSize = (
  target: Konva.KonvaEventObject<Event>['target'],
) => {
  return target.width() * target.scaleX()
}
