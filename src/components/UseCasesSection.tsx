import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '../lib/site'

const USE_CASES_IMAGE = '/usecase-sleep-scene.jpg'

export default function UseCasesSection() {
  return (
    <section className="bg-[var(--background)] px-6 py-24">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:pr-12 md:pt-2">
          <p className="text-black/60 text-sm mb-2">守护你的</p>
          <h2
            className="text-black text-[1.5rem] md:text-[1.875rem] font-medium leading-none mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            未晚产品
          </h2>
          <div className="text-black/60 text-base leading-relaxed max-w-sm">
            <span className="block">以东方食养智慧，</span>
            <span className="block">守护每一个需要被照顾的夜晚</span>

            <span className="mt-4 block">
              我们相信，真正的关照不需要惊天动地。一瓶睡前的浓萃饮、一袋清晨的清润丸、峨眉山下一间安静的小院——雲窦未晚想做的，只是在你终于想起自己的那一刻，刚好在这里。
            </span>

            <span
              className="mt-4 block"
              style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
            >
              NURTURE YOURSELF, IT'S NEVER TOO LATE
            </span>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden min-h-[720px]">
          <img
            className="object-cover absolute inset-0 w-full h-full"
            src={USE_CASES_IMAGE}
            alt="雲窦未晚熟龄睡眠饮放在卧室木质床头柜上，旁边是暖光台灯与一杯清水，营造睡前场景"
          />

          {/* 白色渐变蒙版：原图为夜景，直接压黑字对比度仅约 4:1，加蒙版后 >7:1 */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.55) 32%, rgba(255,255,255,0.12) 62%, rgba(255,255,255,0) 85%)',
            }}
          />

          <div className="relative z-10 p-10 md:p-12">
            <h3
              className="text-black text-4xl md:text-5xl font-medium leading-tight mb-5"
              style={{ letterSpacing: '-0.03em' }}
            >
              未晚系列
            </h3>
            <p className="text-black/70 text-base max-w-md mb-8">为这样的时刻而设计。</p>
            <Link
              to={ROUTES.products}
              className="group inline-flex items-center gap-3 text-black text-base font-medium whitespace-nowrap"
            >
              <span className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors duration-200">
                <ArrowRight className="w-4 h-4 text-black" />
              </span>
              了解未晚
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
