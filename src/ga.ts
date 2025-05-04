import { sendGAEvent } from '@next/third-parties/google'

// TODO Share,Save送信時に貼られてるステッカーの数を含めるか検討
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
