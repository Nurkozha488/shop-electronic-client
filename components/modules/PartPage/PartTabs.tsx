/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { $electronicPart } from '@/context/electronicPart'
import { $mode } from '@/context/mode'
import styles from '@/styles/part/index.module.scss'

const PartTabs = () => {
  const mode = useStore($mode)
  const electronicPart = useStore($electronicPart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [showDescription, setShowDescription] = useState(true)
  const [showCompatibility, setShowCompatibility] = useState(false)

  const handleShowDescription = () => {
    setShowDescription(true)
    setShowCompatibility(false)
  }

  const handleShowCompatibility = () => {
    setShowDescription(false)
    setShowCompatibility(true)
  }

  return (
    <div className={styles.part__tabs}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Описание
        </button>
        <button
          className={showCompatibility ? styles.active : ''}
          onClick={handleShowCompatibility}
        >
          Характеристики
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <h3
            className={`${styles.part__tabs__content__title} ${darkModeClass}`}
          >
            {electronicPart.name}
          </h3>
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {electronicPart.description}
          </p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {electronicPart.compatibility}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default PartTabs