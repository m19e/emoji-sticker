import { Contact } from '@/components/Contact'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ,フォント決め
// TODO 免責事項
// TODO ロゴと免責事項をページアクセス時にダイアログで表示
// TODO Logoコンポーネントとして切り出し
export const Unloaded = () => {
  return (
    <div className="flex h-full max-h-[680px] flex-col items-center justify-end gap-8 pb-8">
      <Dropzone />
      <Contact />
    </div>
  )
}
