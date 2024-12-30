'use client'
import { useAtomValue } from 'jotai'
import type Konva from 'konva'
import { useState } from 'react'
import { Layer, Stage } from 'react-konva'

import { SvgImage } from '@/components/SvgImage'
import { emojiSvgIdsAtom } from '@/store/atoms'

export const Demo = () => {
  const emojis = useAtomValue(emojiSvgIdsAtom)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const checkUnselect = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>,
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      setSelectedId(null)
    }
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  return (
    <Stage
      className="h-screen w-full bg-slate-200"
      width={500}
      height={500}
      onMouseDown={checkUnselect}
      onTouchStart={checkUnselect}
    >
      <Layer>
        {emojis.map((e) => (
          <SvgImage
            key={e.id}
            u={e.u}
            selected={e.id === selectedId}
            onSelect={() => handleSelect(e.id)}
          />
        ))}
      </Layer>
    </Stage>
  )
}
