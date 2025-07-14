'use client'
import { useSetAtom } from 'jotai'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Image, Transformer } from 'react-konva'

import { StickerSnap } from '@/constants'
import { useEmojiImage } from '@/hooks/useEmojiImage'
import { selectedStickerDataAtom } from '@/store/atoms'
import type { StickerProps } from '@/types'

type Props = {
  /**
   * Unicode point for Emoji.
   */
  u: string
  fallback: string
} & StickerProps

// TODO 選択時に絵文字ノードの情報を出力してみる
// TODO 選択時に選択ノードatomを更新
// TODO 変形後に選択ノードatomを更新
// TODO isDesktopでの分岐をまとめる(Transformer)
// TODO w,h取得処理を共通化
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
  const setSelectedSticker = useSetAtom(selectedStickerDataAtom)

  useEffect(() => {
    if (selected && imageRef.current) {
      transformerRef.current?.nodes([imageRef.current])

      const w = imageRef.current.width() * imageRef.current.scaleX()
      const h = imageRef.current.height() * imageRef.current.scaleY()

      setSelectedSticker({ type: 'emoji', w, h })
    }
  }, [selected, setSelectedSticker])

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
        onTransformEnd={({ target }) => {
          const w = target.width() * target.scaleX()
          const h = target.height() * target.scaleY()

          setSelectedSticker({ type: 'emoji', w, h })
        }}
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
