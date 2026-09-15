import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import StatGrid from '../components/StatGrid'
import CTASection from '../components/CTASection'
import { ArticleCard } from '../components/Cards'
import Reveal from '../components/Reveal'
import { SELF_CHECK_QUESTIONS, STATUSES, STATUS_INTRO, STATUS_STATS } from '../data/content'
import { ROUTES } from '../lib/site'

/** 简易自测：勾选数量对应不同建议（纯前端示例，不构成医学判断） */
function SelfCheck() {
  const [answers, setAnswers] = useState<boolean[]>(() => SELF_CHECK_QUESTIONS.map(() => false))

  const yesCount = answers.filter(Boolean).length

  const result = useMemo(() => {
    if (yesCount <= 1) {
      return {
        level: '目前影响较小',
        text: '你的状态整体平稳。建议保持规律作息，并每年做一次常规体检。',
      }
    }
    if (yesCount <= 3) {
      return {
        level: '值得开始关注',
        text: '部分变化已经出现。可以从睡眠与运动两件小事开始调整，并留意它们的变化趋势。',
      }
    }
    return {
      level: '建议寻求专业支持',
      text: '多项变化同时存在且已经影响日常。建议预约专业顾问或就医，获得针对性建议。',
    }
  }, [yesCount])

  return (
    <div className="rounded-3xl bg-white/70 p-7 md:p-10">
      <ul className="space-y-3">
        {SELF_CHECK_QUESTIONS.map((question, index) => (
          <li key={question}>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={answers[index]}
                onChange={() =>
                  setAnswers((prev) => prev.map((v, i) => (i === index ? !v : v)))
                }
                className="mt-1 w-4 h-4 accent-black"
              />
              <span className="text-black/70 text-sm md:text-base leading-relaxed group-hover:text-black transition-colors duration-200 ease-brand">
                {question}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-black/10">
        <p className="text-black/50 text-xs">已选择 {yesCount} 项</p>
        <p className="mt-2 text-black text-xl font-medium" style={{ letterSpacing: '-0.02em' }}>
          {result.level}
        </p>
        <p className="mt-2 text-black/60 text-sm leading-relaxed max-w-xl">{result.text}</p>

        <Link
          to={ROUTES.find}
          className="mt-6 inline-flex items-center gap-2 text-black text-sm font-medium group"
        >
          预约一次状态交流
          <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-brand group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default function Status() {
  return (
    <>
      <PageHero
        eyebrow={STATUS_INTRO.eyebrow}
        title={STATUS_INTRO.title}
        subtitle={STATUS_INTRO.subtitle}
        lead={STATUS_INTRO.lead}
      />

      {/* 数据模块 */}
      <Section>
        <SectionHeading
          eyebrow="数据"
          title="你并不只有自己一个人"
          subtitle="以下为示例数据，仅用于站点演示，上线前请替换为真实调研结果。"
        />
        <StatGrid items={STATUS_STATS} />
      </Section>

      {/* 四种状态 */}
      <Section>
        <SectionHeading eyebrow="常见状态" title="四种最常被提到的变化" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATUSES.map((item, index) => (
            <ArticleCard
              key={item.slug}
              to={`${ROUTES.status}/${item.slug}`}
              title={item.title}
              summary={item.summary}
              tone={item.tone}
              ratio="4/3"
              delay={index * 80}
            />
          ))}
        </div>
      </Section>

      {/* 自测模块：首页「我的状态」按钮指向这里 */}
      <Section id="check">
        <SectionHeading
          eyebrow="我的状态"
          title="先花两分钟，了解一下自己"
          subtitle="本自测为示例工具，仅用于帮助你梳理感受，不构成任何医学诊断。"
        />
        <Reveal>
          <SelfCheck />
        </Reveal>
      </Section>

      <CTASection
        title="如果这些变化已经影响到你的日常"
        desc="我们的顾问可以陪你梳理一次，也可以只是听你说说话。"
        primary={{ label: '找到未晚', to: ROUTES.find }}
        secondary={{ label: '未晚产品', to: ROUTES.products }}
      />
    </>
  )
}
