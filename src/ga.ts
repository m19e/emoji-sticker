import { sendGAEvent } from '@next/third-parties/google'

// TODO カスタムイベント追加する
export enum CustomEvent {
  Save = 'click_save_button',
  Share = 'click_share_button',
  Emoji = 'select_emoji',
  Rect = 'add_rect',
}

// TODO 不要になったので削除

type NotEmojiEvent<T extends CustomEvent> = T extends CustomEvent.Emoji
  ? never
  : T

type ConditionalArgs<T extends CustomEvent> =
  | [e: CustomEvent.Emoji, emoji: string]
  | [e: NotEmojiEvent<T>]

// TODO select_emoji以外でvalueを送信しない(でも大丈夫かチェック) ←大丈夫でした
export const sendEvent = <T extends CustomEvent>(
  ...[event, emoji]: ConditionalArgs<T>
) => {
  const params = typeof emoji === 'string' ? { emoji } : {}
  sendGAEvent('event', event, params)
}
