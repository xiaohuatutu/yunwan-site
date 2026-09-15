# 雲窦未晚 · 站点页面清单与链接关系表

生成时间：2026-09-14　|　技术栈：React + TypeScript + Vite + Tailwind + react-router-dom

---

## 一、页面清单

| # | 路由 | 页面组件 | 页面名称 | 主要内容模块 |
|---|---|---|---|---|
| 1 | `/` | `pages/Home.tsx` | 首页 | Hero 视频首屏、四种状态卡、陪伴方式跑马灯、未晚产品视频卡、数据模块、内容入口、底部 CTA |
| 2 | `/story` | `pages/Story.tsx` | 未晚故事（关于我们） | 品牌导语、主视觉、数据模块（4 项）、故事列表、做事三原则、CTA |
| 3 | `/story/:slug` | `pages/ArticleDetail.tsx` | 故事详情 ×3 | 导语、正文、要点三卡、相关阅读、CTA |
| 4 | `/status` | `pages/Status.tsx` | 女性状态 | 数据模块、四种状态列表、**状态自测（#check 锚点）**、CTA |
| 5 | `/status/:slug` | `pages/StatusDetail.tsx` | 状态详情 ×4 | 正文、可能与什么有关、可以试试这样、相关产品、其他状态、CTA |
| 6 | `/products` | `pages/Products.tsx` | 未晚产品 | 产品四卡、配方三原则、CTA |
| 7 | `/products/:slug` | `pages/ProductDetail.tsx` | 产品详情 ×4 | 三大亮点、规格表、主要原料、使用建议、FAQ、其他产品、CTA |
| 8 | `/life` | `pages/Life.tsx` | 未晚生活 | 生活指南四卡、CTA |
| 9 | `/life/:slug` | `pages/ArticleDetail.tsx` | 生活详情 ×4 | 同故事详情版式 |
| 10 | `/news` | `pages/News.tsx` | 新闻动态 | 动态列表、CTA |
| 11 | `/news/:slug` | `pages/ArticleDetail.tsx` | 动态详情 ×3 | 同故事详情版式 |
| 12 | `/find` | `pages/Find.tsx` | 找到未晚（联系我们） | 三个地点、四种联系方式、预约表单、CTA |
| 13 | `/partner` | `pages/Partner.tsx` | 与我们合作 | 三种合作模式、四步流程、合作意向表单、CTA |
| 14 | `/account` | `pages/Account.tsx` | 登录 / 注册 | 登录/注册切换、表单、法务链接 |
| 15 | `/legal/privacy` | `pages/Legal.tsx` | 隐私政策 | 五个章节 |
| 16 | `/legal/terms` | `pages/Legal.tsx` | 用户协议 | 五个章节 |
| 17 | `*` | `pages/NotFound.tsx` | 404 | 提示 + 返回首页 + 全部栏目入口 |

**合计 17 个路由 / 26 个实际页面地址**（含 14 个详情子页）。

### 详情子页 slug 清单

| 栏目 | slug |
|---|---|
| 未晚故事 | `why-we-start`、`emin-courtyard`、`how-we-make` |
| 女性状态 | `sleep`、`heat`、`emotion`、`body` |
| 未晚产品 | `sleep-drink`、`qingrun-pill`、`calm-tea`、`bone-powder` |
| 未晚生活 | `sleep-routine`、`move-daily`、`eat-with-season`、`quiet-reading` |
| 新闻动态 | `spring-courtyard-open`、`sleep-drink-batch`、`partner-program` |

---

## 二、链接关系表（双向可达核对）

### 2.1 导航区（全站吸顶，`components/Navbar.tsx`）

| 链接文案 | 目标路由 | 目标页存在 | 反向回首页 |
|---|---|---|---|
| LOGO | `/` | ✅ | — |
| 首页 | `/` | ✅ | — |
| 未晚故事 | `/story` | ✅ | ✅ 面包屑 + LOGO |
| 女性状态 | `/status` | ✅ | ✅ |
| 未晚产品 | `/products` | ✅ | ✅ |
| 未晚生活 | `/life` | ✅ | ✅ |
| 找到未晚 | `/find` | ✅ | ✅ |
| 与我们合作 | `/partner` | ✅ | ✅ |
| 登录 / 注册 | `/account` | ✅ | ✅ |

移动端：同一组链接进入折叠抽屉（`/story` … `/partner`），路由变化自动收起。

### 2.2 首页 CTA 与卡片

| 位置 | 链接文案 | 目标 |
|---|---|---|
| Hero 胶囊按钮 | 未晚故事 | `/story` |
| 信息区块按钮 | 我的状态 | `/status#check` |
| 症状卡 1 总是睡不好 | 整卡 | `/status/sleep` |
| 症状卡 2 身体忽然很热 | 整卡 | `/status/heat` |
| 症状卡 3 情绪不像以前的自己 | 整卡 | `/status/emotion` |
| 症状卡 4 身体好像正在改变 | 整卡 | `/status/body` |
| 陪伴卡 产品支持 | 整卡 | `/products` |
| 陪伴卡 专业内容 | 整卡 | `/life` |
| 陪伴卡 生活方式 | 整卡 | `/life` |
| 陪伴卡 女性连接 | 整卡 | `/story` |
| 使用场景卡 | 了解未晚 | `/products` |
| 首页内容入口 ×3 | 整卡 | `/story/why-we-start`、`/life/sleep-routine`、`/news/spring-courtyard-open` |
| 首页底部 CTA | 找到未晚 / 了解未晚 | `/find`、`/story` |

### 2.3 页脚（`components/Footer.tsx`）

| 分组 | 链接 | 目标 |
|---|---|---|
| 栏目速览 | 未晚故事 / 女性状态 / 未晚产品 / 未晚生活 / 找到未晚 / 与我们合作 / 新闻动态 | `/story`、`/status`、`/products`、`/life`、`/find`、`/partner`、`/news` |
| 功能入口 | 我的状态 | `/status#check` |
| 功能入口 | 登录 / 注册 | `/account` |
| 功能入口 | 了解未晚 | `/story` |
| 法务 | 隐私政策 | `/legal/privacy` |
| 法务 | 用户协议 | `/legal/terms` |
| 合规 | ICP 备案号 | `https://beian.miit.gov.cn/`（外链，新窗口） |

### 2.4 内页之间的横向跳转

| 来源页 | 出口链接 |
|---|---|
| 未晚故事 | 3 篇故事详情、未晚产品、找到未晚 |
| 故事详情 | 其他 2 篇故事、未晚产品、返回列表 |
| 女性状态 | 4 个状态详情、找到未晚、未晚产品、预约状态交流 |
| 状态详情 | 相关产品详情、其他 3 个状态、状态自测 `/status#check`、未晚生活 |
| 未晚产品 | 4 个产品详情、状态自测、找到未晚 |
| 产品详情 | 其他 3 个产品、找到未晚、未晚生活 |
| 未晚生活 | 4 篇生活详情、找到未晚、未晚故事 |
| 生活详情 | 其他 3 篇、未晚产品、返回列表 |
| 新闻动态 | 3 篇动态详情、找到未晚、与我们合作 |
| 动态详情 | 其他 2 篇、未晚产品、返回列表 |
| 找到未晚 | 未晚故事、未晚生活 |
| 与我们合作 | 找到未晚、未晚故事 |
| 登录 / 注册 | 用户协议、隐私政策 |
| 404 | 首页 + 全部 7 个栏目 |

### 2.5 自动化校验

```
python scripts/check_links.py
```

扫描 `src/**/*.tsx` 的所有 `to=` 跳转 + `src/lib/site.ts` 的 ROUTES 配置 + `src/data/content.ts` 的 slug 数据，
与路由表逐一比对。当前结果：**30 个内部地址全部匹配，无死链**（脚本退出码 0）。

---

## 三、统一规范

### 3.1 动效规范

| 项 | 值 | 位置 |
|---|---|---|
| 缓动曲线 | `cubic-bezier(0.22, 0.61, 0.36, 1)` | `tailwind.config.js` → `ease-brand`；CSS 变量 `--ease-brand` |
| 时长 | 200ms（hover）/ 240ms（`duration-brand`）/ 640ms（滚动入场） | CSS 变量 `--dur-fast/base/slow` |
| 滚动入场 | 淡入 + 上移 20px，`IntersectionObserver` 触发，只动 `opacity`/`transform` | `components/Reveal.tsx` |
| 卡片 hover | `hover:-translate-y-1` + 背景提亮，240ms | `components/Cards.tsx`、信息区块卡片 |
| 按钮 hover | 背景色过渡 200ms | 全站按钮 |
| 导航吸顶 | 滚动 >8px 出现半透明背景与底部细线，200ms | `components/Navbar.tsx` |
| 移动端菜单 | `max-h`/`opacity` 过渡 300ms | `components/Navbar.tsx` |
| 无障碍 | `prefers-reduced-motion` 下全部动效关闭 | `src/index.css` |

### 3.2 图片与版式

- 占位图统一用渐变色块：`components/GradientImage.tsx`，7 种莫兰迪色调（`mist`/`dawn`/`moss`/`plum`/`sand`/`dusk`/`linen`）
- 比例统一为 `16/9`（主视觉）、`4/3`（列表卡）、`1/1`、`3/4`，`rounded-2xl`，光源方向统一左上
- 内容区最大宽度 `88rem`，与首页一致

### 3.3 布局

- 全站 `Layout = 吸顶导航 + <main class="flex-1"> + 粘性页脚`
- 内容不足一屏时页脚贴底，内容超长时自然跟随（`min-h-screen` + `flex-col` + `flex-1`）

---

## 四、上线前需替换的内容

| 类型 | 位置 | 说明 |
|---|---|---|
| 公司主体、电话、邮箱、地址、ICP 备案号 | `components/Footer.tsx` 顶部 `COMPANY` | 现为占位值，备案号需真实 |
| 全部示例数据与统计 | `data/content.ts` 中的 `STORY_STATS`、`STATUS_STATS` | 虚构数据，需替换 |
| 法务文本 | `data/content.ts` 中的 `LEGAL_PAGES` | 需法务审阅 |
| 表单提交 | `pages/Find.tsx`、`pages/Partner.tsx`、`pages/Account.tsx` | 仅前端提示，未接后端 |
| 真实图片 | 各列表卡 `image` 字段 | 当前全部为渐变占位 |
