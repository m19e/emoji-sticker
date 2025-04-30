import { sendGAEvent } from '@next/third-parties/google'

// TODO カスタムイベント追加する
export enum CustomEvent {
  Save = 'click_save_button',
  Share = 'click_share_button',
  Emoji = 'select_emoji',
  Rect = 'add_rect',
}

// FIXME GA4上でemoji, rectが二重計測される
// TODO emoji, rectイベントを削除して新しいイベントとして追加してみる
// TODO GTM側にタグとか諸々追加してみる(二重計測されないイベントとの差分を試す)
// TODO カスタムイベントとして追加していたため二重計測が発生していた(削除して二重でなくなった)
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
