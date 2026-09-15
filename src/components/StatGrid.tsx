import Reveal from './Reveal'

export type Stat = {
  value: string
  label: string
  unit?: string
}

/** 数据模块：四栏数字墙，用于各内页的数据展示 */
export default function StatGrid({ items }: { items: Stat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <Reveal key={item.label} delay={index * 80}>
          <div className="h-full rounded-2xl bg-white/70 px-6 py-7">
            <p
              className="text-black text-3xl md:text-4xl font-medium leading-none"
              style={{ letterSpacing: '-0.03em' }}
            >
              {item.value}
              {item.unit && <span className="text-lg ml-1 text-black/50">{item.unit}</span>}
            </p>
            <p className="mt-3 text-black/60 text-sm leading-relaxed">{item.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
