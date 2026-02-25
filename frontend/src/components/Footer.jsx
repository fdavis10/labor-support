import styles from './Footer.module.css'

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#how', label: 'Как это работает' },
  { href: '#why', label: 'Преимущества' },
  { href: '#contact', label: 'Контакты' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.top}>
          <a href="#" className={styles.logo} aria-label="ТрудПоддержка — на главную">
            <img src="/logo.svg" alt="ТрудПоддержка" className={styles.logoImg} />
          </a>
          <nav className={styles.nav}>
            {links.map(({ href, label }) => (
              <a key={href} href={href} className={styles.link}>{label}</a>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Трудовая Опора. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
