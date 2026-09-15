/**
 * 站点链接配置 —— 导航 / 页脚 / 面包屑 / CTA 共用的唯一来源。
 * 改这里即可全站生效，避免各处硬编码路径造成死链。
 */

export type RouteKey =
  | 'home'
  | 'story'
  | 'status'
  | 'products'
  | 'life'
  | 'find'
  | 'partner'
  | 'news'
  | 'account'
  | 'privacy'
  | 'terms'

export const ROUTES: Record<RouteKey, string> = {
  home: '/',
  story: '/story',
  status: '/status',
  products: '/products',
  life: '/life',
  find: '/find',
  partner: '/partner',
  news: '/news',
  account: '/account',
  privacy: '/legal/privacy',
  terms: '/legal/terms',
}

/** 顶部主导航（与首页导航一致） */
export const NAV_LINKS: { label: string; to: string }[] = [
  { label: '首页', to: ROUTES.home },
  { label: '未晚故事', to: ROUTES.story },
  { label: '女性状态', to: ROUTES.status },
  { label: '未晚产品', to: ROUTES.products },
  { label: '未晚生活', to: ROUTES.life },
  { label: '找到未晚', to: ROUTES.find },
  { label: '与我们合作', to: ROUTES.partner },
]

/** 页脚「栏目速览」—— 主导航 + 新闻动态 */
export const FOOTER_SECTION_LINKS: { label: string; to: string }[] = [
  ...NAV_LINKS.slice(1),
  { label: '新闻动态', to: ROUTES.news },
]

/** 页脚「功能入口」 */
export const FOOTER_FEATURE_LINKS: { label: string; to: string }[] = [
  { label: '我的状态', to: '/status#check' },
  { label: '登录 / 注册', to: ROUTES.account },
  { label: '了解未晚', to: ROUTES.story },
]

/** 页脚法务链接 */
export const FOOTER_LEGAL_LINKS: { label: string; to: string }[] = [
  { label: '隐私政策', to: ROUTES.privacy },
  { label: '用户协议', to: ROUTES.terms },
]

/** 面包屑标题映射：按路径前缀匹配 */
export const BREADCRUMB_LABELS: { match: string; label: string; to?: string }[] = [
  { match: '/story', label: '未晚故事', to: ROUTES.story },
  { match: '/status', label: '女性状态', to: ROUTES.status },
  { match: '/products', label: '未晚产品', to: ROUTES.products },
  { match: '/life', label: '未晚生活', to: ROUTES.life },
  { match: '/find', label: '找到未晚', to: ROUTES.find },
  { match: '/partner', label: '与我们合作', to: ROUTES.partner },
  { match: '/news', label: '新闻动态', to: ROUTES.news },
  { match: '/account', label: '登录 / 注册', to: ROUTES.account },
  { match: '/legal/privacy', label: '隐私政策', to: ROUTES.privacy },
  { match: '/legal/terms', label: '用户协议', to: ROUTES.terms },
]
