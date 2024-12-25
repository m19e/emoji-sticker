'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const Dropzone = () => {
  const [url, setUrl] = useState<string | undefined>(undefined)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    const files = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
    setUrl(files[0].url)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
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
