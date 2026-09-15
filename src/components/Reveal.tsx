import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** 额外类名 */
  className?: string
  /** 延迟毫秒数，用于同组元素的错峰出现 */
  delay?: number
  /** 只播放一次（默认）还是随滚动反复播放 */
  once?: boolean
}

/**
 * 滚动进入视口时淡入 + 上移。
 *
 * 只改 opacity 与 transform（合成层属性），不触发重排；
 * 动画结束后由 CSS 类接管，JS 不再参与。
 * 系统开启「减少动态效果」时，index.css 里的媒体查询会直接让它保持可见。
 */
export default function Reveal({ children, className = '', delay = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) io.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
