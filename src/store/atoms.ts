import type { EmojiData } from '@/types'
import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

export const baseImgUrlAtom = atomWithReset<string | null>(null)

export const isPickerOpenAtom = atom(false)

export const emojiDatasAtom = atomWithReset<EmojiData[]>([])

export const selectedEmojiIdAtom = atomWithReset<string | null>(null)
