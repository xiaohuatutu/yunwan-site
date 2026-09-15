import { useLocation, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import CTASection from '../components/CTASection'
import GradientImage from '../components/GradientImage'
import Reveal from '../components/Reveal'
import { ArticleCard, PointCard } from '../components/Cards'
import NotFound from './NotFound'
import { LIFE_ARTICLES, NEWS, STORIES, type Article } from '../data/content'
import { ROUTES } from '../lib/site'

/** 按路径前缀选择数据源：故事 / 生活 / 新闻共用同一套详情页版式 */
function useCollection(): { items: Article[]; base: string; label: string } | null {
  const { pathname } = useLocation()

  if (pathname.startsWith('/story/')) return { items: STORIES, base: ROUTES.story, label: '未晚故事' }
  if (pathname.startsWith('/life/')) return { items: LIFE_ARTICLES, base: ROUTES.life, label: '未晚生活' }
  if (pathname.startsWith('/news/')) return { items: NEWS, base: ROUTES.news, label: '新闻动态' }
  return null
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const collection = useCollection()

  const item = collection?.items.find((a) => a.slug === slug)

  if (!collection || !item) return <NotFound />

  const others = collection.items.filter((a) => a.slug !== item.slug)

  return (
    <>
      <PageHero
        eyebrow={item.category}
        title={item.title}
        subtitle={item.subtitle}
        meta={item.meta}
      />

      {/* 主视觉 */}
      <Section padded={false}>
        <Reveal>
          <GradientImage tone={item.tone} ratio="16/9" />
        </Reveal>
      </Section>

      {/* 正文 */}
      <Section>
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-black text-lg md:text-xl leading-relaxed">{item.lead}</p>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8 space-y-5">
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-black/70 text-base md:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 要点 */}
      <Section>
        <SectionHeading eyebrow="要点" title="这篇讲的几件事" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {item.points.map((point, index) => (
            <PointCard key={point.title} title={point.title} desc={point.desc} delay={index * 80} />
          ))}
        </div>
      </Section>

      {/* 相关阅读 */}
      {others.length > 0 && (
        <Section>
          <SectionHeading eyebrow="继续阅读" title={`更多${collection.label}`} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {others.map((other, index) => (
              <ArticleCard
                key={other.slug}
                to={`${collection.base}/${other.slug}`}
                title={other.title}
                summary={other.subtitle}
                category={other.category}
                meta={other.meta}
                tone={other.tone}
                delay={index * 80}
              />
            ))}
          </div>
        </Section>
      )}

      <CTASection
        title="想继续了解未晚？"
        desc="从产品、生活方式，或者一次线下见面开始。"
        primary={{ label: '未晚产品', to: ROUTES.products }}
        secondary={{ label: '返回' + collection.label, to: collection.base }}
      />
    </>
  )
}
