'use client'
import { useAtom, useSetAtom } from 'jotai'
import { FileImageIcon } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { DROPZONE_ACCEPT_FILE } from '@/constants'
import { baseImgUrlAtom } from '@/store/atoms'
import { revokeEffect } from '@/store/effects'

// TODO FixUI
// TODO discordのdropzoneを参考にアイコンを配置
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
      className="relative aspect-[2/1] w-2/3 min-w-80 rounded-2xl bg-zinc-500 p-2 shadow sm:p-3"
    >
      <input {...getInputProps()} />
      <div className="h-full w-full rounded-xl border-2 border-zinc-400 border-dashed" />
      <div className="absolute bottom-0 left-0 flex aspect-[3/2] w-full flex-col items-center justify-between py-5 sm:gap-4 sm:py-7">
        <div className="grid size-24 place-items-center rounded-lg bg-zinc-300 p-2 shadow sm:size-32">
          <FileImageIcon className="size-16 text-zinc-600 sm:size-24" />
        </div>
        <div className="flex flex-col items-center font-bold text-zinc-50 sm:text-lg">
          <span>タップ / クリック</span>
          <span className="font-medium text-sm sm:text-base">または</span>
          <span>ドロップして画像を追加</span>
        </div>
      </div>
    </div>
  )
}
