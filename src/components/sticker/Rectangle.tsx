'use client'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Rect, Transformer } from 'react-konva'

import { StickerSnap } from '@/constants'
import type { StickerProps } from '@/types'

export const Rectangle = ({
  selected,
  onSelect,
  position,
  size,
  isDesktop,
}: StickerProps) => {
  const shapeRef = useRef<Konva.Rect>(null)
  const transformerRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    if (selected && shapeRef.current) {
      transformerRef.current?.nodes([shapeRef.current])
    }
  }, [selected])

  const width = size
  const height = size / 4
  const center = {
    x: position.x - width / 2,
    y: position.y - height / 2,
  }

  return (
    <>
      <Rect
        ref={shapeRef}
        width={width}
        height={height}
        x={center.x}
        y={center.y}
        fill="gray"
        cornerRadius={2}
        onClick={onSelect}
        onDragStart={onSelect}
        onTap={onSelect}
        onTouchStart={onSelect}
        draggable
      />
      {selected && (
        <Transformer
          ref={transformerRef}
          anchorSize={isDesktop ? 10 : 16}
          anchorCornerRadius={isDesktop ? 5 : 8}
          rotateAnchorOffset={isDesktop ? 20 : 32}
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
