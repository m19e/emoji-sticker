'use client'
import { useEffect } from 'react'

import { getRandom, getSvgUrl } from '@/tools'

// TODO ランダム対象を厳選
// TODO Characters追加
// TODO Medetai追加
// TODO Kawaii追加
const FAVICON_EMOJI_CODES = [
  // Medetai
  '2728', //  ✨ :sparkles:
  // Kawaii
  '1f4db', // 📛 :name_badge:
  '1f408-200d-2b1b', // 🐈‍⬛ :black_cat:
  // Characters
  '1f18e', // 🆎 :ab:
  '1f192', // 🆒 :cool:
  // FREE
  // NEW
  // OK
  // SOS
  // UP!
  // TOP
  // ｺｺ
  // サ
  // 禁
  // 空
  // 合
  // 満
  // 有
  // 月
  // 申
  // 割
  // 営
  // 得
  // 可
  '3297', // ㊗️ :congratulations:
  '3299', // ㊙️ :secret:
  '203c', // ‼️ :bangbang:
  '2049', // ⁉️ :interrobang:
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
