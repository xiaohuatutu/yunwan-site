import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

type CTASectionProps = {
  title: string
  desc?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}

/** 内页底部统一 CTA 区：保证每个内页都有继续往下走的入口 */
export default function CTASection({ title, desc, primary, secondary }: CTASectionProps) {
  return (
    <section className="px-6 pb-20 md:pb-28">
      <div className="max-w-[88rem] mx-auto">
        <Reveal>
          <div className="rounded-3xl bg-plum px-8 py-12 md:px-14 md:py-16">
            <h2
              className="text-white text-3xl md:text-4xl font-medium leading-snug max-w-2xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              {title}
            </h2>

            {desc && (
              <p className="mt-5 text-white/70 text-base leading-relaxed max-w-xl">{desc}</p>
            )}

            {(primary || secondary) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primary && (
                  <Link
                    to={primary.to}
                    className="inline-flex items-center gap-3 bg-white text-black text-base font-medium pl-7 pr-2 py-2 rounded-full hover:bg-white/85 transition-colors duration-200 ease-brand"
                  >
                    {primary.label}
                    <span className="bg-black rounded-full p-2">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </span>
                  </Link>
                )}

                {secondary && (
                  <Link
                    to={secondary.to}
                    className="inline-flex items-center gap-2 text-white text-base font-medium px-7 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors duration-200 ease-brand"
                  >
                    {secondary.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
