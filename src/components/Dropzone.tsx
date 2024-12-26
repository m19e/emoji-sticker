'use client'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { baseImgUrlAtom } from '@/store/atoms'

export const Dropzone = () => {
  const [url, setUrl] = useAtom(baseImgUrlAtom)
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return
      }
      const files = acceptedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))
      setUrl(files[0].url)
    },
    [setUrl],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
    },
  })

  return (
    <div {...getRootProps()}>
      <img src={url} alt={url} />
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}
