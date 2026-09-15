import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import BackedBySection from '../components/BackedBySection'
import UseCasesSection from '../components/UseCasesSection'
import Section, { SectionHeading } from '../components/Section'
import Reveal from '../components/Reveal'
import StatGrid from '../components/StatGrid'
import CTASection from '../components/CTASection'
import { ArticleCard } from '../components/Cards'
import { LIFE_ARTICLES, NEWS, STORY_STATS, STORIES } from '../data/content'
import { ROUTES } from '../lib/site'

export default function Home() {
  return (
    <>
      {/* 首屏：视频 + 标题 + 品牌跑马灯 */}
      <div className="relative h-screen flex flex-col overflow-hidden">
        <HeroSection />
      </div>

      <InfoSection />
      <BackedBySection />
      <UseCasesSection />

      {/* 数据模块 */}
      <Section>
        <SectionHeading
          eyebrow="我们的进展"
          title="陪伴，是一件可以被衡量的事"
          subtitle="以下为示例数据，仅用于站点演示，上线前请替换为真实统计。"
        />
        <StatGrid items={STORY_STATS} />
      </Section>

      {/* 内容入口：故事 / 生活 / 新闻 */}
      <Section>
        <SectionHeading
          eyebrow="继续读下去"
          title="从故事、生活与动态开始"
          subtitle="不了解我们也没关系，挑一篇读起来。"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ArticleCard
            to={`${ROUTES.story}/${STORIES[0].slug}`}
            title={STORIES[0].title}
            summary={STORIES[0].subtitle}
            category={STORIES[0].category}
            meta={STORIES[0].meta}
            tone={STORIES[0].tone}
            delay={0}
          />
          <ArticleCard
            to={`${ROUTES.life}/${LIFE_ARTICLES[0].slug}`}
            title={LIFE_ARTICLES[0].title}
            summary={LIFE_ARTICLES[0].subtitle}
            category={LIFE_ARTICLES[0].category}
            meta={LIFE_ARTICLES[0].meta}
            tone={LIFE_ARTICLES[0].tone}
            delay={80}
          />
          <ArticleCard
            to={`${ROUTES.news}/${NEWS[0].slug}`}
            title={NEWS[0].title}
            summary={NEWS[0].subtitle}
            category={NEWS[0].category}
            meta={NEWS[0].meta}
            tone={NEWS[0].tone}
            delay={160}
          />
        </div>
      </Section>

      {/* 首页底部 CTA */}
      <Reveal>
        <CTASection
          title="很多事情，现在开始，也未晚。"
          desc="留下联系方式，我们会把新的内容、产品与线下活动第一时间告诉你。"
          primary={{ label: '找到未晚', to: ROUTES.find }}
          secondary={{ label: '了解未晚', to: ROUTES.story }}
        />
      </Reveal>
    </>
  )
}
