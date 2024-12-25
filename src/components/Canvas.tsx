'use client'
import { Image, Layer, Stage } from 'react-konva'
import useImage from 'use-image'

export const Canvas = () => {
  const svgUrl =
    'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f914.svg'
  const [image] = useImage(svgUrl)
  const xy = (500 - 100) / 2

  return (
    <Stage width={500} height={500} className="bg-slate-300">
      <Layer>
        {image && (
          <Image
            image={image}
            x={xy}
            y={xy}
            width={100}
            height={100}
            draggable
          />
        )}
      </Layer>
    </Stage>
  )
}
