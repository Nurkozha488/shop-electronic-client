/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/about/index.module.scss'

const AboutPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>
          О компании
        </h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
              Компания &quot;Электроник&quot; предлагает Вам широкий спектр продуктов и услуг для различных сегментов рынка. Наша миссия – быть вашим надежным партнером в мире современных технологий, предлагая инновационные решения и качественное обслуживание.
            </p>
            <p>
              Ассортимент интернет-магазина &quot;Электроник&quot; включает в
              себя широкий выбор продукции от ведущих мировых брендов, гарантирующих высокое качество и надежность. Наш ассортимент включает в себя последние модели и инновационные решения, которые удовлетворят потребности даже самых требовательных клиентов.
            </p>
          </div>
          <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
            <img src="/img/about-img-2.png" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage