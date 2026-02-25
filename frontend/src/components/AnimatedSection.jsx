import { useEffect, useRef, useState } from 'react'

const defaultOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }

export function AnimatedSection({ children, className = '', delay = 0, as: Tag = 'section', id, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, defaultOptions)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <Tag ref={ref} id={id} className={className} {...rest} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </Tag>
  )
}
