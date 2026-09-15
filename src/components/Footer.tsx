
import { Link } from 'react-router-dom'
import {
  FOOTER_FEATURE_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_SECTION_LINKS,
} from '../lib/site'

/* ============================================================
 * 占位信息 —— 上线前请统一替换为真实内容
 * TODO(替换点)：以下 6 个字段全部为占位值
 * ============================================================ */

/** 公司主体信息 */
const COMPANY = {
  /** 公司主体全称（同时用于版权声明） */
  name: 'XXXXX',
  /** 客服电话 */
  phone: '400-000-0000',
  /** 联系邮箱 */
  email: 'hello@yundou-evernow.com',
  /** 办公地址 */
  address: '重庆市渝中区解放碑街道民权路 1 号',
  /** ICP 备案号 */
  icpNumber: 'XXXXX',
}

/** 工信部 ICP/IP 地址/域名信息备案管理系统（备案号跳转目标，固定不变） */
const ICP_QUERY_URL = 'https://beian.miit.gov.cn/'

/** 版权起始年份；结束年份取当前年份，同年只显示一个 */
const COPYRIGHT_START_YEAR = 2026

const currentYear = new Date().getFullYear()
const yearText =
  COPYRIGHT_START_YEAR === currentYear
    ? String(currentYear)
    : `${COPYRIGHT_START_YEAR}–${currentYear}`

/* 无边框/底色区分，层次全靠透明度分级：链接 70% > 主体名 80% > 联系信息 50% > 版权 40% */
const linkBase =
  'text-black/70 hover:text-black transition-colors duration-200 whitespace-nowrap'

/**
 * 粘性页脚（sticky footer）
 *
 * 不使用固定定位 —— 它会脱离文档流并遮挡正文。
 * 改由外层容器 `min-h-screen + flex flex-col` + 正文区 `flex-1` 撑开：
 * 内容不足一屏时，flex-1 把剩余空间吃掉，页脚被推到视口底部；
 * 内容超长时页脚自然跟在内容末尾。
 */
export default function Footer() {
  return (
    <footer className="relative w-full shrink-0 bg-transparent">
      {/* 背景与页面完全一致（透明继承 --background），无边框/阴影/渐变；
          与上方内容的边界靠留白 + 文字层级区分 */}
      <div className="max-w-[88rem] mx-auto px-6 pt-10 md:pt-14 pb-8 md:pb-10">
        {/* ---------- 顶部：栏目速览 ---------- */}
        <nav aria-label="栏目速览">
          <h2
            className="text-black/40 text-[11px] font-medium mb-3 md:mb-4"
            style={{ letterSpacing: '0.14em' }}
          >
            栏目速览
          </h2>

          {/* 窄屏单列堆叠；md 起两组并排；lg 起拉开间距 */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8 lg:flex lg:gap-14">
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
              {FOOTER_SECTION_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={`${linkBase} text-sm`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
              {FOOTER_FEATURE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={`${linkBase} text-sm`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ---------- 下方：合规与信息区（与上一段用留白分隔，不用分隔线） ---------- */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
          <div className="text-black/50 text-xs leading-relaxed">
            <p className="text-black/80 text-[13px] font-medium">{COMPANY.name}</p>
            <p className="mt-1">
              <span>电话 {COMPANY.phone}</span>
              <span className="mx-2 text-black/20">|</span>
              <span>邮箱 {COMPANY.email}</span>
              <span className="mx-2 text-black/20">|</span>
              <span>{COMPANY.address}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <a
              href={ICP_QUERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkBase}
            >
              {COMPANY.icpNumber}
            </a>

            {FOOTER_LEGAL_LINKS.map((item) => (
              <Link key={item.label} to={item.to} className={linkBase}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ---------- 版权声明 ---------- */}
        <p className="mt-4 md:mt-5 text-black/40 text-xs">
          © {yearText} {COMPANY.name} 保留所有权利。
        </p>
      </div>
    </footer>
  )
}
