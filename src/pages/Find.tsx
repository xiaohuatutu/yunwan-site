import { useState } from 'react'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import GradientImage from '../components/GradientImage'
import { CONTACT_CHANNELS, FIND_INTRO, PLACES } from '../data/content'
import { ROUTES } from '../lib/site'

/** 预约表单（示例，提交仅做前端提示） */
function ContactForm() {
  const [sent, setSent] = useState(false)

  return (
    <form
      className="rounded-3xl bg-white/70 p-7 md:p-10"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-black/60 text-sm">称呼</span>
          <input
            type="text"
            required
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="如何称呼你"
          />
        </label>

        <label className="block">
          <span className="text-black/60 text-sm">手机号</span>
          <input
            type="tel"
            required
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="用于回电"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-black/60 text-sm">想去的地点</span>
          <select className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10">
            {PLACES.map((place) => (
              <option key={place.name}>{place.name}</option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="text-black/60 text-sm">想说的话</span>
          <textarea
            rows={4}
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="可以简单描述你的状态或想了解的内容"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex items-center gap-3 bg-black text-white text-base font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 ease-brand"
      >
        {sent ? '已提交，我们会尽快联系你' : '提交预约'}
      </button>

      <p className="mt-4 text-black/40 text-xs">
        提交即表示同意《隐私政策》。该表单为演示示例，尚未接入后端服务。
      </p>
    </form>
  )
}

export default function Find() {
  return (
    <>
      <PageHero
        eyebrow={FIND_INTRO.eyebrow}
        title={FIND_INTRO.title}
        subtitle={FIND_INTRO.subtitle}
      />

      {/* 地点列表 */}
      <Section>
        <SectionHeading eyebrow="线下与合作渠道" title="三个可以去的地方" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLACES.map((place, index) => (
            <Reveal key={place.name} delay={index * 80}>
              <div className="h-full rounded-2xl bg-white/70 overflow-hidden">
                <GradientImage tone={place.tone} ratio="4/3" className="rounded-none" />
                <div className="p-6">
                  <p className="text-black/40 text-xs">{place.type}</p>
                  <h3
                    className="mt-2 text-black text-xl font-medium"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {place.name}
                  </h3>
                  <p className="mt-3 text-black/60 text-sm leading-relaxed">{place.address}</p>
                  <p className="mt-2 text-black/60 text-sm">{place.hours}</p>
                  <p className="mt-3 text-black/40 text-xs leading-relaxed">{place.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 联系方式 */}
      <Section>
        <SectionHeading eyebrow="联系我们" title="也可以直接找到我们" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_CHANNELS.map((channel, index) => (
            <Reveal key={channel.label} delay={index * 60}>
              <div className="h-full rounded-2xl bg-white/70 p-6">
                <p className="text-black/40 text-xs">{channel.label}</p>
                <p className="mt-2 text-black text-base font-medium break-all">{channel.value}</p>
                <p className="mt-2 text-black/50 text-xs">{channel.hint}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 预约表单 */}
      <Section>
        <SectionHeading
          eyebrow="预约"
          title="留个方式，我们来联系你"
          subtitle="提交后 5 个工作日内回复，不会用于任何营销用途。"
        />
        <Reveal>
          <ContactForm />
        </Reveal>
      </Section>

      <CTASection
        title="也可以先在内容里逛逛"
        desc="不用急着决定，先看看我们的故事与生活方式内容。"
        primary={{ label: '未晚故事', to: ROUTES.story }}
        secondary={{ label: '未晚生活', to: ROUTES.life }}
      />
    </>
  )
}
