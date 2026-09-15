import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/** 路由切换后回到顶部；带锚点时滚动到对应位置 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return null
}

/**
 * 全站布局：吸顶导航 + 内容区 + 粘性页脚。
 * min-h-screen + flex-1 保证内容不足一屏时页脚贴底。
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]" style={{ minHeight: '100dvh' }}>
      <Navbar />
      <ScrollManager />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
