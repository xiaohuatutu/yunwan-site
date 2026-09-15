import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { NAV_LINKS, ROUTES } from '../lib/site'

/**
 * 全局导航（吸顶）
 *
 * - fixed 定位，始终可见；滚动超过 8px 后加背景与细线，保证压在内容上仍可读
 * - 当前栏目高亮；移动端折叠为抽屉菜单，切换路由后自动收起
 * - 所有链接来自 lib/site.ts，不存在占位 href
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 路由变化后收起移动端菜单
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 px-6 py-5',
        'transition-colors duration-200 ease-brand',
        scrolled || menuOpen
          ? 'bg-[var(--background)]/85 backdrop-blur-md border-b border-black/5'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="max-w-[88rem] mx-auto flex items-center justify-between gap-4">
        <Link to={ROUTES.home} aria-label="雲窦未晚 首页">
          <BrandLogo className="h-12 w-auto text-black" />
        </Link>

        {/* 桌面端栏目 */}
        <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.home}
              className={({ isActive }) =>
                [
                  'whitespace-nowrap text-sm font-medium transition-colors duration-200 ease-brand',
                  isActive ? 'text-black' : 'text-black/60 hover:text-black',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.account}
            className="whitespace-nowrap bg-black text-white text-sm md:text-base font-medium px-6 md:px-7 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 ease-brand"
          >
            登录 / 注册
          </Link>

          {/* 移动端菜单开关 */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-black/5 transition-colors duration-200 ease-brand"
          >
            {menuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
          </button>
        </div>
      </div>

      {/* 移动端抽屉 */}
      <div
        id="mobile-menu"
        className={[
          'lg:hidden overflow-hidden transition-all duration-300 ease-brand',
          menuOpen ? 'max-h-[32rem] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0',
        ].join(' ')}
      >
        <ul className="flex flex-col divide-y divide-black/5">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === ROUTES.home}
                className={({ isActive }) =>
                  [
                    'block py-3 text-base font-medium transition-colors duration-200 ease-brand',
                    isActive ? 'text-black' : 'text-black/60 hover:text-black',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
