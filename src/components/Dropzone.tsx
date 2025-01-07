'use client'
import { useAtom, useSetAtom } from 'jotai'
import { Image as ImageIcon } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { DROPZONE_ACCEPT_FILE } from '@/constants'
import { baseImgUrlAtom, revokeEffect } from '@/store/atoms'

export const Dropzone = () => {
  useAtom(revokeEffect)
  const setUrl = useSetAtom(baseImgUrlAtom)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return
      }
      const [createdUrl] = acceptedFiles.map(URL.createObjectURL)
      setUrl(createdUrl)
    },
    [setUrl],
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: DROPZONE_ACCEPT_FILE,
  })

  return (
    <Button
      {...getRootProps()}
      className="text-slate-300"
      variant="ghost"
      size="icon"
    >
      <input {...getInputProps()} />
      <ImageIcon />
    </Button>
  )
}
