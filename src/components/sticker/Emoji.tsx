'use client'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Image, Transformer } from 'react-konva'

import { StickerSnap } from '@/constants'
import { useEmojiImage } from '@/hooks/useEmojiImage'
import type { StickerProps } from '@/types'

type Props = {
  /**
   * Unicode point for Emoji.
   */
  u: string
  fallback: string
} & StickerProps

export const Emoji = ({
  u,
  fallback,
  selected,
  onSelect,
  position,
  size,
  isDesktop,
}: Props) => {
  const { image } = useEmojiImage({ u, fallback })
  const transformerRef = useRef<Konva.Transformer>(null)
  const imageRef = useRef<Konva.Image>(null)

  useEffect(() => {
    if (selected && imageRef.current) {
      transformerRef.current?.nodes([imageRef.current])
    }
  }, [selected])

  const center = {
    x: position.x - size / 2,
    y: position.y - size / 2,
  }

  return (
    <>
      <Image
        ref={imageRef}
        image={image}
        width={size}
        height={size}
        x={center.x}
        y={center.y}
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
          anchorSize={isDesktop ? 10 : 16}
          anchorCornerRadius={isDesktop ? 5 : 8}
          rotateAnchorOffset={isDesktop ? 20 : 32}
          rotationSnaps={[0]}
          enabledAnchors={StickerSnap.CORNER}
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
