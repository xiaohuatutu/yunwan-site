"""客观校验：把矢量化结果重新栅格化，与原图掩码计算 IoU / 覆盖率。"""
import sys

import numpy as np
from PIL import Image, ImageChops, ImageDraw

sys.path.insert(0, 'scripts')
from trace_logo import (  # noqa: E402
    SRC, SCALE, EPS, MIN_AREA,
    build_mask, upscale, marching_squares, link_polygons, rdp, area,
)

K = 4  # 比对时的超采样倍率


def main():
    orig = build_mask(SRC)
    H, W = orig.shape
    print(f'original: {W}x{H}  ink={orig.mean():.4f}')

    big = upscale(orig, SCALE)
    segs = marching_squares(big)
    polys = link_polygons(segs)

    kept = []
    for poly in polys:
        p = [(x / SCALE, y / SCALE) for x, y in poly]
        if area(p) < MIN_AREA:
            continue
        p = rdp(p, EPS)
        if len(p) >= 3:
            kept.append(p)
    print(f'polygons kept: {len(kept)}')

    # 用 XOR 叠加各多边形，等价于 SVG 的 fill-rule="evenodd"
    acc = Image.new('1', (W * K, H * K), 0)
    for p in kept:
        im = Image.new('1', (W * K, H * K), 0)
        ImageDraw.Draw(im).polygon([(x * K, y * K) for x, y in p], fill=1)
        acc = ImageChops.logical_xor(acc, im)
    rec = np.array(acc) > 0

    # 原图掩码按最近邻放大到同一分辨率（不做插值，避免模糊影响判定）
    ref = np.kron(orig, np.ones((K, K), dtype=bool))

    inter = float((rec & ref).sum())
    union = float((rec | ref).sum())
    iou = inter / union if union else 0.0
    prec = inter / float(rec.sum()) if rec.sum() else 0.0
    reca = inter / float(ref.sum()) if ref.sum() else 0.0

    print(f'IoU          : {iou:.4f}')
    print(f'precision    : {prec:.4f}  (矢量图有多少落在原图墨迹内)')
    print(f'recall       : {reca:.4f}  (原图墨迹被覆盖了多少)')
    print(f'recovered ink: {rec.mean():.4f} vs original {ref.mean():.4f}')


if __name__ == '__main__':
    main()
