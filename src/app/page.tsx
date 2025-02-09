import { Header } from '@/components/AppHeader'
import { Canvas } from '@/components/Canvas'
import { Picker } from '@/components/EmojiPicker'
import { ShareDialog } from '@/components/ShareDialog'
import { AddRectStickerButton } from '@/components/button/AddRectStickerButton'
import { DeleteEmojiButton } from '@/components/button/DeleteEmojiButton'
import { OpenPickerButton } from '@/components/button/OpenPickerButton'

export default function Home() {
  return (
    <div className="relative flex justify-center bg-slate-600 font-[family-name:var(--font-geist-sans)]">
      <main className="flex h-dvh w-full flex-col bg-slate-950 shadow sm:w-96">
        <Header />
        <div className="flex h-[calc(100%-72px)] flex-col items-center justify-center overflow-hidden bg-slate-400">
          <Canvas />
          <ShareDialog />
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
