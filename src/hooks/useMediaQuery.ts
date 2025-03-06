import { useMedia } from 'react-use'

const DESKTOP_QUERY = '(min-width: 640px)'
const DEFAULT_STATE = false

export const useMediaQuery = () => {
  const isDesktop = useMedia(DESKTOP_QUERY, DEFAULT_STATE)
  return { isDesktop }
}
