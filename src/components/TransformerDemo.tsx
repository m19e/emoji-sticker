'use client'
import type Konva from 'konva'
import { useRef } from 'react'
import { Image, Layer, Stage, Transformer } from 'react-konva'
import useImage from 'use-image'

type ImageData = {
  src: string
  width: number
  height: number
}

export const Demo = () => {
  const imageData: ImageData = {
    src: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f914.svg',
    width: 200,
    height: 200,
  }

  const [image] = useImage(imageData.src)
  const transformerRef = useRef<Konva.Transformer>(null)
  const imageRef = useRef<Konva.Image>(null)

  const onSelect = () => {
    if (imageRef.current) {
      transformerRef.current?.nodes([imageRef.current])
    }
  }

  return (
    <Stage className="h-screen w-full bg-slate-200" width={500} height={500}>
      <Layer>
        {image && (
          <Image
            image={image}
            x={50}
            y={50}
            width={imageData.width}
            height={imageData.height}
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
      </Layer>
    </Stage>
  )
}
