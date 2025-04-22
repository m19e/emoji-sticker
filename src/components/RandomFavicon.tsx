'use client'
import { useEffect } from 'react'

import { getRandom, getSvgUrl } from '@/tools'

const FAVICON_EMOJI_CODES = [
  // Edit
  '1f5bc', // 🖼️ :frame_with_picture:
  '1fa84', // 🪄 :magic_wand:
  '1f39b', // 🎛️ :control_knobs:
  '1f4be', // 💾 :floppy_disk:
  '1f4cb', // 📋 :clipboard:
  '1f4ce', // 📎 :paperclip:
  '1f4f7', // 📷 :camera:
  '1f50d', // 🔍 :mag:
  '1f5a8', // 🖨️ :printer:
  '1f5d1', // 🗑️ :wastebasket:
  // 🕶️ :dark_sunglasses:
  // Medetai
  '1f381', // 🎁 :gift:
  '1f384', // 🎄 :christmas_tree:
  '1f388', // 🎈 :balloon:
  '1f389', // 🎉 :tada:
  '1f38a', // 🎊 :confetti_ball:
  '1f38b', // 🎋 :tanabata_tree:
  '1f38d', // 🎍 :bamboo:
  '1f3af', // 🎯 :dart:
  '1f3b0', // 🎰 :slot_machine:
  // Kawaii
  '2728', // ✨ :sparkles:
  '23f3', // ⏳ :hourglass_flowing_sand:
  '2603', // ☃️ :snowman:
  '2668', // ♨️ :hotsprings:
  '26e9', // ⛩️ :shinto_shrine:
  '2744', // ❄️ :snowflake:
  '1f408-200d-2b1b', // 🐈‍⬛ :black_cat:
  '1f4db', // 📛 :name_badge:
  '1f302', // 🌂 :closed_umbrella:
  '1f31f', // 🌟 :star2:
  '1f320', // 🌠 :stars:
  '1f321', // 🌡️ :thermometer:
  '1f488', // 💈 :barber:
  '1f680', // 🚀 :rocket:
  '1f68f', // 🚏 :busstop:
  '1f6ce', // 🛎️ :bellhop_bell:
  '1f6f0', // 🛰️ :satellite:
  '1f6f4', // 🛴 :scooter:
  '1f6f6', // 🛶 :canoe:
  '1f6f8', // 🛸 :flying_saucer:
  '1f6f9', // 🛹 :skateboard:
  '1f9ed', // 🧭 :compass:
  '1f9f6', // 🧶 :yarn:
  '1fa82', // 🪂 :parachute:
  '1fa90', // 🪐 :ringed_planet:
  '1fab5', // 🪵 :wood:
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
