import { Header } from '@/components/AppHeader'
import { Picker } from '@/components/EmojiPicker'
import { Editor } from '@/components/StickerEditor'
import { AddRectStickerButton } from '@/components/button/AddRectStickerButton'
import { DeleteEmojiButton } from '@/components/button/DeleteEmojiButton'
import { OpenPickerButton } from '@/components/button/OpenPickerButton'

export default function Home() {
  return (
    <div className="relative flex justify-center bg-slate-900 font-[family-name:var(--font-geist-sans)]">
      <main className="flex h-dvh w-full flex-col sm:w-96">
        <Header />
        <div className="flex h-[calc(100%-72px)] flex-col items-center justify-center overflow-hidden bg-slate-400">
          <Editor />
        </div>
        <div className="flex justify-between gap-4">
          <DeleteEmojiButton />
          <div>
            <AddRectStickerButton />
            <OpenPickerButton />
          </div>
        </div>
      </main>
      <Picker />
    </div>
  )
}
