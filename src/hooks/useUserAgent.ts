import { useSetAtom } from 'jotai'
import { useEffectOnce } from 'react-use'
import { UAParser } from 'ua-parser-js'

import { userAgentAtom } from '@/store/atoms'

// TODO isIOS: boolean などを整えて返す
// TODO そのままUAも返す
export const useUserAgent = () => {
  const setUA = useSetAtom(userAgentAtom)

  useEffectOnce(() => {
    const parser = new UAParser()
    setUA({
      os: parser.getOS().name || '',
      browser: parser.getBrowser().name || '',
    })
  })
}
