import { AnimatedSection } from './AnimatedSection'
import { AnimatedItem } from './AnimatedItem'
import { Briefcase, Users, MapPin } from 'lucide-react'
import styles from './Services.module.css'

const services = [
  {
    id: 'outstaff',
    icon: Briefcase,
    label: 'Аутстаффинг (предоставление персонала)',
    title: 'Персонал под ключ',
    text: 'Оформляем сотрудников в свой штат, вы управляете процессом. Идеально для сезонных работ, госзаказов и объектов с переменной нагрузкой.',
    items: [
      'Поиск и проверка кандидатов',
      'Официальное оформление',
      'Зарплата, налоги, отчёты — всё берём на себя',
      'Быстрая замена при необходимости',
    ],
    button: 'Заказать расчёт',
  },
  {
    id: 'recruitment',
    icon: Users,
    label: 'Подбор персонала под ключ',
    title: 'Найдём людей туда, где другие опустили руки',
    text: 'Устали от вакансий, которые висят месяцами? Кандидаты не приходят или не подходят? Мы закрываем любые позиции — от разнорабочего до узкого специалиста — с гарантией качества и замены.',
    advantageBlocks: [
      {
        title: 'Сроки: от 2 дней',
        text: 'Базовые вакансии закрываем за 1–3 дней. Сложные и редкие специалисты за 1–2 недели. У нас своя база кандидатов, доступ к региональным и международным рынкам труда. Работаем точечно и быстро.',
      },
    ],
    items: [],
    button: 'Оставить заявку',
  },
  {
    id: 'relocation',
    icon: MapPin,
    label: 'Релокация бригад',
    title: 'Организуем переезд рабочих из регионов и СНГ',
    text: 'Привозим бригады из стран СНГ, а также из российских регионов с профицитом кадров.',
    items: [
      'Полное юридическое сопровождение',
      'Оформление патентов и разрешений',
      'Проживание на объекте',
      'Компенсация проезда',
    ],
    button: 'Подробнее',
  },
]

export function Services() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatedSection id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Услуги</span>
          <h2 className={styles.heading}>Что мы предлагаем бизнесу</h2>
        </div>
        <div className={styles.grid}>
          {services.map((service, i) => {
            const Icon = service.icon
            return (
            <AnimatedItem key={service.id} as="article" delay={i * 80} className={styles.card}>
              <div className={styles.cardBody}>
                {Icon && (
                  <span className={styles.cardIcon}>
                    <Icon size={28} strokeWidth={1.5} />
                  </span>
                )}
                <p className={styles.cardLabel}>{service.label}</p>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardText}>{service.text}</p>
                {service.advantageBlocks?.length > 0 ? (
                  <div className={styles.advantageBlocks}>
                    {service.advantageBlocks.map((block, j) => (
                      <div key={j} className={styles.advantageBlock}>
                        <span className={styles.advantageTitle}>{block.title}</span>
                        <p className={styles.advantageText}>{block.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className={styles.cardList}>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  className={i === 0 ? styles.primaryBtn : styles.secondaryBtn}
                  onClick={scrollToContact}
                >
                  {service.button}
                </button>
              </div>
            </AnimatedItem>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
