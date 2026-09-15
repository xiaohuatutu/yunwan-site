import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { BREADCRUMB_LABELS, ROUTES } from '../lib/site'

type BreadcrumbProps = {
  /** 当前页标题（末级，不生成链接） */
  current: string
}

/**
 * 面包屑：首页 / 一级栏目 / 当前页
 * 由 lib/site.ts 的 BREADCRUMB_LABELS 推导，新增栏目只需改配置。
 */
export default function Breadcrumb({ current }: BreadcrumbProps) {
  const { pathname } = useLocation()

  const matched = BREADCRUMB_LABELS.filter((item) => pathname.startsWith(item.match)).sort(
    (a, b) => b.match.length - a.match.length,
  )[0]

  const isDetail = matched ? pathname !== matched.match : false

  return (
    <nav aria-label="面包屑" className="text-xs text-black/50">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to={ROUTES.home} className="hover:text-black transition-colors duration-200">
            首页
          </Link>
        </li>

        {matched && (
          <>
            <ChevronRight className="w-3 h-3 text-black/30" aria-hidden />
            <li>
              {isDetail ? (
                <Link
                  to={matched.to ?? matched.match}
                  className="hover:text-black transition-colors duration-200"
                >
                  {matched.label}
                </Link>
              ) : (
                <span className="text-black/70">{matched.label}</span>
              )}
            </li>
          </>
        )}

        {isDetail && (
          <>
            <ChevronRight className="w-3 h-3 text-black/30" aria-hidden />
            <li className="text-black/70 max-w-[16rem] truncate" title={current}>
              {current}
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
