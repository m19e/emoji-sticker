import { useMedia } from 'react-use'

const DESKTOP_QUERY = '(min-width: 640px)'

export const useMediaQuery = () => {
  const isDesktop = useMedia(DESKTOP_QUERY)
  return { isDesktop }
}
