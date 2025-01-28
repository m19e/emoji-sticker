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
  position: {
    x: number
    y: number
  }
  size: number
  isDesktop: boolean
  // width: number
  // height: number
}

export const Emoji = ({ u, selected, onSelect, x, y, isDesktop }: Props) => {
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
        width={160}
        height={160}
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
          anchorSize={isDesktop ? 8 : 16}
          anchorCornerRadius={isDesktop ? 4 : 8}
          rotationSnaps={[0]}
          rotateAnchorOffset={isDesktop ? 16 : 32}
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
