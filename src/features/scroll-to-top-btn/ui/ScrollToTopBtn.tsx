import ArrowUp from './images/arrow-up.svg?react'
import styles from './ScrollToTopBtn.module.scss'

export const ScrollToTopBtn = () => {
  return (
    <button className={styles.scrollToTopBtn}>
      <ArrowUp />
    </button>
  )
}
