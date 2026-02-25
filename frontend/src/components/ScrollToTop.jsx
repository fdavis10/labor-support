import { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.css'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button type="button" className={`${styles.btn} ${visible ? styles.visible : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Наверх">
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
