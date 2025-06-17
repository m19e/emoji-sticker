import { Footer } from '@/components/AppFooter'
import { Header } from '@/components/AppHeader'
import { Container } from '@/components/Container'
import { Picker } from '@/components/EmojiPicker'
import { ShareDrawer } from '@/components/ShareDrawer'

export default function Home() {
  return (
    <div className="relative flex justify-center bg-zinc-800">
      <main className="flex h-dvh w-full flex-col bg-zinc-900 shadow sm:w-[640px]">
        <Header />
        <div className="canvas-section">
          <Container />
        </div>
        <Footer />
      </main>
      <Picker />
      <ShareDrawer />
    </div>
  )
}
