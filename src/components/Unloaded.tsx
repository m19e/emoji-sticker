'use client'
import { Dropzone } from '@/components/Dropzone'

// TODO アプリのロゴ,フォント決め
// TODO 免責事項
// TODO 各種リンク(SNS, github)
// TODO ダークモード対応
export const Unloaded = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <Dropzone />
    </div>
  )
}
