'use client'
import { useAtom, useSetAtom } from 'jotai'
import { Image as ImageIcon } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { DROPZONE_ACCEPT_FILE } from '@/constants'
import { baseImgUrlAtom } from '@/store/atoms'
import { revokeEffect } from '@/store/effects'
import type { ButtonProps } from '@/types'

import { Button } from '@/components/ui/button'

export const Dropzone = ({ disabled }: ButtonProps) => {
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

  // TODO ヘッダーからcanvasの位置に移動

  return (
    <Button
      {...getRootProps()}
      className="text-slate-300"
      variant="ghost"
      size="icon"
      disabled={disabled}
    >
      <input {...getInputProps()} />
      <ImageIcon />
    </Button>
  )
}
