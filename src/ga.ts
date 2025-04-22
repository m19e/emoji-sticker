import { sendGAEvent } from '@next/third-parties/google'

// カスタムイベント名はGA4と一致
export enum CustomEvent {
  Save = 'click_save_button',
  Share = 'click_share_button',
  Emoji = 'select_emoji',
  Rect = 'add_rect',
}

// TODO GA4上で'select_emoji','add_rect'カスタムイベント追加
// TODO 'emoji', 'rect'追加
const CustomEventMap: { [key in CustomEvent]: string } = {
  click_save_button: 'SAVE',
  click_share_button: 'SHARE',
  select_emoji: '絵文字のコードポイントを送る',
  add_rect: 'RECT',
}

export const sendEvent = (event: CustomEvent) => {
  const value = CustomEventMap[event]
  sendGAEvent('event', event, { value })
}
