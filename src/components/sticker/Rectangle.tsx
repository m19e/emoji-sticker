'use client'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Rect, Transformer } from 'react-konva'

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

  return (
    <>
      <Rect
        x={x}
        y={y}
        width={240}
        height={80}
        fill="gray"
        cornerRadius={2}
        ref={shapeRef}
        onClick={onSelect}
        onDragStart={onSelect}
        onTap={onSelect}
        onTouchStart={onSelect}
        draggable
      />
      {selected && (
        <Transformer
          ref={transformerRef}
          anchorSize={isDesktop ? 8 : 16}
          anchorCornerRadius={isDesktop ? 4 : 8}
          rotationSnaps={[0]}
          rotateAnchorOffset={isDesktop ? 16 : 32}
          enabledAnchors={[
            'top-center',
            'bottom-center',
            'middle-right',
            'middle-left',
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.height < 15 || newBox.width < 50) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}
