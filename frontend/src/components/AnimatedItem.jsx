import { useEffect, useRef, useState } from 'react'

const observerOptions = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 }

export function AnimatedItem({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, observerOptions)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>
      {children}
    </Tag>
  )
}
