import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import StatGrid from '../components/StatGrid'
import CTASection from '../components/CTASection'
import { ArticleCard, PointCard } from '../components/Cards'
import GradientImage from '../components/GradientImage'
import Reveal from '../components/Reveal'
import { STORIES, STORY_INTRO, STORY_STATS, PRODUCT_PRINCIPLES } from '../data/content'
import { ROUTES } from '../lib/site'

export default function Story() {
  return (
    <>
      <PageHero
        eyebrow={STORY_INTRO.eyebrow}
        title={STORY_INTRO.title}
        subtitle={STORY_INTRO.subtitle}
        lead={STORY_INTRO.lead}
      />

      {/* 视觉锚点 */}
      <Section padded={false}>
        <Reveal>
          <GradientImage tone="mist" ratio="16/9" />
        </Reveal>
      </Section>

      {/* 数据模块 */}
      <Section>
        <SectionHeading eyebrow="数据" title="我们走到哪里了" />
        <StatGrid items={STORY_STATS} />
      </Section>

      {/* 故事列表 */}
      <Section>
        <SectionHeading
          eyebrow="品牌手记"
          title="我们做过的一些事"
          subtitle="不宏大，但都是真实发生过的。"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STORIES.map((story, index) => (
            <ArticleCard
              key={story.slug}
              to={`${ROUTES.story}/${story.slug}`}
              title={story.title}
              summary={story.subtitle}
              category={story.category}
              meta={story.meta}
              tone={story.tone}
              delay={index * 80}
            />
          ))}
        </div>
      </Section>

      {/* 做事的原则 */}
      <Section>
        <SectionHeading eyebrow="原则" title="三件我们不会让步的事" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRODUCT_PRINCIPLES.map((item, index) => (
            <PointCard key={item.title} title={item.title} desc={item.desc} delay={index * 80} />
          ))}
        </div>
      </Section>

      <CTASection
        title="想更了解我们？"
        desc="看看我们的产品，或者来线下空间坐一坐。"
        primary={{ label: '未晚产品', to: ROUTES.products }}
        secondary={{ label: '找到未晚', to: ROUTES.find }}
      />
    </>
  )
}
