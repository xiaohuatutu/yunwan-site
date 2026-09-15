import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import CTASection from '../components/CTASection'
import { ArticleCard } from '../components/Cards'
import { NEWS, NEWS_INTRO } from '../data/content'
import { ROUTES } from '../lib/site'

export default function News() {
  return (
    <>
      <PageHero
        eyebrow={NEWS_INTRO.eyebrow}
        title={NEWS_INTRO.title}
        subtitle={NEWS_INTRO.subtitle}
      />

      <Section>
        <SectionHeading eyebrow="全部动态" title="最近发生的事" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NEWS.map((item, index) => (
            <ArticleCard
              key={item.slug}
              to={`${ROUTES.news}/${item.slug}`}
              title={item.title}
              summary={item.subtitle}
              category={item.category}
              meta={item.meta}
              tone={item.tone}
              delay={index * 80}
            />
          ))}
        </div>
      </Section>

      <CTASection
        title="想第一时间收到更新？"
        desc="留下联系方式，我们会在有新动态时通知你。"
        primary={{ label: '找到未晚', to: ROUTES.find }}
        secondary={{ label: '与我们合作', to: ROUTES.partner }}
      />
    </>
  )
}
