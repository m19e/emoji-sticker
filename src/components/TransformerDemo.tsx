'use client'
import { useEffect, useRef, useState } from 'react'
import { Image, Layer, Stage, Transformer } from 'react-konva'
import useImage from 'use-image'

type ImageData = {
  src: string
  width: number
  height: number
}

export const Demo = () => {
  const imageData: ImageData = {
    src: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f914.svg', // SVGファイルのURL
    width: 200,
    height: 200,
  }

  const [image] = useImage(imageData.src)
  const [selectedShape, setSelectedShape] = useState(undefined)
  const transformerRef = useRef(undefined)
  const imageRef = useRef(undefined)

  useEffect(() => {
    if (selectedShape) {
      // @ts-ignore
      transformerRef.current?.nodes([selectedShape])
    }
  }, [selectedShape])

  const onSelect = () => {
    setSelectedShape(imageRef.current)
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
            // @ts-ignore
            ref={imageRef}
            onClick={onSelect}
            onTap={onSelect}
            draggable
          />
        )}
        <Transformer
          // @ts-ignore
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
