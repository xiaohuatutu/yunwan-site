"""扫描 RDP 简化阈值 EPS，找 IoU 最优点（轮廓只算一次，只重跑简化+栅格化）。"""
import sys

import numpy as np
from PIL import Image, ImageChops, ImageDraw

sys.path.insert(0, 'scripts')
from trace_logo import (  # noqa: E402
    SRC, SCALE, MIN_AREA,
    build_mask, upscale, marching_squares, link_polygons, rdp, area,
)

K = 4


def main():
    orig = build_mask(SRC)
    H, W = orig.shape
    ref = np.kron(orig, np.ones((K, K), dtype=bool))

    big = upscale(orig, SCALE)
    segs = marching_squares(big)
    polys = link_polygons(segs)
    base = []
    for poly in polys:
        p = [(x / SCALE, y / SCALE) for x, y in poly]
        if area(p) >= MIN_AREA:
            base.append(p)
    print(f'base polygons: {len(base)}')

    print(f'\n{"EPS":>6} {"IoU":>8} {"prec":>8} {"recall":>8} {"pts":>7}')
    best = (0, None)
    for eps in [0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.6, 0.8, 1.2]:
        kept = [rdp(p, eps) for p in base]
        kept = [p for p in kept if len(p) >= 3]

        acc = Image.new('1', (W * K, H * K), 0)
        for p in kept:
            im = Image.new('1', (W * K, H * K), 0)
            ImageDraw.Draw(im).polygon([(x * K, y * K) for x, y in p], fill=1)
            acc = ImageChops.logical_xor(acc, im)
        rec = np.array(acc) > 0

        inter = float((rec & ref).sum())
        union = float((rec | ref).sum())
        iou = inter / union if union else 0.0
        prec = inter / float(rec.sum()) if rec.sum() else 0.0
        reca = inter / float(ref.sum()) if ref.sum() else 0.0
        npts = sum(len(p) for p in kept)

        print(f'{eps:>6} {iou:>8.4f} {prec:>8.4f} {reca:>8.4f} {npts:>7}')
        if iou > best[0]:
            best = (iou, eps)

    print(f'\nbest: EPS={best[1]} IoU={best[0]:.4f}')


if __name__ == '__main__':
    main()
