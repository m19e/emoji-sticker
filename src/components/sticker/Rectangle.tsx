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
        width={200}
        height={50}
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
          anchorSize={8}
          anchorCornerRadius={4}
          rotationSnaps={[0]}
          rotateAnchorOffset={16}
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
