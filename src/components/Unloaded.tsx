import { Contact } from '@/components/Contact'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ,フォント決め
// TODO 免責事項
// TODO 各種リンク(SNS, github)
export const Unloaded = () => {
  return (
    <div className="grid h-full w-full place-items-center py-4">
      <div />
      <Dropzone />
      <Contact />
    </div>
  )
}
