import { useAtom } from 'jotai'
import { useEffectOnce } from 'react-use'
import { UAParser } from 'ua-parser-js'

import { userAgentAtom } from '@/store/atoms'

export const useUserAgent = () => {
  const [ua, setUA] = useAtom(userAgentAtom)

  useEffectOnce(() => {
    const parser = new UAParser()
    setUA({
      os: parser.getOS().name || '',
      browser: parser.getBrowser().name || '',
    })
  })

  return ua
}
