'use client'
import { useEffect } from 'react'

import { HIDDEN_EMOJIS_UNICODE } from '@/constants'
import { getRandom, getSvgUrl } from '@/tools'

// TODO ランダム対象を厳選
export const RandomFavicon = () => {
  useEffect(() => {
    const url = getSvgUrl(getRandom(HIDDEN_EMOJIS_UNICODE))

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
