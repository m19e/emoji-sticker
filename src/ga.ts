import { sendGAEvent } from '@next/third-parties/google'

const CustomEvent = {
  save: {
    e: 'click_save_button',
    v: 'SAVE',
  },
  share: {
    e: 'click_share_button',
    v: 'SHARE',
  },
} as const

type CustomEventName = keyof typeof CustomEvent

export const sendEvent = (event: CustomEventName) => {
  const { e, v } = CustomEvent[event]
  sendGAEvent('event', e, { value: v })
}
