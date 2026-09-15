import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import CTASection from '../components/CTASection'
import { ArticleCard, PointCard } from '../components/Cards'
import { PRODUCTS, PRODUCT_INTRO, PRODUCT_PRINCIPLES } from '../data/content'
import { ROUTES } from '../lib/site'

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow={PRODUCT_INTRO.eyebrow}
        title={PRODUCT_INTRO.title}
        subtitle={PRODUCT_INTRO.subtitle}
        lead={PRODUCT_INTRO.lead}
      />

      {/* 产品列表 */}
      <Section>
        <SectionHeading eyebrow="全部产品" title="四款，对应四个时刻" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product, index) => (
            <ArticleCard
              key={product.slug}
              to={`${ROUTES.products}/${product.slug}`}
              title={product.name}
              summary={product.summary}
              category={product.tagline}
              tone={product.tone}
              ratio="4/3"
              delay={index * 80}
            />
          ))}
        </div>
      </Section>

      {/* 原则 */}
      <Section>
        <SectionHeading
          eyebrow="配方原则"
          title="三条写在实验室白板上的原则"
          subtitle="可以有依据，可以温和，可以坚持喝下去。"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRODUCT_PRINCIPLES.map((item, index) => (
            <PointCard key={item.title} title={item.title} desc={item.desc} delay={index * 80} />
          ))}
        </div>
      </Section>

      <CTASection
        title="不确定从哪一款开始？"
        desc="先做一次状态自测，或者直接来线下空间体验。"
        primary={{ label: '我的状态', to: '/status#check' }}
        secondary={{ label: '找到未晚', to: ROUTES.find }}
      />
    </>
  )
}
