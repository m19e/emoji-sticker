'use client'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { DROPZONE_ACCEPT_FILE } from '@/constants'
import { baseImgUrlAtom, revokeEffect } from '@/store/atoms'

export const Dropzone = () => {
  const setUrl = useSetAtom(baseImgUrlAtom)
  useAtom(revokeEffect)

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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: DROPZONE_ACCEPT_FILE,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}
