'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import type Konva from 'konva'
import { useRef, useState } from 'react'
import { Stage } from 'react-konva'

import {
  baseImgSizeAtom,
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerAtom,
} from '@/store/atoms'

import { useCanvasData } from '@/hooks/useCanvasData'
import { useCanvasSize } from '@/hooks/useCanvasSize'

import { BaseImageLayer } from '@/components/layer/BaseImage'
import { StickerLayer } from '@/components/layer/Sticker'

// TODO 一旦リリース onTouchでステッカー移動
// TODO センター座標の取得処理を共通化、もしくはderived化
export const Canvas = () => {
  const { ref, stage } = useCanvasData()
  const {
    canvas: { width, height },
  } = useCanvasSize()
  const imgSize = useAtomValue(baseImgSizeAtom)
  const selectedData = useAtomValue(selectedStickerAtom)
  const setEmojis = useSetAtom(emojiDatasAtom)
  const setRects = useSetAtom(rectanglesAtom)

  const lastPointerPos = useRef<Konva.Vector2d>(null)
  const [dragging, setDragging] = useState(false)

  const handleTouchStart = () => {
    if (!selectedData) {
      return
    }
    setDragging(true)

    const pointer = stage?.getPointerPosition()
    if (!pointer) {
      return
    }
    lastPointerPos.current = pointer
  }

  const handleTouchMove = () => {
    if (!(dragging && selectedData)) {
      return
    }

    const pointer = stage?.getPointerPosition()
    if (!(pointer && lastPointerPos.current)) {
      return
    }

    const dx = (pointer.x - lastPointerPos.current.x) * (imgSize.width / width)
    const dy =
      (pointer.y - lastPointerPos.current.y) * (imgSize.height / height)

    lastPointerPos.current = pointer

    if (selectedData.type === 'emoji') {
      setEmojis((prev) =>
        prev.map((e) => {
          if (selectedData.id === e.id) {
            const { x: px, y: py } = e.position
            return {
              ...e,
              position: {
                x: px + dx,
                y: py + dy,
              },
            }
          }

          return e
        }),
      )
    } else {
      setRects((prev) =>
        prev.map((r) => {
          if (selectedData.id === r.id) {
            const { x: px, y: py } = r.position
            return {
              ...r,
              position: {
                x: px + dx,
                y: py + dy,
              },
            }
          }

          return r
        }),
      )
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
  }

  return (
    <Stage
      ref={ref}
      width={width}
      height={height}
      scaleX={width / imgSize.width}
      scaleY={height / imgSize.height}
      onContextMenu={(ke) => ke.evt.preventDefault()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <BaseImageLayer />
      <StickerLayer />
    </Stage>
  )
}
