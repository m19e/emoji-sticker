'use client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import type Konva from 'konva'
import { useCallback, useEffect, useRef } from 'react'
import { Image, Transformer } from 'react-konva'

import { createSelectedEmoji } from '@/brand'
import { StickerSnap } from '@/constants'
import { useEmojiImage } from '@/hooks/useEmojiImage'
import {
  emojiDatasAtom,
  selectedStickerDataAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'
import type { EmojiData, StickerProps } from '@/types'

type Target = {
  width: () => number
  scaleX: () => number
}

// TODO w,h取得処理を共通化
const getSelectedSize = (target: Target) => {
  return target.width() * target.scaleX()
}

// TODO EmojiData(copySize抜き)を`data`で受け取る
type Props = {
  data: Omit<EmojiData, 'copySize'>
  size: number
} & StickerProps

// TODO 選択時に絵文字ノードの情報を出力してみる
// TODO 選択時に選択ノードatomを更新
// TODO 変形後に選択ノードatomを更新
// TODO isDesktopでの分岐をまとめる(Transformer)
export const Emoji = ({
  data: { id, u, fallback },
  size,
  position,
  isDesktop,
}: Props) => {
  const { image } = useEmojiImage({ u, fallback })
  const transformerRef = useRef<Konva.Transformer>(null)
  const imageRef = useRef<Konva.Image>(null)
  const selectedId = useAtomValue(selectedStickerIdAtom)
  const setSelected = useSetAtom(selectedStickerDataAtom)
  const [emojis, setEmojis] = useAtom(emojiDatasAtom)

  const selected = selectedId === id

  // TODO selectedData更新処理共通化
  const selectEmoji = useCallback(() => {
    if (imageRef.current) {
      setSelected(
        createSelectedEmoji({ id, size: getSelectedSize(imageRef.current) }),
      )
    }
  }, [id, setSelected])

  useEffect(() => {
    if (selected && imageRef.current) {
      transformerRef.current?.nodes([imageRef.current])

      selectEmoji()
    }
  }, [selected, selectEmoji])

  const handleSelect = () => {
    // 選択された絵文字を最後尾に追加してレイヤー最前面に配置
    setEmojis((prev) => [
      ...prev.filter((e) => e.id !== id),
      ...prev.filter((e) => e.id === id),
    ])

    selectEmoji()
  }

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
        onClick={handleSelect}
        onDragStart={handleSelect}
        onTap={handleSelect}
        onTouchStart={handleSelect}
        onTransformEnd={({ target }) => {
          setSelected(
            createSelectedEmoji({ id, size: getSelectedSize(target) }),
          )
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
