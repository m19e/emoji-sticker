import { DeleteBaseImageButton } from '@/components/DeleteBaseImageButton'
import { Dropzone } from '@/components/Dropzone'
import { Picker } from '@/components/EmojiPicker'
import { Demo } from '@/components/TransformerDemo'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-800 font-[family-name:var(--font-geist-sans)]">
      <main className="relative flex h-screen flex-col items-center gap-4">
        <div className="flex w-full justify-between gap-4">
          <Dropzone />
          <DeleteBaseImageButton />
        </div>
        <Demo />
        <Picker />
      </main>
    </div>
  )
}
