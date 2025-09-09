'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Image, Transformer } from 'react-konva'

import { createSelectedEmoji } from '@/brand'
import { StickerSnap } from '@/constants'
import { useEmojiImage } from '@/hooks/useEmojiImage'
import {
  emojiDatasAtom,
  selectedStickerAtom,
  selectedStickerIdAtom,
} from '@/store/atoms'
import { getSelectedSize } from '@/tools'
import type { EmojiData, StickerProps } from '@/types'

// TODO typesに共通化
// TODO Konva側の型をちゃんと使う
// FIXME 削除

// TODO 無駄なOmit消す
type Props = {
  data: EmojiData
  size: number
} & StickerProps

// TODO isDesktopでの分岐をまとめる(Transformer)
// TODO rename to `emojiId`
// TODO Stageのドラッグで絵文字ノードを移動する
// TODO 選択処理共通化
export const Emoji = ({
  data: { id: emojiId, u, fallback },
  size,
  position,
  isDesktop,
}: Props) => {
  const { image } = useEmojiImage({ u, fallback })
  const transformerRef = useRef<Konva.Transformer>(null)
  const imageRef = useRef<Konva.Image>(null)
  const selectedId = useAtomValue(selectedStickerIdAtom)
  const setSelected = useSetAtom(selectedStickerAtom)
  const setEmojis = useSetAtom(emojiDatasAtom)

  const selected = emojiId === selectedId

  // TODO 不要になったので消す

  useEffect(() => {
    if (selected && imageRef.current) {
      transformerRef.current?.nodes([imageRef.current])

      // TODO この時点で選択されているので選択不要？
      setSelected(
        createSelectedEmoji({
          id: emojiId,
          size: getSelectedSize(imageRef.current),
        }),
      )
    }
  }, [selected, setSelected, emojiId])

  const handleSelect = () => {
    // 選択された絵文字を最後尾に追加してレイヤー最前面に配置
    setEmojis((prev) => [
      ...prev.filter((e) => e.id !== emojiId),
      ...prev.filter((e) => e.id === emojiId),
    ])

    if (imageRef.current) {
      setSelected(
        createSelectedEmoji({
          id: emojiId,
          size: getSelectedSize(imageRef.current),
        }),
      )
    }
  }

  const center = {
    x: position.x - size / 2,
    y: position.y - size / 2,
  }

  const tfProps = {
    anchorSize: isDesktop ? 10 : 16,
    anchorCornerRadius: isDesktop ? 5 : 8,
    rotateAnchorOffset: isDesktop ? 20 : 32,
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
            createSelectedEmoji({ id: emojiId, size: getSelectedSize(target) }),
          )
        }}
        draggable={isDesktop}
      />
      {selected && (
        <Transformer
          {...tfProps}
          ref={transformerRef}
          keepRatio
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
