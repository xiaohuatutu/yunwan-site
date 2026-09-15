import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionProps = {
  children: ReactNode
  className?: string
  /** 是否带上下留白（默认带） */
  padded?: boolean
  /** 锚点 id（供 /status#check 之类跳转使用） */
  id?: string
}

/** 内容区块：统一最大宽度 88rem 与左右内边距 */
export default function Section({ children, className = '', padded = true, id }: SectionProps) {
  return (
    <section id={id} className={`${padded ? 'py-14 md:py-20' : ''} px-6 ${className}`}>
      <div className="max-w-[88rem] mx-auto">{children}</div>
    </section>
  )
}

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}

/** 区块标题：眉标 / 标题 / 副标题，层级与首页一致 */
export function SectionHeading({ eyebrow, title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <Reveal className={`mb-8 md:mb-12 ${className}`}>
      {eyebrow && (
        <p className="text-black/60 text-sm mb-2" style={{ letterSpacing: '0.08em' }}>
          {eyebrow}
        </p>
      )}
      <h2
        className="text-black text-3xl md:text-4xl font-medium leading-snug max-w-2xl"
        style={{ letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-black/60 text-base leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </Reveal>
  )
}
