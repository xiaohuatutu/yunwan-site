import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { NAV_LINKS, ROUTES } from '../lib/site'

export default function NotFound() {
  return (
    <section className="px-6 pt-40 pb-32">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-black/40 text-sm" style={{ letterSpacing: '0.14em' }}>
          404
        </p>

        <h1
          className="mt-4 text-black text-4xl md:text-6xl font-medium leading-tight max-w-2xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          这个页面还没有准备好
        </h1>

        <p className="mt-6 text-black/60 text-base leading-relaxed max-w-md">
          你访问的地址可能已经调整。可以从下面的栏目继续，或者回到首页。
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={ROUTES.home}
            className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-7 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 ease-brand"
          >
            回到首页
            <span className="bg-white rounded-full p-2">
              <ArrowRight className="w-4 h-4 text-black" />
            </span>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-black/60 text-sm hover:text-black transition-colors duration-200 ease-brand"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
