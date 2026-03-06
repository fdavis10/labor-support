import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import styles from './Specialties.module.css'

const sectors = [
  { num: 1, title: 'Строительство', roles: 'штукатуры, маляры, плиточники, сварщики, электрики, сантехники, отделочники, разнорабочие', image: '/images/construction.jpg' },
  { num: 2, title: 'Клининг', roles: 'уборщики, мойщики фасадов, послестроительная уборка', image: '/images/cleaning.jpg' },
  { num: 3, title: 'Логистика и склад', roles: 'грузчики, кладовщики, комплектовщики, водители погрузчиков, водители', image: '/images/logistics.jpg' },
  { num: 4, title: 'Ритейл', roles: 'продавцы, кассиры, мерчандайзеры', image: '/images/Retail.jpg' },
  { num: 5, title: 'Ресторанный бизнес', roles: 'повара, официанты, посудомойщики', image: '/images/Restraunt.jpg' },
  { num: 6, title: 'Промышленность', roles: 'операторы станков, слесари, электрики', image: '/images/Industry.jpg' },
  { num: 7, title: 'Сельское хозяйство', roles: 'сезонные работники, механизаторы, трактористы', image: '/images/Farm.jpg' },
  { num: 8, title: 'Гостиничный бизнес', roles: 'горничные, администраторы', image: '/images/Hotel.jpg' },
]

export function Specialties() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatedSection id="specialties" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Специальности</span>
          <h2 className={styles.heading}>Любые специалисты для вашего бизнеса</h2>
          <p className={styles.lead}>
            Мы закрываем потребности в персонале для всех ключевых отраслей:
          </p>
        </div>
        <div className={styles.grid}>
          {sectors.map((sector, i) => (
            <AnimatedItem
              key={sector.num}
              as="article"
              delay={i * 50}
              className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}
            >
              <div className={styles.cardImageWrap}>
                <img src={sector.image} alt="" className={styles.cardImage} />
                <span className={styles.cardBadge}>{String(sector.num).padStart(2, '0')}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{sector.title}</h3>
                <p className={styles.cardRoles}>{sector.roles}</p>
              </div>
            </AnimatedItem>
          ))}
        </div>
        <p className={styles.cta}>
          Нужны другие специалисты?{' '}
          <button type="button" className={styles.ctaLink} onClick={scrollToContact}>
            Сообщите — найдём и закроем.
          </button>
        </p>
      </div>
    </AnimatedSection>
  )
}
