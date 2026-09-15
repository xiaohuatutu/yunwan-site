import {
  BRAND_LOGO_HEIGHT,
  BRAND_LOGO_PATH,
  BRAND_LOGO_VIEWBOX,
  BRAND_LOGO_WIDTH,
} from '../brandLogoPath'

type BrandLogoProps = {
  className?: string
}

/**
 * 雲窦 / CLOUD9 EVERNOW 品牌 LOGO
 *
 * 路径由 scripts/trace_logo.py 从参考 PNG 自动矢量化（marching squares）生成，
 * 与原图形状一致，非手工绘制。viewBox 已裁剪到墨迹边界（原图四周留白较大，
 * 不裁的话同样高度下 logo 会显得偏小）。
 * 使用 currentColor + fill-rule="evenodd"，可随文字颜色变化并正确保留内部镂空。
 */
export default function BrandLogo({ className }: BrandLogoProps) {
  return (
    <svg
      width={BRAND_LOGO_WIDTH}
      height={BRAND_LOGO_HEIGHT}
      viewBox={BRAND_LOGO_VIEWBOX}
      className={className}
      fill="currentColor"
      fillRule="evenodd"
      aria-label="雲窦 CLOUD9 EVERNOW"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={BRAND_LOGO_PATH} />
    </svg>
  )
}
