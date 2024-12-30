'use client'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'

import { getSvgUrl } from '@/tools'

type Props = {
  u: string
  selected: boolean
  onSelect: () => void
}

export const SvgImage = ({ u, selected, onSelect }: Readonly<Props>) => {
  const [image] = useImage(getSvgUrl(u))
  const transformerRef = useRef<Konva.Transformer>(null)
  const imageRef = useRef<Konva.Image>(null)

  useEffect(() => {
    if (selected && imageRef.current) {
      transformerRef.current?.nodes([imageRef.current])
    }
  }, [selected])

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
          onDragStart={onSelect}
          onTap={onSelect}
          onTouchStart={onSelect}
          draggable
        />
      )}
      {selected && (
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
      )}
    </>
  )
}
