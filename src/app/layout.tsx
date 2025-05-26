import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import type { ReactNode } from 'react'

import { RandomFavicon } from '@/components/RandomFavicon'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

const rounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  variable: '--font-rounded',
  weight: ['400', '700'],
})
// TODO ロゴには画像を使うため削除

const title = '絵文字ステッカー！ | 画像に絵文字を貼るアプリ'
const description =
  '「絵文字ステッカー！」は画像に絵文字を貼りつけたり情報を隠すことができる画像編集アプリです。'
const images = ['https://emoji-sticker.vercel.app/ogp.png']

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images,
  },
  twitter: {
    title,
    description,
    images,
    card: 'summary',
  },
  icons:
    'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f3f7.svg', // 🏷️
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja" className="dark">
      <RandomFavicon />
      <body className={`${rounded.variable} antialiased`}>
        {children}
        <Toaster richColors />
        <Analytics />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  )
}
