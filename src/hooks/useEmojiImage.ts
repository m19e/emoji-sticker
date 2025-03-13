import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { getSvgUrl } from '@/tools'

// TODO props type
export const useEmojiImage = ({
  u,
  fallback,
}: { u: string; fallback: string }) => {
  const [image, status] = useAnonymousImage(getSvgUrl(u))
  const [fallbackImage] = useAnonymousImage(fallback)

  if (status === 'failed') {
    return {
      image: fallbackImage,
    }
  }

  return { image }
}
