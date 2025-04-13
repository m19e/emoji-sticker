import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import {
  Geist,
  Geist_Mono,
  M_PLUS_Rounded_1c,
  Rampart_One,
} from 'next/font/google'
import type { ReactNode } from 'react'

import { RandomFavicon } from '@/components/RandomFavicon'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const rounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  variable: '--font-rounded',
  weight: ['400', '700'],
})
const rampart = Rampart_One({
  subsets: ['latin'],
  variable: '--font-rampart',
  weight: ['400'],
})

// TODO メタデータ設定
// TODO 画像設定(OGP, Twitter) → 「絵文字」を重ねてロゴに
const title = '絵文字ステッカー！ | 画像に絵文字を貼るアプリ'
const description =
  '「絵文字ステッカー！」は画像に絵文字を貼りつけたり情報を隠すことができる画像編集アプリです。'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary',
  },
  icons:
    'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f3f7.svg', // 🏷️
}

// TODO vercel analytics
export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja" className="dark">
      <RandomFavicon />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rounded.variable} ${rampart.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  )
}
