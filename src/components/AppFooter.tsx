import { AddRectStickerButton } from '@/components/button/AddRectStickerButton'
import { OpenPickerButton } from '@/components/button/OpenPickerButton'
import { RemoveStickerButton } from '@/components/button/RemoveStickerButton'

export const Footer = () => {
  return (
    <div className="flex justify-between">
      <RemoveStickerButton />
      <div>
        <AddRectStickerButton />
        <OpenPickerButton />
      </div>
    </div>
  )
}

