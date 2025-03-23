import { Contact } from '@/components/Contact'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ,フォント決め
// TODO 免責事項
export const Unloaded = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex flex-1 flex-col justify-end">
        <Dropzone />
      </div>
      <div className="flex flex-1 flex-col items-center justify-evenly">
        <div className="logo flex flex-col text-6xl">
          <span>絵文字</span>
          <span>ステッ</span>
          <span>カー！</span>
        </div>
        <Contact />
      </div>
    </div>
  )
}
