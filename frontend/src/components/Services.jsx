import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import styles from './Services.module.css'

const categories = [
  { id: 'it', title: 'IT и разработка', description: 'Разработчики, тестировщики, аналитики, DevOps — под ваш стек и проект.', image: '/images/it.jpg', featured: true },
  { id: 'accounting', title: 'Бухгалтерия и финансы', description: 'Бухгалтеры, главбухи, экономисты для учёта и отчётности.', image: '/images/accounting.jpg', featured: false },
  { id: 'construction', title: 'Строительство', description: 'Инженеры, прорабы, рабочие специальности для объектов.', image: '/images/construction.jpg', featured: false },
  { id: 'office', title: 'Офисный персонал', description: 'Администраторы, HR, секретари, помощники руководителя.', image: '/images/office.jpg', featured: false },
  { id: 'logistics', title: 'Логистика и склад', description: 'Кладовщики, водители, комплектовщики для складов и доставки.', image: '/images/logistics.jpg', featured: false },
  { id: 'other', title: 'Другие отрасли', description: 'Подбор под любые задачи: производство, торговля, услуги.', image: '/images/other.jpg', featured: false },
]

export function Services() {
  const featured = categories.find((c) => c.featured)
  const rest = categories.filter((c) => !c.featured)
  return (
    <AnimatedSection id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Направления</span>
          <h2 className={styles.heading}>Подбор персонала во всех востребованных сферах</h2>
          <p className={styles.lead}>Один специалист или команда — на проект или на постоянной основе. Быстро и без лишних формальностей.</p>
        </div>
        <div className={styles.grid}>
          {featured && (
            <AnimatedItem as="article" delay={0} className={styles.cardFeatured}>
              <a href="#contact" className={styles.cardLink}>
                <div className={styles.cardImageWrap}>
                  <img src={featured.image} alt="" className={styles.cardImage} />
                  <span className={styles.cardBadge}>01</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{featured.title}</h3>
                  <p className={styles.cardDesc}>{featured.description}</p>
                </div>
              </a>
            </AnimatedItem>
          )}
          {rest.map((item, i) => (
            <AnimatedItem key={item.id} as="article" delay={(i + 1) * 80} className={styles.card}>
              <a href="#contact" className={styles.cardLink}>
                <div className={styles.cardImageWrap}>
                  <img src={item.image} alt="" className={styles.cardImage} />
                  <span className={styles.cardBadge}>{String(i + 2).padStart(2, '0')}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              </a>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
