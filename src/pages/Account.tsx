import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { ROUTES } from '../lib/site'

type Mode = 'login' | 'register'

/** 登录 / 注册（示例表单，未接入后端） */
export default function Account() {
  const [mode, setMode] = useState<Mode>('login')

  return (
    <>
      <PageHero
        eyebrow="会员中心"
        title={mode === 'login' ? '登录' : '注册'}
        subtitle={
          mode === 'login'
            ? '登录后可以查看你的状态记录、订单与预约。'
            : '注册后即可使用状态自测、内容收藏与线下预约。'
        }
      />

      <Section>
        <Reveal>
          <div className="max-w-md rounded-3xl bg-white/70 p-7 md:p-10">
            {/* 模式切换 */}
            <div className="flex gap-2 rounded-full bg-black/5 p-1">
              {(
                [
                  { key: 'login', label: '登录' },
                  { key: 'register', label: '注册' },
                ] as { key: Mode; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setMode(tab.key)}
                  className={[
                    'flex-1 rounded-full py-2 text-sm font-medium transition-colors duration-200 ease-brand',
                    mode === tab.key
                      ? 'bg-black text-white'
                      : 'text-black/60 hover:text-black',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              {mode === 'register' && (
                <label className="block">
                  <span className="text-black/60 text-sm">称呼</span>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
                    placeholder="如何称呼你"
                  />
                </label>
              )}

              <label className="block">
                <span className="text-black/60 text-sm">手机号</span>
                <input
                  type="tel"
                  className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="请输入手机号"
                />
              </label>

              <label className="block">
                <span className="text-black/60 text-sm">
                  {mode === 'login' ? '密码' : '设置密码'}
                </span>
                <input
                  type="password"
                  className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="至少 8 位"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-black text-white text-base font-medium py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 ease-brand"
              >
                {mode === 'login' ? '登录' : '注册并登录'}
              </button>
            </form>

            <p className="mt-5 text-black/40 text-xs leading-relaxed">
              {mode === 'login' ? '继续' : '注册'}即表示你已阅读并同意
              <Link to={ROUTES.terms} className="mx-1 text-black/70 hover:text-black underline">
                《用户协议》
              </Link>
              与
              <Link to={ROUTES.privacy} className="mx-1 text-black/70 hover:text-black underline">
                《隐私政策》
              </Link>
              。本页为演示示例，尚未接入后端服务。
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
