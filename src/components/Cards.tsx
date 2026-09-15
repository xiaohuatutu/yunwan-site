import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GradientImage from './GradientImage'
import Reveal from './Reveal'
import type { ImageTone } from '../data/content'

type ArticleCardProps = {
  to: string
  title: string
  summary?: string
  meta?: string
  category?: string
  tone?: ImageTone
  ratio?: '16/9' | '4/3' | '1/1' | '3/4'
  image?: string
  delay?: number
}

/**
 * 通用内容卡片：列表页（故事 / 生活 / 新闻 / 产品 / 状态）共用。
 * 统一的圆角、比例、hover 反馈与动效延迟。
 */
export function ArticleCard({
  to,
  title,
  summary,
  meta,
  category,
  tone = 'mist',
  ratio = '4/3',
  image,
  delay = 0,
}: ArticleCardProps) {
  return (
    <Reveal delay={delay}>
      <Link
        to={to}
        className="group block h-full rounded-2xl bg-white/70 overflow-hidden transition-all duration-brand ease-brand hover:-translate-y-1 hover:bg-white"
      >
        <GradientImage tone={tone} ratio={ratio} src={image} alt={title} className="rounded-none" />

        <div className="p-6 md:p-7 flex flex-col">
          {(category || meta) && (
            <p className="text-black/40 text-xs mb-3">
              {category}
              {category && meta ? ' · ' : ''}
              {meta}
            </p>
          )}

          <h3
            className="text-black text-xl md:text-2xl font-medium leading-snug"
            style={{ letterSpacing: '-0.02em' }}
          >
            {title}
          </h3>

          {summary && (
            <p className="mt-3 text-black/60 text-sm md:text-base leading-relaxed">{summary}</p>
          )}

          <span className="mt-5 inline-flex items-center gap-2 text-black/70 text-sm group-hover:text-black transition-colors duration-200 ease-brand">
            查看
            <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-brand group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

type PointCardProps = {
  title: string
  desc: string
  delay?: number
}

/** 要点卡片：三列要点 / 原则 / 流程共用 */
export function PointCard({ title, desc, delay = 0 }: PointCardProps) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl bg-white/70 p-7">
        <h3 className="text-black text-xl font-medium leading-snug" style={{ letterSpacing: '-0.02em' }}>
          {title}
        </h3>
        <p className="mt-3 text-black/60 text-sm leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  )
}
