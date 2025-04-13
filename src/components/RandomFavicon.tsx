'use client'
import { useEffect } from 'react'

import { getRandom, getSvgUrl } from '@/tools'

// TODO ランダム対象を厳選
const FAVICON_EMOJI_CODES = [
  '2728', //  ✨ :sparkles:
  '1f3a8', // 🎨 :art:
  '1f58c', // 🖌️ :lower_left_paintbrush:
  '1f18e', // 🆎 :ab:
  '1f192', // 🆒 :cool:
]

export const RandomFavicon = () => {
  useEffect(() => {
    const url = getSvgUrl(getRandom(FAVICON_EMOJI_CODES))

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = url

    document.head.appendChild(link)

    return () => {
      const existingLink = document.querySelector(
        `link[rel*='icon'][href$='${url}']`,
      )
      if (existingLink) {
        document.head.removeChild(existingLink)
      }
    }
  }, [])

  return null
}
