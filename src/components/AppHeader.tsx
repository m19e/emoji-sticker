import { DeleteBaseImageButton } from '@/components/DeleteBaseImageButton'
import { Dropzone } from '@/components/Dropzone'

export const Header = () => {
  return (
    <div className="flex justify-between gap-4">
      <DeleteBaseImageButton />
      <Dropzone />
    </div>
  )
}
