'use client'
import { useEffect } from 'react'

import { getRandom, getSvgUrl } from '@/tools'

// TODO ランダム対象を厳選
// TODO Medetai追加
// TODO Kawaii追加
const FAVICON_EMOJI_CODES = [
  // Medetai
  '1f381', // 🎁 :gift:
  // 🎄 :christmas_tree:
  // 🎈 :balloon:
  // 🎉 :tada:
  // 🎊 :confetti_ball:
  // 🎋 :tanabata_tree:
  // 🎍 :bamboo:
  // 🎯 :dart:
  // 🎰 :slot_machine:
  //
  // Kawaii
  '2728', // ✨ :sparkles:
  '1f408-200d-2b1b', // 🐈‍⬛ :black_cat:
  '1f4db', // 📛 :name_badge:
  '1f9f6', // 🧶 :yarn:
  // Characters
  '1f18e', // 🆎 :ab:
  '1f192', // 🆒 :cool:
  '1f193', // 🆓 :free:
  '1f195', // 🆕 :new:
  '1f197', // 🆗 :ok:
  '1f198', // 🆘 :sos:
  '1f51d', // 🔝 :top:
  '1f201', // 🈁 :koko:
  '1f202', // 🈂️ :sa:
  '1f232', // 🈲 :prohibited:
  '1f233', // 🈳 :vacancy:
  '1f234', // 🈴 :passing_grade:
  '1f235', // 🈵 :no_vacancy:
  '1f236', // 🈶 :not_free_of_charge:
  '1f237', // 🈷️ :monthly_amount:
  '1f238', // 🈸 :application:
  '1f239', // 🈹 :discount:
  '1f23a', // 🈺 :open_for_business:
  '1f250', // 🉐 :bargain:
  '1f251', // 🉑 :acceptable:
  '3297', //  ㊗️ :congratulations:
  '3299', //  ㊙️ :secret:
  '203c', //  ‼️ :bangbang:
  '2049', //  ⁉️ :interrobang:
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
