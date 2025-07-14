import { AddRectStickerButton } from '@/components/button/AddRectStickerButton'
import { CopyStickerButton } from '@/components/button/CopyStickerButton'
import { OpenPickerButton } from '@/components/button/OpenPickerButton'
import { RemoveStickerButton } from '@/components/button/RemoveStickerButton'

export const Footer = () => {
  return (
    <div className="flex justify-between">
      <div>
        <RemoveStickerButton />
        <CopyStickerButton />
      </div>
      <div>
        <AddRectStickerButton />
        <OpenPickerButton />
      </div>
    </div>
  )
}
