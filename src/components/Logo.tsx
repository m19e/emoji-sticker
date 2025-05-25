import Image from 'next/image'

// TODO ロゴを画像に
// TODO 180pxから240pxに拡大して様子見
export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="絵文字ステッカー！ロゴ"
      width={200}
      height={200}
      priority
    />
  )
}
