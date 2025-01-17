'use client'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Rect, Transformer } from 'react-konva'

type Props = {
  selected: boolean
  onSelect: () => void
  x: number
  y: number
}

export const Rectangle = ({ selected, onSelect, x, y }: Props) => {
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
        width={100}
        height={100}
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
          anchorSize={8}
          anchorCornerRadius={4}
          rotationSnaps={[0]}
          enabledAnchors={['top', 'bottom', 'right', 'left']}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.height < 50 || newBox.width < 50) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}
