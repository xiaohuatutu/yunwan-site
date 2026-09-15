"""将参考 PNG 矢量化为 SVG。

思路：按 alpha/亮度建掩码 -> LANCZOS 放大(亚像素精度) -> marching squares 提取轮廓
      -> 串接成闭合多边形 -> RDP 简化 -> 输出 evenodd 填充的 SVG。
纯 numpy + Pillow，不依赖 opencv。
"""
from collections import defaultdict

import numpy as np
from PIL import Image

SRC = r'D:\恩纳嘉\雲窦UI\LOGO.png'
OUT_SVG = r'C:\Users\Administrator\WorkBuddy\2026-09-08-13-04-57\halo-landing\public\brand-logo.svg'
OUT_TS = r'C:\Users\Administrator\WorkBuddy\2026-09-08-13-04-57\halo-landing\src\brandLogoPath.ts'

SCALE = 3        # 放大倍数（提升轮廓平滑度）
EPS = 0.15       # RDP 简化阈值（单位=原始像素）；参数扫描后最优 IoU=0.9312
MIN_AREA = 8.0   # 丢弃面积小于此值（原始像素²）的噪声轮廓
PAD = 2          # 裁剪墨迹包围盒时保留的外扩像素（避免切到抗锯齿边缘）


def otsu(g: np.ndarray) -> int:
    """Otsu 自适应阈值。"""
    hist, _ = np.histogram(g.ravel(), bins=256, range=(0, 256))
    total = int(hist.sum())
    sum_all = float((np.arange(256) * hist).sum())
    sum_b, w_b, best, thr = 0.0, 0, -1.0, 128
    for t in range(256):
        w_b += int(hist[t])
        if w_b == 0:
            continue
        w_f = total - w_b
        if w_f == 0:
            break
        sum_b += t * int(hist[t])
        m_b = sum_b / w_b
        m_f = (sum_all - sum_b) / w_f
        v = w_b * w_f * (m_b - m_f) ** 2
        if v > best:
            best, thr = v, t
    return thr


def build_mask(path: str) -> np.ndarray:
    """透明底用 alpha，浅底深字用亮度 + Otsu。"""
    img = Image.open(path).convert('RGBA')
    arr = np.array(img)
    a = arr[:, :, 3]
    if a.min() < 250:
        return a > 128
    g = np.array(img.convert('L'))
    return g < otsu(g)


def upscale(mask: np.ndarray, k: int) -> np.ndarray:
    im = Image.fromarray((mask.astype(np.uint8)) * 255)
    im2 = im.resize((im.width * k, im.height * k), Image.LANCZOS)
    return np.array(im2) > 127


def marching_squares(mask: np.ndarray):
    """返回线段列表 [((x1,y1),(x2,y2)), ...]，坐标单位=放大后像素。"""
    m = np.pad(mask.astype(np.uint8), 1, mode='constant', constant_values=0)
    a = m[:-1, :-1]
    b = m[:-1, 1:]
    c = m[1:, 1:]
    d = m[1:, :-1]
    code = (a << 3) | (b << 2) | (c << 1) | d

    # 四条边中点在“放大后图像”坐标系下的位置（已抵消 padding）
    def edges(ys, xs):
        T = (xs - 0.5, ys - 1.0)
        R = (xs + 0.0, ys - 0.5)
        B = (xs - 0.5, ys + 0.0)
        L = (xs - 1.0, ys - 0.5)
        return T, R, B, L

    # case -> 边对（5/10 为鞍点歧义，拆成两段）
    table = {
        1: [('L', 'B')], 2: [('B', 'R')], 3: [('L', 'R')],
        4: [('T', 'R')], 5: [('T', 'R'), ('L', 'B')], 6: [('T', 'B')],
        7: [('T', 'L')], 8: [('T', 'L')], 9: [('T', 'B')],
        10: [('T', 'L'), ('B', 'R')], 11: [('T', 'R')],
        12: [('L', 'R')], 13: [('B', 'R')], 14: [('L', 'B')],
    }

    segs = []
    for val, pairs in table.items():
        ys, xs = np.where(code == val)
        if ys.size == 0:
            continue
        T, R, B, L = edges(ys.astype(float), xs.astype(float))
        pts = {'T': T, 'R': R, 'B': B, 'L': L}
        for e1, e2 in pairs:
            x1, y1 = pts[e1]
            x2, y2 = pts[e2]
            segs.extend(zip(zip(x1.tolist(), y1.tolist()),
                            zip(x2.tolist(), y2.tolist())))
    return segs


def link_polygons(segs):
    """把线段串成闭合多边形（度数为 2 的环）。"""
    def key(p):
        return (round(p[0], 3), round(p[1], 3))

    adj = defaultdict(list)
    for p, q in segs:
        kp, kq = key(p), key(q)
        if kp == kq:
            continue
        adj[kp].append(kq)
        adj[kq].append(kp)

    seen, polys = set(), []
    for s in adj:
        if s in seen:
            continue
        seen.add(s)
        poly, prev, cur = [s], None, s
        while True:
            nxt = None
            for n in adj[cur]:
                if n != prev and n not in seen:
                    nxt = n
                    break
            if nxt is None:
                break
            seen.add(nxt)
            poly.append(nxt)
            prev, cur = cur, nxt
            if cur == s:
                break
        if len(poly) >= 3:
            polys.append(poly)
    return polys


def rdp(pts, eps):
    """Ramer–Douglas–Peucker 简化。"""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1:
            continue
        x1, y1 = pts[i]
        x2, y2 = pts[j]
        dx, dy = x2 - x1, y2 - y1
        norm = (dx * dx + dy * dy) ** 0.5
        maxd, idx = -1.0, -1
        if norm > 0:
            for k in range(i + 1, j):
                px, py = pts[k]
                d = abs(dy * px - dx * py + x2 * y1 - y2 * x1) / norm
                if d > maxd:
                    maxd, idx = d, k
        else:
            for k in range(i + 1, j):
                px, py = pts[k]
                d = ((px - x1) ** 2 + (py - y1) ** 2) ** 0.5
                if d > maxd:
                    maxd, idx = d, k
        if maxd > eps:
            keep[idx] = True
            stack.append((i, idx))
            stack.append((idx, j))
    return [p for p, k in zip(pts, keep) if k]


def area(pts):
    s = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        s += x1 * y2 - x2 * y1
    return abs(s) / 2.0


def main():
    img = Image.open(SRC)
    W, H = img.size
    print(f'source: {W}x{H} mode={img.mode}')

    mask = build_mask(SRC)
    print(f'ink ratio: {mask.mean():.3f}')

    big = upscale(mask, SCALE)
    segs = marching_squares(big)
    print(f'segments: {len(segs)}')

    polys = link_polygons(segs)
    print(f'polygons: {len(polys)}')

    kept = []
    for poly in polys:
        p = [(x / SCALE, y / SCALE) for x, y in poly]
        if area(p) < MIN_AREA:
            continue
        p = rdp(p, EPS)
        if len(p) >= 3:
            kept.append(p)
    print(f'kept: {len(kept)}')

    parts = []
    for p in kept:
        d = 'M ' + ' L '.join(f'{x:.2f} {y:.2f}' for x, y in p) + ' Z'
        parts.append(d)
    path = ' '.join(parts)

    # 裁剪到墨迹包围盒：原图四周有大量留白，不裁的话 logo 实际显示会明显偏小
    ys, xs = np.where(mask)
    x0 = max(0, int(xs.min()) - PAD)
    y0 = max(0, int(ys.min()) - PAD)
    x1 = min(W - 1, int(xs.max()) + PAD)
    y1 = min(H - 1, int(ys.max()) + PAD)
    cw, ch = x1 - x0 + 1, y1 - y0 + 1
    viewbox = f'{x0} {y0} {cw} {ch}'
    print(f'crop: {cw}x{ch}  viewBox="{viewbox}" (canvas {W}x{H})')

    svg = (
        f'<svg width="{cw}" height="{ch}" viewBox="{viewbox}" '
        f'fill="#000000" fill-rule="evenodd" xmlns="http://www.w3.org/2000/svg" '
        f'role="img" aria-label="雲窦 CLOUD9 EVERNOW">\n'
        f'  <path d="{path}"/>\n'
        f'</svg>\n'
    )
    with open(OUT_SVG, 'w', encoding='utf-8') as f:
        f.write(svg)

    # 同时导出供 React 组件内联使用的 TS 模块（便于用 currentColor 换色）
    ts = (
        '// 由 scripts/trace_logo.py 从参考 PNG 自动矢量化生成，请勿手改。\n'
        f'export const BRAND_LOGO_WIDTH = {cw}\n'
        f'export const BRAND_LOGO_HEIGHT = {ch}\n'
        f"export const BRAND_LOGO_VIEWBOX = '{viewbox}'\n"
        f'export const BRAND_LOGO_PATH =\n  {path!r}\n'
    )
    with open(OUT_TS, 'w', encoding='utf-8') as f:
        f.write(ts)

    print(f'written: {OUT_SVG}')
    print(f'written: {OUT_TS}')
    print(f'path chars: {len(path)}')


if __name__ == '__main__':
    main()
