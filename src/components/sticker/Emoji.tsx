'use client'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Image, Transformer } from 'react-konva'

import { useAnonymousImage } from '@/hooks/useAnonymousImage'
import { getSvgUrl } from '@/tools'

type Props = {
  u: string
  selected: boolean
  onSelect: () => void
  x: number
  y: number
  // width: number
  // height: number
}

export const Emoji = ({ u, selected, onSelect, x, y }: Props) => {
  const [image] = useAnonymousImage(getSvgUrl(u))
  const transformerRef = useRef<Konva.Transformer>(null)
  const imageRef = useRef<Konva.Image>(null)

  useEffect(() => {
    if (selected && imageRef.current) {
      transformerRef.current?.nodes([imageRef.current])
    }
  }, [selected])

  return (
    <>
      <Image
        image={image}
        x={x}
        y={y}
        width={100}
        height={100}
        ref={imageRef}
        onClick={onSelect}
        onDragStart={onSelect}
        onTap={onSelect}
        onTouchStart={onSelect}
        draggable
      />
      {selected && (
        <Transformer
          ref={transformerRef}
          keepRatio
          anchorSize={8}
          anchorCornerRadius={4}
          rotationSnaps={[0]}
          rotateAnchorOffset={16}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.height < 25 || newBox.width < 25) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}
