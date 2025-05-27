import Image from 'next/image'

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
