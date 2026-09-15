import type { ReactNode } from 'react'
import type { ImageTone } from '../data/content'

/**
 * 统一的图片占位：全站共用同一组淡紫渐变色块。
 *
 * 所有场景（卡片 / 头图 / banner / 缩略图）使用完全一致的色值与渐变方向，
 * 保证内页与首页的视觉节奏统一。
 * 后续接入真实图片时，传入 src 即可，比例与圆角规则不变。
 */

/** 统一的淡紫渐变：色值与方向全站一致（155deg，色标 0% / 48% / 100%） */
const PLACEHOLDER_GRADIENT =
  'linear-gradient(155deg, #EFEBF9 0%, #DED6F1 48%, #C7BDE9 100%)'

const TONES: Record<ImageTone, string> = {
  mist: PLACEHOLDER_GRADIENT,
  dawn: PLACEHOLDER_GRADIENT,
  moss: PLACEHOLDER_GRADIENT,
  plum: PLACEHOLDER_GRADIENT,
  sand: PLACEHOLDER_GRADIENT,
  dusk: PLACEHOLDER_GRADIENT,
  linen: PLACEHOLDER_GRADIENT,
}

type GradientImageProps = {
  tone?: ImageTone
  /** 宽高比，与卡片栅格保持一致 */
  ratio?: '16/9' | '4/3' | '1/1' | '3/4'
  /** 真实图片地址；传入后覆盖渐变 */
  src?: string
  alt?: string
  className?: string
  children?: ReactNode
}

const RATIO_CLASS: Record<NonNullable<GradientImageProps['ratio']>, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
}

export default function GradientImage({
  tone = 'mist',
  ratio = '4/3',
  src,
  alt = '',
  className = '',
  children,
}: GradientImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${RATIO_CLASS[ratio]} ${className}`}
      style={{
        background: src ? undefined : TONES[tone],
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role={src ? 'img' : 'presentation'}
      aria-label={src ? alt : undefined}
    >
      {/* 柔和的高光，模拟首页图片的侧逆光方向（左上） */}
      {!src && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 12% 8%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)',
          }}
        />
      )}
      {children}
    </div>
  )
}
