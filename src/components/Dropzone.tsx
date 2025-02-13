'use client'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { DROPZONE_ACCEPT_FILE } from '@/constants'
import { baseImgUrlAtom } from '@/store/atoms'
import { revokeEffect } from '@/store/effects'

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
    <div
      {...getRootProps()}
      className="aspect-[2/1] w-2/3 min-w-80 rounded-3xl border border-slate-500 bg-slate-800 p-2 shadow sm:p-4"
    >
      <input {...getInputProps()} />
      <div className="grid h-full w-full place-items-center rounded-xl border-2 border-slate-500 border-dashed">
        <div className="flex flex-col items-center font-bold text-slate-300">
          <span>タップ / クリック</span>
          <span className="font-medium text-sm">または</span>
          <span>ドロップして画像を追加</span>
        </div>
      </div>
    </div>
  )
}
