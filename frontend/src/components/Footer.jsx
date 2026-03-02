import { FileText } from 'lucide-react'
import styles from './Footer.module.css'

const links = [
  { href: '#about', label: 'О компании' },
  { href: '#services', label: 'Услуги' },
  { href: '#workers', label: 'Вакансии' },
  { href: '#partners', label: 'Партнёрам' },
  { href: '#news', label: 'Новости' },
  { href: '#why', label: 'Преимущества' },
  { href: '#contact', label: 'Контакты' },
]

const documents = [
  { href: '/documents/egrul.pdf', label: 'Свидетельство о регистрации (ЕГРЮЛ)' },
  { href: '/documents/inn.pdf', label: 'Свидетельство о постановке на учёт (ИНН)' },
  { href: '/documents/chaz.pdf', label: 'Свидетельство об аккредитации ЧАЗ' },
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
        <div className={styles.documents}>
          <p className={styles.documentsTitle}>Документы</p>
          <ul className={styles.documentsList}>
            {documents.map((doc) => (
              <li key={doc.label} className={styles.docItem}>
                <FileText size={16} className={styles.docIcon} />
                {doc.href ? (
                  <a href={doc.href} className={styles.docLink} target="_blank" rel="noopener noreferrer">
                    {doc.label}
                  </a>
                ) : (
                  <span className={styles.docPlaceholder}>{doc.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Трудовая Опора. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
