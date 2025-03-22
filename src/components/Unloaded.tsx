import { Contact } from '@/components/Contact'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ,フォント決め
// 絵文字
// ステッカー！
// みたいなロゴ
// TODO 免責事項
export const Unloaded = () => {
  return (
    <div className="grid h-full w-full place-items-center py-4">
      <div />
      <Dropzone />
      <Contact />
    </div>
  )
}
