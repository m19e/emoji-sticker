'use client'
import { Layer, Stage } from 'react-konva'

import { SvgImage } from '@/components/SvgImage'

export const Demo = () => {
  return (
    <Stage className="h-screen w-full bg-slate-200" width={500} height={500}>
      <Layer>
        <SvgImage u="1f914" />
      </Layer>
    </Stage>
  )
}
