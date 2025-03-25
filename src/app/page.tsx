import { Header } from '@/components/AppHeader'
import { Container } from '@/components/Container'
import { Picker } from '@/components/EmojiPicker'
import { ShareDrawer } from '@/components/ShareDrawer'
import { AddRectStickerButton } from '@/components/button/AddRectStickerButton'
import { DeleteEmojiButton } from '@/components/button/DeleteEmojiButton'
import { OpenPickerButton } from '@/components/button/OpenPickerButton'

// TODO ShareDrawerを末尾に移動
export default function Home() {
  return (
    <div className="relative flex justify-center bg-zinc-800">
      <main className="flex h-dvh w-full flex-col bg-zinc-900 shadow sm:w-[640px]">
        <Header />
        <div className="canvas-section">
          <Container />
        </div>
        <div className="flex justify-between">
          <DeleteEmojiButton />
          <div>
            <AddRectStickerButton />
            <OpenPickerButton />
          </div>
        </div>
      </main>
      <Picker />
      <ShareDrawer />
    </div>
  )
}
