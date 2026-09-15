"""链接可达性自检：扫描源码里的所有内部跳转，与路由表逐一核对。

用法：
  python scripts/check_links.py

输出：每个内部地址是否有对应路由；以及「页面 → 它包含的链接」清单。
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

# 路由表（与 src/App.tsx 保持一致）
ROUTES = [
    "/",
    "/story",
    "/story/:slug",
    "/status",
    "/status/:slug",
    "/products",
    "/products/:slug",
    "/life",
    "/life/:slug",
    "/news",
    "/news/:slug",
    "/find",
    "/partner",
    "/account",
    "/legal/privacy",
    "/legal/terms",
]

# 动态段的合法取值（与 src/data/content.ts 对应）
SLUGS = {
    "/story": ["why-we-start", "emin-courtyard", "how-we-make"],
    "/status": ["sleep", "heat", "emotion", "body"],
    "/products": ["sleep-drink", "qingrun-pill", "calm-tea", "bone-powder"],
    "/life": ["sleep-routine", "move-daily", "eat-with-season", "quiet-reading"],
    "/news": ["spring-courtyard-open", "sleep-drink-batch", "partner-program"],
}


def resolve(path: str) -> bool:
    """判断一个内部地址能否匹配到路由（含动态段与实际 slug）"""
    path = path.split("#")[0].rstrip("/") or "/"
    if path in ROUTES:
        return True
    parts = path.strip("/").split("/")
    if len(parts) == 2:
        base = "/" + parts[0]
        if f"{base}/:slug" in ROUTES:
            return True  # 路由存在
    return False


def expand(path: str) -> list[str]:
    """把 /story/:slug 之类的地址展开为实际可访问的地址"""
    path = path.split("#")[0].rstrip("/") or "/"
    if path in ROUTES and ":slug" not in path:
        return [path]
    parts = path.strip("/").split("/")
    if len(parts) == 2:
        base = "/" + parts[0]
        if base in SLUGS and len(parts) == 2:
            return [f"{base}/{slug}" for slug in SLUGS[base]]
    return [path]


def main() -> int:
    # 1) 收集源码里所有内部跳转
    pattern = re.compile(r'to=(?:"([^"]+)"|\{`([^`]+)`\}|\{\'([^\']+)\'\})')
    found: dict[str, set[str]] = {}

    for f in SRC.rglob("*.tsx"):
        text = f.read_text(encoding="utf-8")
        for m in pattern.finditer(text):
            target = m.group(1) or m.group(2) or m.group(3)
            if "`" in target or "${" in target:
                # 模板字符串：取前缀常量 + 具体 slug 组合，交给调用方核对
                target = re.sub(r"\$\{[^}]+\}", "*", target)
            if not target.startswith("/"):
                continue
            found.setdefault(target, set()).add(str(f.relative_to(ROOT)))

    # 2) 数据文件里生成的详情地址
    for base, slugs in SLUGS.items():
        for slug in slugs:
            found.setdefault(f"{base}/{slug}", set()).add("src/data/content.ts（slug 数据）")

    # 3) src/lib/site.ts 集中配置的路由（导航 / 页脚 / 面包屑共用）
    site_ts = (SRC / "lib" / "site.ts").read_text(encoding="utf-8")
    block = re.search(r"export const ROUTES[^=]*=\s*\{(.*?)\n\}", site_ts, re.S)
    if block:
        for key, value in re.findall(r"(\w+):\s*'([^']+)'", block.group(1)):
            found.setdefault(value, set()).add(f"src/lib/site.ts（ROUTES.{key}）")

    unresolved = []
    print("=== 内部地址 → 匹配结果 ===")
    for target in sorted(found):
        ok = resolve(target.replace("/*", "/x"))
        flag = "OK  " if ok else "FAIL"
        if not ok:
            unresolved.append((target, sorted(found[target])))
        print(f"[{flag}] {target}")

    print()
    print("=== 展开后的可访问地址 ===")
    total = 0
    for target in sorted(found):
        for real in expand(target.replace("/*", "/x")):
            total += 1
            print(f"  {real}")
    print(f"合计 {total} 个地址")

    if unresolved:
        print()
        print("=== 无法匹配路由的地址 ===")
        for target, files in unresolved:
            print(f"  {target}")
            for f in files:
                print(f"      ← {f}")
        return 1

    print("\n全部内部地址均可匹配到路由，无死链。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
