import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import { Award, Scale, Receipt, Wallet, Users } from 'lucide-react'
import styles from './Partners.module.css'

const benefits = [
  { text: 'Аккредитация ЧАЗ (Минтруд РФ)', icon: Award },
  { text: 'Полная юридическая чистота', icon: Scale },
  { text: 'Работаем с НДС', icon: Receipt },
  { text: 'Гибкие условия оплаты', icon: Wallet },
  { text: 'Закрываем до 100+ человек в месяц', icon: Users },
]

export function Partners() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatedSection id="partners" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Партнёрам (B2B)</span>
          <h2 className={styles.heading}>Строите объекты? Не хватает рук?</h2>
          <p className={styles.text}>
            Закроем вашу потребность в персонале быстро и официально. Работаем с госзаказчиками, тендерами, частными подрядчиками.
          </p>
        </div>
        <div className={styles.content}>
          <p className={styles.label}>Почему выбирают нас:</p>
          <ul className={styles.list}>
            {benefits.map((item, i) => {
              const Icon = item.icon
              return (
                <AnimatedItem key={item.text} as="li" delay={i * 50} className={styles.item}>
                  {Icon && <span className={styles.itemIcon}><Icon size={20} strokeWidth={2} /></span>}
                  {item.text}
                </AnimatedItem>
              )
            })}
          </ul>
          <button type="button" className={styles.primaryBtn} onClick={scrollToContact}>
            Скачать коммерческое предложение
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}
