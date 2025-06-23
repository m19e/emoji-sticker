import { useEffect, useState } from 'react'

import { INITIAL_DIMENSIONS } from '@/constants'
import type { Dimensions } from '@/types'

const ErrorMessage = {
  WINDOW_IS_NOT_DEFINED: 'Window is not defined',
  URL_IS_NOT_DEFINED: 'Url is not defined',
}

const getImageSize = (url: string | null): Promise<Dimensions> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(ErrorMessage.WINDOW_IS_NOT_DEFINED)
    }
    if (!url) {
      return reject(ErrorMessage.URL_IS_NOT_DEFINED)
    }

    const img = new Image()

    img.addEventListener('load', () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    })

    img.addEventListener('error', (event) => {
      reject(`${event.type}: ${event.message}`)
    })

    img.src = url
  })
}

type UseImageSizeResult = [
  Dimensions,
  { loading: boolean; error: string | null },
]

export const useImageSize = (url: string | null): UseImageSizeResult => {
  const [dimensions, setDimensions] = useState<Dimensions>(INITIAL_DIMENSIONS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setDimensions(INITIAL_DIMENSIONS)
      setError(null)

      try {
        const { width, height } = await getImageSize(url)
        setDimensions({ width, height })
      } catch (error: unknown) {
        setError((error as string).toString())
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [url])

  return [dimensions, { loading, error }]
}
