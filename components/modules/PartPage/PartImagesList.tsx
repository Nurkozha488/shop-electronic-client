/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'
import { $electronicPart } from '@/context/electronicPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartImagesItem from './PartImagesItem'
import PartSlider from './PartSlider'
import styles from '@/styles/part/index.module.scss'

const PartImagesList = () => {
  const electronicPart = useStore($electronicPart)
  const isMobile = useMediaQuery(850)
  const images = electronicPart.images
    ? (JSON.parse(electronicPart.images) as string[])
    : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={electronicPart.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList