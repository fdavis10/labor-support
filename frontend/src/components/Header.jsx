import { useState } from 'react'
import styles from './Header.module.css'

const navItems = [
  { id: 'services', label: 'Услуги' },
  { id: 'how', label: 'Как это работает' },
  { id: 'why', label: 'Преимущества' },
  { id: 'contact', label: 'Контакты' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} aria-label="ТрудПоддержка — на главную">
          <img src="/logo.svg" alt="ТрудПоддержка" className={styles.logoImg} />
        </a>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navItems.map(({ id, label }) => (
            <button key={id} type="button" className={styles.navLink} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className={styles.cta}
          onClick={() => scrollTo('contact')}
          aria-label="Оставить заявку"
        >
          Оставить заявку
        </button>
        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Меню"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
