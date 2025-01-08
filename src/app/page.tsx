import { DeleteBaseImageButton } from '@/components/DeleteBaseImageButton'
import { Dropzone } from '@/components/Dropzone'
import { Picker } from '@/components/EmojiPicker'
import { OpenPickerButton } from '@/components/OpenPickerButton'
import { Demo } from '@/components/TransformerDemo'

export default function Home() {
  return (
    <div className="relative flex justify-center bg-slate-600 font-[family-name:var(--font-geist-sans)]">
      <main className="flex h-screen w-96 max-w-full flex-col bg-black sm:w-auto sm:min-w-96">
        <div className="flex justify-between gap-4">
          <DeleteBaseImageButton />
          <Dropzone />
        </div>
        <div className="flex h-[calc(100%-72px)] w-full flex-col items-center justify-center bg-slate-400">
          <Demo />
        </div>
        <div className="flex justify-end gap-4">
          <OpenPickerButton />
        </div>
      </main>
      <Picker />
    </div>
  )
}
