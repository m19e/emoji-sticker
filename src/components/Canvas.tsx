'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import type Konva from 'konva'
import { useRef, useState } from 'react'
import { Stage } from 'react-konva'

import {
  emojiDatasAtom,
  rectanglesAtom,
  selectedStickerAtom,
} from '@/store/atoms'

import { useBaseImageSize } from '@/hooks/useBaseImageSize'
import { useCanvasData } from '@/hooks/useCanvasData'
import { useCanvasSize } from '@/hooks/useCanvasSize'

import { BaseImageLayer } from '@/components/layer/BaseImage'
import { StickerLayer } from '@/components/layer/Sticker'

// TODO 一旦リリース onTouchでステッカー移動
// FIXME linterの指摘解消
export const Canvas = () => {
  const { ref, stage } = useCanvasData()
  const {
    canvas: { width, height },
  } = useCanvasSize()
  const { imgSize } = useBaseImageSize()
  const selectedData = useAtomValue(selectedStickerAtom)
  const setEmojis = useSetAtom(emojiDatasAtom)
  const setRects = useSetAtom(rectanglesAtom)

  const lastPointerPos = useRef<Konva.Vector2d>(null)
  const [dragging, setDragging] = useState(false)

  const initialPosition = {
    x: imgSize.width / 2,
    y: imgSize.height / 2,
  }

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

    // TODO スマホ上での移動距離が短くなる問題の対応
    const dx = (pointer.x - lastPointerPos.current.x) * (imgSize.width / width)
    const dy =
      (pointer.y - lastPointerPos.current.y) * (imgSize.height / height)

    lastPointerPos.current = pointer

    if (selectedData.type === 'emoji') {
      setEmojis((prev) =>
        prev.map((e) => {
          if (selectedData.id === e.id) {
            const p = e.position ?? initialPosition
            return {
              ...e,
              position: {
                x: p.x + dx,
                y: p.y + dy,
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
            const p = r.position ?? initialPosition
            return {
              ...r,
              position: {
                x: p.x + dx,
                y: p.y + dy,
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
      <StickerLayer img={imgSize} />
    </Stage>
  )
}
