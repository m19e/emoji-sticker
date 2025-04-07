export const getSvgUrl = (u: string) =>
  `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${u}.svg`

// TODO 対応絵文字増やす
// TODO ⚛️🕉️☮️⚧️
// TODO 🅰️🅱️🅾️🅿️
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
  '269b-fe0f': '269b', // ⚛️
  '1f549-fe0f': '1f549', // 🕉️
  '262e-fe0f': '262e', // ☮️
  '26a7-fe0f': '26a7', // ⚧️
}

export const convertToValidTwemojiCodepoint = (u: string) =>
  CODEPOINT_MATCH[u] ?? u
