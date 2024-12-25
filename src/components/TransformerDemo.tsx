'use client'
import { useEffect, useRef, useState } from 'react'
import { Image, Layer, Stage, Transformer } from 'react-konva'
import useImage from 'use-image'

type SelectNodesObj = { nodes: (nodes: any[]) => void }

const checkHasNodesMethod = (obj: any): obj is SelectNodesObj =>
  typeof obj !== 'undefined' && 'nodes' in obj

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
      checkHasNodesMethod(transformerRef.current) &&
        (transformerRef.current as SelectNodesObj).nodes([selectedShape])
    }
  }, [selectedShape])

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
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
            onClick={() => {
              setSelectedShape(imageRef.current)
            }}
            onTap={() => {
              setSelectedShape(imageRef.current)
            }}
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
