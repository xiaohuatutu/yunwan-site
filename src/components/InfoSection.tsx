import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '../lib/site'
import { SYMPTOM_CARD_LINKS } from '../data/content'

const symptoms = [
  {
    title: '总是睡不好',
    body: ['夜里容易醒', '醒后难睡', '第二天没精神'],
    image: '/card-woman-window.jpg',
    to: SYMPTOM_CARD_LINKS['总是睡不好'],
  },
  {
    title: '身体忽然很热',
    body: ['突然觉得热', '容易出汗', '夜里也不安稳'],
    image: '/card-body-heat.jpg',
    to: SYMPTOM_CARD_LINKS['身体忽然很热'],
  },
  {
    title: '情绪不像以前的自己',
    body: ['容易烦', '情绪起伏', '有时只想一个人待着'],
    image: '/card-emotion.jpg',
    to: SYMPTOM_CARD_LINKS['情绪不像以前的自己'],
  },
  {
    title: '身体好像正在改变',
    body: ['精力', '体重', '骨骼', '代谢'],
    image: '/card-body-change.jpg',
    to: SYMPTOM_CARD_LINKS['身体好像正在改变'],
  },
]

export default function InfoSection() {
  return (
    <section className="bg-[var(--background)] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h2
              className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              最近的你，还好吗？
            </h2>
            <Link
              to="/status#check"
              className="whitespace-nowrap inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 ease-brand"
            >
              我的状态
              <span className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-black" />
              </span>
            </Link>
          </div>

          <p className="text-black/70 text-xl md:text-2xl leading-relaxed">
            身体进入新的阶段，不代表人生开始向下
            <br />
            孩子渐渐长大，生活角色正在变化，也许恰恰到了重新看见自己的时候。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {symptoms.map((item) => (
            <Link
              key={item.title}
              to={item.to ?? ROUTES.status}
              className="group relative block rounded-2xl overflow-hidden min-h-80 transition-transform duration-brand ease-brand hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
                style={
                  item.image
                    ? {
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : { backgroundColor: '#2B2644' }
                }
              />
              {/* 图片卡加暗色蒙版，保证白色标题可读 */}
              {item.image && <div className="absolute inset-0 bg-black/30" />}

              <div className="relative z-10 h-full p-7 flex flex-col justify-between">
                <h3
                  className="text-white text-2xl font-medium leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {item.title}
                </h3>

                {item.body && (
                  <p className="mt-4 text-white/80 text-base leading-relaxed">
                    {item.body.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
