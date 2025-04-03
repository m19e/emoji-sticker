import { Contact } from '@/components/Contact'
import { Dropzone } from '@/components/Dropzone'

export const Unloaded = () => {
  return (
    <div className="flex flex-col gap-8">
      <Dropzone />
      <Contact />
    </div>
  )
}
