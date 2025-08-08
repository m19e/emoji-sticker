'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Rect, Transformer } from 'react-konva'

import { createSelectedRect } from '@/brand'
import { StickerSnap } from '@/constants'
import { selectedStickerAtom, selectedStickerIdAtom } from '@/store/atoms'
import type { StickerProps } from '@/types'

type Target = {
  width: () => number
  height: () => number
  scaleX: () => number
  scaleY: () => number
}

// TODO w,h取得処理を共通化
const getSelectedRect = (target: Target) => {
  const w = target.width() * target.scaleX()
  const h = target.height() * target.scaleY()
  return { w, h }
}

type Props = {
  id: string
  w: number
  h: number
} & StickerProps

// TODO isDesktopでの分岐をまとめる(Transformer)
// TODO rename to `rectId`
export const Rectangle = ({ id: rectId, w, h, position, isDesktop }: Props) => {
  const shapeRef = useRef<Konva.Rect>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const selectedId = useAtomValue(selectedStickerIdAtom)
  const setSelected = useSetAtom(selectedStickerAtom)

  const selected = rectId === selectedId

  // TODO 不要になったので消す

  useEffect(() => {
    if (selected && shapeRef.current) {
      transformerRef.current?.nodes([shapeRef.current])
      // TODO この時点で選択されているので選択不要？
    }
  }, [selected])

  const handleSelect = () => {
    if (shapeRef.current) {
      const { w, h } = getSelectedRect(shapeRef.current)
      setSelected(createSelectedRect({ id: rectId, w, h }))
    }
  }

  const center = {
    x: position.x - w / 2,
    y: position.y - h / 2,
  }

  const tfProps = {
    anchorSize: isDesktop ? 10 : 16,
    anchorCornerRadius: isDesktop ? 5 : 8,
    rotateAnchorOffset: isDesktop ? 20 : 32,
  }

  return (
    <>
      <Rect
        ref={shapeRef}
        width={w}
        height={h}
        x={center.x}
        y={center.y}
        fill="gray"
        cornerRadius={2}
        onClick={handleSelect}
        onDragStart={handleSelect}
        onTap={handleSelect}
        onTouchStart={handleSelect}
        onTransformEnd={({ target }) => {
          const { w, h } = getSelectedRect(target)
          setSelected(createSelectedRect({ id: rectId, w, h }))
        }}
        draggable
      />
      {selected && (
        <Transformer
          {...tfProps}
          ref={transformerRef}
          rotationSnaps={[0]}
          keepRatio={false}
          enabledAnchors={isDesktop ? StickerSnap.CORNER : StickerSnap.CENTER}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.height < 12 || newBox.width < 36) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}
