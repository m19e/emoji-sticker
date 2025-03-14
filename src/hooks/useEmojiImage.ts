import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { getSvgUrl } from '@/tools'

type Args = {
  u: string
  fallback: string
}

export const useEmojiImage = ({ u, fallback }: Args) => {
  const [image, status] = useAnonymousImage(getSvgUrl(u))
  const [fallbackImage] = useAnonymousImage(fallback)

  if (status === 'failed') {
    return {
      image: fallbackImage,
    }
  }

  return { image }
}
