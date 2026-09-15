import { useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import CTASection from '../components/CTASection'
import GradientImage from '../components/GradientImage'
import Reveal from '../components/Reveal'
import { ArticleCard } from '../components/Cards'
import NotFound from './NotFound'
import { PRODUCTS } from '../data/content'
import { ROUTES } from '../lib/site'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = PRODUCTS.find((p) => p.slug === slug)

  if (!product) return <NotFound />

  const others = PRODUCTS.filter((p) => p.slug !== product.slug)

  return (
    <>
      <PageHero
        eyebrow={product.tagline}
        title={product.name}
        subtitle={product.summary}
      />

      {/* 主视觉 */}
      <Section padded={false}>
        <Reveal>
          <GradientImage tone={product.tone} ratio="16/9" />
        </Reveal>
      </Section>

      {/* 三个亮点 */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {product.highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="h-full rounded-2xl bg-white/70 p-7">
                <h2
                  className="text-black text-xl font-medium"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {item.title}
                </h2>
                <p className="mt-3 text-black/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 规格 + 原料 */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal>
            <div className="h-full rounded-2xl bg-white/70 p-7 md:p-9">
              <h2 className="text-black text-2xl font-medium" style={{ letterSpacing: '-0.02em' }}>
                产品规格
              </h2>
              <dl className="mt-6 divide-y divide-black/10">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-6 py-3">
                    <dt className="text-black/50 text-sm shrink-0">{spec.label}</dt>
                    <dd className="text-black text-sm text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="h-full rounded-2xl bg-white/70 p-7 md:p-9">
              <h2 className="text-black text-2xl font-medium" style={{ letterSpacing: '-0.02em' }}>
                主要原料
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.ingredients.map((name) => (
                  <li
                    key={name}
                    className="rounded-full bg-black/5 px-4 py-2 text-black/70 text-sm"
                  >
                    {name}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-black text-lg font-medium">使用建议</h3>
              <ol className="mt-4 space-y-2">
                {product.usage.map((line, index) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-black/30 text-sm">{index + 1}</span>
                    <span className="text-black/60 text-sm leading-relaxed">{line}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="常见问题" title="你可能会问" />
        <div className="max-w-2xl space-y-3">
          {product.faq.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <div className="rounded-2xl bg-white/70 p-6">
                <p className="text-black font-medium">{item.q}</p>
                <p className="mt-2 text-black/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-black/40 text-xs max-w-2xl">
          提示：本产品为食养类食品，不能替代药品，不具有疾病预防与治疗功能。
        </p>
      </Section>

      {/* 其他产品 */}
      <Section>
        <SectionHeading eyebrow="继续看看" title="其他产品" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {others.map((other, index) => (
            <ArticleCard
              key={other.slug}
              to={`${ROUTES.products}/${other.slug}`}
              title={other.name}
              summary={other.summary}
              category={other.tagline}
              tone={other.tone}
              delay={index * 80}
            />
          ))}
        </div>
      </Section>

      <CTASection
        title="想先体验再决定？"
        desc="重庆体验空间可现场试用全部产品，也提供一对一的状态交流。"
        primary={{ label: '找到未晚', to: ROUTES.find }}
        secondary={{ label: '未晚生活', to: ROUTES.life }}
      />
    </>
  )
}
