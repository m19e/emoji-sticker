import { Contact } from '@/components/Contact'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ,フォント決め
// TODO 免責事項
export const Unloaded = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-end gap-8 pb-8">
      <div className="flex flex-col justify-end">
        <Dropzone />
      </div>
      <div className="logo flex flex-col text-7xl">
        <span>絵文字</span>
        <span>ステッ</span>
        <span>カー！</span>
      </div>
      <Contact />
    </div>
  )
}
