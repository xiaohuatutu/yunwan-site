import { useState } from 'react'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import GradientImage from '../components/GradientImage'
import { PARTNER_INTRO, PARTNER_MODELS, PARTNER_PROCESS } from '../data/content'
import { ROUTES } from '../lib/site'

function PartnerForm() {
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
          <span className="text-black/60 text-sm">机构 / 公司名称</span>
          <input
            type="text"
            required
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="请填写全称"
          />
        </label>

        <label className="block">
          <span className="text-black/60 text-sm">联系人与职务</span>
          <input
            type="text"
            required
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="如 李女士 · 市场负责人"
          />
        </label>

        <label className="block">
          <span className="text-black/60 text-sm">联系邮箱</span>
          <input
            type="email"
            required
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="name@company.com"
          />
        </label>

        <label className="block">
          <span className="text-black/60 text-sm">合作方向</span>
          <select className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10">
            {PARTNER_MODELS.map((model) => (
              <option key={model.title}>{model.title}</option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="text-black/60 text-sm">补充说明</span>
          <textarea
            rows={4}
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="简单介绍机构背景与期望的合作形式"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex items-center gap-3 bg-black text-white text-base font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 ease-brand"
      >
        {sent ? '已提交，5 个工作日内回复' : '提交合作意向'}
      </button>

      <p className="mt-4 text-black/40 text-xs">
        提交即表示同意《隐私政策》。该表单为演示示例，尚未接入后端服务。
      </p>
    </form>
  )
}

export default function Partner() {
  return (
    <>
      <PageHero
        eyebrow={PARTNER_INTRO.eyebrow}
        title={PARTNER_INTRO.title}
        subtitle={PARTNER_INTRO.subtitle}
      />

      {/* 三种合作模式 */}
      <Section>
        <SectionHeading eyebrow="合作模式" title="三种可以一起做的事" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PARTNER_MODELS.map((model, index) => (
            <Reveal key={model.title} delay={index * 80}>
              <div className="h-full rounded-2xl bg-white/70 overflow-hidden">
                <GradientImage tone={model.tone} ratio="4/3" className="rounded-none" />
                <div className="p-6 md:p-7">
                  <h3
                    className="text-black text-xl font-medium"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {model.title}
                  </h3>
                  <p className="mt-3 text-black/60 text-sm leading-relaxed">{model.desc}</p>

                  <ul className="mt-5 space-y-2">
                    {model.items.map((entry) => (
                      <li key={entry} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/30 shrink-0" />
                        <span className="text-black/60 text-sm leading-relaxed">{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 合作流程 */}
      <Section>
        <SectionHeading eyebrow="流程" title="从提交到启动" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PARTNER_PROCESS.map((step, index) => (
            <Reveal key={step.step} delay={index * 80}>
              <div className="h-full rounded-2xl bg-white/70 p-7">
                <p className="text-black/30 text-sm">{step.step}</p>
                <h3 className="mt-2 text-black text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-black/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 表单 */}
      <Section>
        <SectionHeading
          eyebrow="提交意向"
          title="说说你想怎么做"
          subtitle="我们会在 5 个工作日内安排一次 30 分钟的线上沟通。"
        />
        <Reveal>
          <PartnerForm />
        </Reveal>
      </Section>

      <CTASection
        title="如果只是想先聊聊"
        desc="也可以通过客服电话或合作邮箱直接找到我们。"
        primary={{ label: '找到未晚', to: ROUTES.find }}
        secondary={{ label: '未晚故事', to: ROUTES.story }}
      />
    </>
  )
}
