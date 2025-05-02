import { sendGAEvent } from '@next/third-parties/google'

// TODO カスタムイベント追加する
// remove_sticker
// load_image, delete_image
// show_delete_image, show_about, show_share, show_picker
// ? select_sticker
// TODO Rename click_save_button, click_share_button, select_emoji
// TODO Renameしたイベントをキーイベント設定
// TODO Share,Save送信時に貼られてるステッカーの数を含めるか検討
// FIXME CustomEventが命名衝突している(MDNと)
export enum GA4Event {
  // Key Event
  Save = 'save_image',
  Share = 'share_image',
  Emoji = 'add_emoji',
  Rect = 'add_rect',
  Remove = 'remove_sticker',
  // BaseImage
  LoadImage = 'load_image',
  DeleteImage = 'delete_image',
  // Show UI
  ShowDeleteImage = 'show_delete_image',
  ShowAbout = 'show_about',
  ShowShare = 'show_share',
  ShowPicker = 'show_picker',
}

type NotEmojiEvent<T extends GA4Event> = T extends GA4Event.Emoji ? never : T

type ConditionalArgs<T extends GA4Event> =
  | [e: GA4Event.Emoji, emoji: string]
  | [e: NotEmojiEvent<T>]

export const sendEvent = <T extends GA4Event>(
  ...[event, emoji]: ConditionalArgs<T>
) => {
  const params = typeof emoji === 'string' ? { emoji } : {}
  sendGAEvent('event', event, params)
}
