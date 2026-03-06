import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import { Award, Users, Building2, BadgeCheck, Calendar } from 'lucide-react'
import styles from './About.module.css'

const facts = [
  { text: 'Опыт работы с 2021 года', icon: Calendar },
  { text: 'Аккредитация Минтруда РФ', icon: Award },
  { text: 'Более 600 человек в штате', icon: Users },
  { text: '50+ объектов по всей России', icon: Building2 },
  { text: 'Участник СЭЗ', icon: BadgeCheck },
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
            Мы — аккредитованное частное агентство занятости и резидент свободной экономической зоны. Берём на себя всё, что связано с человеческим ресурсом: от поиска сотрудников до их полного сопровождения. Вы получаете готовых, легальных, проверенных работников и экономите до 30% бюджета на содержании штата.
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
          <h3 className={styles.subheading}>Что это значит на практике:</h3>
          <ul className={styles.practiceList}>
            <li>Вам больше не нужно тратить время на поиск сотрудников, проверку документов, оформление, расчёт заработной платы и отчётность</li>
            <li>Вам не нужен свой отдел кадров, бухгалтерия, юрист, служба безопасности и специалист по охране труда, где пройти медосмотр</li>
            <li>Вам не нужно думать о том, где разместить рабочих и как организовать их трансфер</li>
          </ul>
          <p className={styles.paragraph}>Мы берём это на себя.</p>
          <p className={styles.paragraph}>
            Наш подход — системный. Мы не просто предоставляем рабочий персонал. Мы обеспечиваем полный цикл.
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}
