import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Story from './pages/Story'
import Status from './pages/Status'
import StatusDetail from './pages/StatusDetail'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Life from './pages/Life'
import News from './pages/News'
import ArticleDetail from './pages/ArticleDetail'
import Find from './pages/Find'
import Partner from './pages/Partner'
import Account from './pages/Account'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import { ROUTES } from './lib/site'

/**
 * 路由表
 *
 * 所有内页均在 Layout 之下渲染（吸顶导航 + 粘性页脚）。
 * 路径统一取自 lib/site.ts，新增栏目时改配置即可。
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<Home />} />

          <Route path={ROUTES.story} element={<Story />} />
          <Route path="/story/:slug" element={<ArticleDetail />} />

          <Route path={ROUTES.status} element={<Status />} />
          <Route path="/status/:slug" element={<StatusDetail />} />

          <Route path={ROUTES.products} element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />

          <Route path={ROUTES.life} element={<Life />} />
          <Route path="/life/:slug" element={<ArticleDetail />} />

          <Route path={ROUTES.news} element={<News />} />
          <Route path="/news/:slug" element={<ArticleDetail />} />

          <Route path={ROUTES.find} element={<Find />} />
          <Route path={ROUTES.partner} element={<Partner />} />
          <Route path={ROUTES.account} element={<Account />} />

          <Route path={ROUTES.privacy} element={<Legal />} />
          <Route path={ROUTES.terms} element={<Legal />} />

          {/* 未匹配的地址 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
