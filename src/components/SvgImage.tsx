'use client'
import { getSvgUrl } from '@/tools'
import type Konva from 'konva'
import { useRef } from 'react'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'

export const SvgImage = ({ u }: { u: string }) => {
  const [image] = useImage(getSvgUrl(u))
  const transformerRef = useRef<Konva.Transformer>(null)
  const imageRef = useRef<Konva.Image>(null)

  const onSelect = () => {
    if (imageRef.current) {
      transformerRef.current?.nodes([imageRef.current])
    }
  }

  return (
    <>
      {image && (
        <Image
          image={image}
          x={50}
          y={50}
          width={100}
          height={100}
          ref={imageRef}
          onClick={onSelect}
          onTap={onSelect}
          draggable
        />
      )}
      <Transformer
        ref={transformerRef}
        keepRatio
        rotateAnchorOffset={25}
        anchorSize={8}
        anchorCornerRadius={4}
        rotationSnaps={[0]}
        enabledAnchors={[
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
        ]}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.height < 50 || newBox.width < 50) {
            return oldBox
          }
          return newBox
        }}
      />
    </>
  )
}
