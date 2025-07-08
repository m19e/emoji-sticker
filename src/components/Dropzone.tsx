'use client'
import { useAtom, useSetAtom } from 'jotai'
import { FileImageIcon } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { DROPZONE_ACCEPT_FILE } from '@/constants'
import { GA4Event, sendEvent } from '@/ga'
import { baseImgUrlAtom } from '@/store/atoms'
import { revokeEffect } from '@/store/effects'

// FIXME ファイルの複数選択をちゃんと禁止する
export const Dropzone = () => {
  useAtom(revokeEffect)
  const setUrl = useSetAtom(baseImgUrlAtom)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return
      }
      sendEvent(GA4Event.LoadImage)
      const [createdUrl] = acceptedFiles.map(URL.createObjectURL)
      setUrl(createdUrl)
    },
    [setUrl],
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: DROPZONE_ACCEPT_FILE,
  })

  return (
    <div
      {...getRootProps()}
      className="relative aspect-[3/2] w-60 rounded-2xl bg-zinc-500 p-2 shadow"
    >
      <input {...getInputProps()} />
      <div className="h-full w-full rounded-xl border-2 border-zinc-400 border-dashed" />
      <div className="absolute bottom-0 left-0 flex aspect-[3/2] w-full flex-col items-center justify-between gap-4 py-5">
        <div className="grid size-24 place-items-center rounded-lg bg-zinc-300 p-2 shadow">
          <FileImageIcon className="size-16 text-zinc-600" />
        </div>
        <div className="flex flex-col items-center font-bold text-zinc-50">
          <span>タップ / クリック</span>
          <span className="font-medium text-sm">または</span>
          <span>ドロップして画像を追加</span>
        </div>
      </div>
    </div>
  )
}
