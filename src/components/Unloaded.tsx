import { Contact } from '@/components/Contact'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ,フォント決め
// TODO 免責事項
export const Unloaded = () => {
  return (
    <div className="grid h-full w-full place-items-center py-4">
      <div />
      <Dropzone />
      <div className="flex flex-col items-center gap-2">
        <span className="!font-rampart text-2xl sm:text-3xl">
          絵文字ステッカー！
        </span>
        <Contact />
      </div>
    </div>
  )
}
