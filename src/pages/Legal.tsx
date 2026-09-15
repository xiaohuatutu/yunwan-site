import { useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { LEGAL_PAGES } from '../data/content'
import { ROUTES } from '../lib/site'
import NotFound from './NotFound'

/** 隐私政策 / 用户协议 共用版式，内容来自 data/content.ts */
export default function Legal() {
  const { pathname } = useLocation()

  const key = pathname.startsWith(ROUTES.terms) ? 'terms' : 'privacy'
  const page = LEGAL_PAGES[key]

  if (!page) return <NotFound />

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />

      <Section>
        <div className="max-w-2xl">
          <p className="text-black/40 text-xs">最近更新：{page.updated}</p>

          {page.sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 60}>
              <div className="mt-10">
                <h2
                  className="text-black text-2xl font-medium leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-black/70 text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <p className="mt-12 text-black/40 text-xs leading-relaxed">
            本页文本为站点演示示例，正式上线前请交由法务审阅后替换。
          </p>
        </div>
      </Section>
    </>
  )
}
