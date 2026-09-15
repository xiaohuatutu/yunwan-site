import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '../lib/site'

/**
 * Hero 背景视频。
 *
 * 随静态资源一起打包部署到 Cloudflare Workers（`public/hero.mp4`）——
 * 与站点同域、由 Cloudflare 全球 CDN 分发，不依赖任何第三方外链。
 *
 * 已弃用的外部地址（保留备查）：
 * https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/avideo%20preview/byzm6mnvgu.mp4
 */
const HERO_VIDEO = '/hero.mp4'

const brands = [
  {
    name: 'Stripe',
    style: {
      fontFamily: 'Georgia, serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: '15px',
    } as const,
  },
  {
    name: 'Coinbase',
    style: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 900,
      letterSpacing: '0.08em',
      fontSize: '13px',
      textTransform: 'uppercase',
    } as const,
  },
  {
    name: 'Uniswap',
    style: {
      fontFamily: "'Trebuchet MS', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.01em',
      fontSize: '15px',
      fontStyle: 'italic',
    } as const,
  },
  {
    name: 'Aave',
    style: {
      fontFamily: "'Courier New', monospace",
      fontWeight: 700,
      letterSpacing: '0.12em',
      fontSize: '13px',
      textTransform: 'uppercase',
    } as const,
  },
  {
    name: 'Compound',
    style: {
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      fontWeight: 400,
      letterSpacing: '-0.01em',
      fontSize: '16px',
    } as const,
  },
  {
    name: 'MakerDAO',
    style: {
      fontFamily: "Impact, 'Arial Narrow', sans-serif",
      fontWeight: 400,
      letterSpacing: '0.04em',
      fontSize: '14px',
    } as const,
  },
  {
    name: 'Chainlink',
    style: {
      fontFamily: 'Verdana, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      fontSize: '13px',
    } as const,
  },
]

function BrandMarquee() {
  return (
    <div className="mt-[296px] w-full max-w-md overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
      `}</style>
      <div className="marquee-track">
        {[...brands, ...brands].map((brand, index) => (
          <span
            key={`${brand.name}-${index}`}
            className="mx-7 shrink-0 text-black/60 whitespace-nowrap"
            style={brand.style}
          >
            {brand.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="flex-1 px-6 pt-20 pb-6 flex items-end">
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ height: 'calc(100vh - 96px)' }}
      >
        <video
          className="object-cover absolute inset-0 w-full h-full"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
          <h1
            className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            雲窦 | 未晚
            <br />
            <span className="mt-[10px] block text-2xl md:text-3xl">
              很多事情，现在开始，也未晚
            </span>
          </h1>

          <p
            className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
            style={{
              fontFamily:
                "'Inter', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            为人生新阶段的女性，提供产品、内容与生活方式陪伴。
          </p>

          <Link
            to={ROUTES.story}
            className="whitespace-nowrap inline-flex items-center gap-3 bg-black text-white text-base md:text-lg font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 ease-brand"
          >
            未晚故事
            <span className="bg-white rounded-full p-2">
              <ArrowRight className="w-5 h-5 text-black" />
            </span>
          </Link>

          <BrandMarquee />
        </div>
      </div>
    </section>
  )
}
