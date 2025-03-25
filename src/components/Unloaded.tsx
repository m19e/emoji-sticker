import { Contact } from '@/components/Contact'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ,フォント決め
// TODO 免責事項
// TODO ロゴと免責事項をページアクセス時にダイアログで表示
// TODO Logoコンポーネントとして切り出し
// TODO 中央寄せ
export const Unloaded = () => {
  return (
    <div className="flex flex-col gap-8">
      <Dropzone />
      <Contact />
    </div>
  )
}
