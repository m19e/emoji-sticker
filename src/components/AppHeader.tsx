import { AboutDialog } from '@/components/AboutDialog'
import { DeleteBaseImageButton } from '@/components/button/DeleteBaseImageButton'
import { ShareButton } from '@/components/button/ShareButton'

// TODO atomを剥がしてServerComponentにしたい
export const Header = () => {
  return (
    <div className="flex justify-between">
      <DeleteBaseImageButton />
      <div>
        <AboutDialog />
        <ShareButton />
      </div>
    </div>
  )
}
