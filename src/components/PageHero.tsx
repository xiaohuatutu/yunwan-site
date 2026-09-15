import type { ReactNode } from 'react'
import Breadcrumb from './Breadcrumb'

type PageHeroProps = {
  eyebrow: string
  title: string
  subtitle?: string
  lead?: string
  /** 日期 / 阅读时长等元信息 */
  meta?: string
  /** 顶部留白已含固定导航高度 */
  children?: ReactNode
}

/**
 * 内页统一头部：眉标 + 标题 + 副标题 + 导语 + 面包屑。
 * 所有内页共用，保证版式节奏一致。
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  lead,
  meta,
  children,
}: PageHeroProps) {
  return (
    <header className="px-6 pt-32 md:pt-40 pb-12 md:pb-16">
      <div className="max-w-[88rem] mx-auto">
        <Breadcrumb current={title} />

        <p className="mt-8 text-black/60 text-sm" style={{ letterSpacing: '0.08em' }}>
          {eyebrow}
          {meta ? ` · ${meta}` : ''}
        </p>

        <h1
          className="mt-3 text-black text-4xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-3xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 text-black/70 text-lg md:text-2xl leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}

        {lead && (
          <p className="mt-6 text-black/60 text-base leading-relaxed max-w-2xl">{lead}</p>
        )}

        {children}
      </div>
    </header>
  )
}
