import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import CTASection from '../components/CTASection'
import GradientImage from '../components/GradientImage'
import Reveal from '../components/Reveal'
import { ArticleCard } from '../components/Cards'
import NotFound from './NotFound'
import { PRODUCTS, STATUSES } from '../data/content'
import { ROUTES } from '../lib/site'

export default function StatusDetail() {
  const { slug } = useParams()
  const item = STATUSES.find((s) => s.slug === slug)

  if (!item) return <NotFound />

  const product = PRODUCTS.find((p) => p.slug === item.relatedProduct)
  const others = STATUSES.filter((s) => s.slug !== item.slug)

  return (
    <>
      <PageHero eyebrow="女性状态" title={item.title} subtitle={item.summary} />

      <Section padded={false}>
        <Reveal>
          <GradientImage tone={item.tone} ratio="16/9" />
        </Reveal>
      </Section>

      {/* 正文 */}
      <Section>
        <div className="max-w-2xl">
          <Reveal>
            <div className="space-y-5">
              {item.body.map((paragraph) => (
                <p key={paragraph} className="text-black/70 text-base md:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 可能与应对 */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal>
            <div className="h-full rounded-2xl bg-white/70 p-7 md:p-9">
              <h2
                className="text-black text-2xl font-medium leading-snug"
                style={{ letterSpacing: '-0.02em' }}
              >
                可能与什么有关
              </h2>
              <ul className="mt-5 space-y-3">
                {item.causes.map((cause) => (
                  <li key={cause} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/30 shrink-0" />
                    <span className="text-black/60 text-sm md:text-base leading-relaxed">
                      {cause}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="h-full rounded-2xl bg-plum p-7 md:p-9">
              <h2
                className="text-white text-2xl font-medium leading-snug"
                style={{ letterSpacing: '-0.02em' }}
              >
                可以试试这样
              </h2>
              <ul className="mt-5 space-y-3">
                {item.helps.map((help) => (
                  <li key={help} className="flex items-start gap-3">
                    <Check className="mt-1 w-4 h-4 text-white/70 shrink-0" />
                    <span className="text-white/80 text-sm md:text-base leading-relaxed">
                      {help}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 相关产品 */}
      {product && (
        <Section>
          <SectionHeading eyebrow="相关产品" title="为这个时刻准备的产品" />
          <Reveal>
            <Link
              to={`${ROUTES.products}/${product.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-center rounded-2xl bg-white/70 p-6 transition-all duration-brand ease-brand hover:-translate-y-1 hover:bg-white"
            >
              <GradientImage tone={product.tone} ratio="4/3" />
              <div>
                <p className="text-black/40 text-xs">{product.tagline}</p>
                <h3
                  className="mt-2 text-black text-2xl font-medium"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {product.name}
                </h3>
                <p className="mt-3 text-black/60 text-sm md:text-base leading-relaxed">
                  {product.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-black/70 text-sm group-hover:text-black transition-colors duration-200 ease-brand">
                  查看产品
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-brand group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </Section>
      )}

      {/* 其他状态 */}
      <Section>
        <SectionHeading eyebrow="继续了解" title="其他常见状态" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {others.map((other, index) => (
            <ArticleCard
              key={other.slug}
              to={`${ROUTES.status}/${other.slug}`}
              title={other.title}
              summary={other.summary}
              tone={other.tone}
              delay={index * 80}
            />
          ))}
        </div>
      </Section>

      <CTASection
        title="做一次状态自测"
        desc="五道题，两分钟，帮你把模糊的感受梳理成可以描述的问题。"
        primary={{ label: '我的状态', to: '/status#check' }}
        secondary={{ label: '未晚生活', to: ROUTES.life }}
      />
    </>
  )
}
