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

type NotEmojiEvent<T extends CustomEvent> = T extends CustomEvent.Emoji
  ? never
  : T

type ConditionalArgs<T extends CustomEvent> =
  | [e: CustomEvent.Emoji, emoji: string]
  | [e: NotEmojiEvent<T>]

export const sendEvent = <T extends CustomEvent>(
  ...[event, emoji]: ConditionalArgs<T>
) => {
  const value = emoji ?? CustomEventMap[event]
  sendGAEvent('event', event, { value })
}
