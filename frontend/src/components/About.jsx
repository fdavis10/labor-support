import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import { Award, Users, Building2, Calendar } from 'lucide-react'
import styles from './About.module.css'

const facts = [
  { text: 'Аккредитация Минтруда РФ', icon: Award },
  { text: 'Более 100 человек в штате', icon: Users },
  { text: '15+ объектов в новых регионах', icon: Building2 },
  { text: 'Опыт работы с 2025 года', icon: Calendar },
]

export function About() {
  return (
    <AnimatedSection id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>О компании</span>
          <h2 className={styles.heading}>«Трудовая Опора» — надёжный кадровый партнёр</h2>
        </div>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            Мы — аккредитованное частное агентство занятости (ЧАЗ). Работаем полностью легально, с соблюдением всех требований трудового и миграционного законодательства.
          </p>
          <ul className={styles.facts}>
            {facts.map((fact, i) => {
              const Icon = fact.icon
              return (
                <AnimatedItem key={fact.text} as="li" delay={i * 60} className={styles.fact}>
                  {Icon && <span className={styles.factIcon}><Icon size={20} strokeWidth={2} /></span>}
                  {fact.text}
                </AnimatedItem>
              )
            })}
          </ul>
          <p className={styles.paragraph}>
            Специализируемся на предоставлении линейного и рабочего персонала для строительных компаний, промышленных предприятий и логистических центров. Берём на себя всё: от поиска и проверки до оформления и сопровождения.
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}
