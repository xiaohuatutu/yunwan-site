import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import CTASection from '../components/CTASection'
import { ArticleCard } from '../components/Cards'
import { LIFE_ARTICLES, LIFE_INTRO } from '../data/content'
import { ROUTES } from '../lib/site'

export default function Life() {
  return (
    <>
      <PageHero
        eyebrow={LIFE_INTRO.eyebrow}
        title={LIFE_INTRO.title}
        subtitle={LIFE_INTRO.subtitle}
        lead={LIFE_INTRO.lead}
      />

      <Section>
        <SectionHeading
          eyebrow="生活指南"
          title="挑一个今天想试的"
          subtitle="不需要全部做到，从最容易的那一件开始。"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIFE_ARTICLES.map((article, index) => (
            <ArticleCard
              key={article.slug}
              to={`${ROUTES.life}/${article.slug}`}
              title={article.title}
              summary={article.subtitle}
              category={article.category}
              meta={article.meta}
              tone={article.tone}
              delay={index * 80}
            />
          ))}
        </div>
      </Section>

      <CTASection
        title="生活方式的改变，需要有人一起"
        desc="我们每月更新书单与声音清单，也会在线下空间组织小型工作坊。"
        primary={{ label: '找到未晚', to: ROUTES.find }}
        secondary={{ label: '未晚故事', to: ROUTES.story }}
      />
    </>
  )
}
