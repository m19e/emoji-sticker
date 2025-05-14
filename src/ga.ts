import { sendGAEvent } from '@next/third-parties/google'

// TODO 共有できない環境でのGA4イベント追加、送信
// TODO カスタムディメンション保存するプロパティを最終決定
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

export const sendEvent = (event: GA4Event, params: object = {}) => {
  sendGAEvent('event', event, params)
}
