import { Link } from 'react-router-dom'
import { SUPPORT_CARD_LINKS } from '../data/content'

const supports = [
  {
    title: '产品支持',
    body: '围绕这个阶段真实生活状态开发产品。',
    image: '/support-product.jpg',
    to: SUPPORT_CARD_LINKS['产品支持'],
  },
  {
    title: '专业内容',
    body: '把复杂的女性健康知识，变成听得懂、用得上的内容。',
    image: '/support-content.jpg',
    to: SUPPORT_CARD_LINKS['专业内容'],
  },
  {
    title: '生活方式',
    body: '睡眠、运动、饮食、放松、阅读、声音。',
    image: '/support-lifestyle.jpg',
    to: SUPPORT_CARD_LINKS['生活方式'],
  },
  {
    title: '女性连接',
    body: '真实女性故事、体验活动、会员活动，以及未来的线下空间。',
    image: '/support-connect.jpg',
    to: SUPPORT_CARD_LINKS['女性连接'],
  },
]

export default function BackedBySection() {
  return (
    <section className="bg-[var(--background)] px-6">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        <div>
          <h3
            className="text-black text-2xl font-medium leading-snug mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            我们怎样陪伴你
          </h3>
          <p className="text-black/70 text-base leading-relaxed">
            围绕这个阶段真实的生活状态，而不是一个需要被修复的问题。
          </p>
        </div>

        <div className="md:col-span-3 overflow-hidden">
          <style>{`
            @keyframes backers-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .backers-track {
              display: flex;
              width: max-content;
              animation: backers-marquee 30s linear infinite;
            }
          `}</style>
          <div className="backers-track py-2">
            {[...supports, ...supports].map((item, index) => (
              <Link
                key={`${item.title}-${index}`}
                to={item.to}
                className="group relative mr-4 shrink-0 overflow-hidden rounded-xl text-left transition-opacity duration-200 ease-brand hover:opacity-90"
                style={{ width: 320, height: 180 }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* 浅色蒙版保证黑字在图片上可读 */}
                <div className="absolute inset-0 bg-white/40" />

                <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                  <h4
                    className="text-black text-2xl font-medium leading-snug"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-black/70 text-base max-w-xs leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
