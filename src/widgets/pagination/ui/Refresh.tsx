import RefreshImg from '@/widgets/pagination/assets/refresh.svg?react'
import styles from './Refresh.module.scss'

export const Refresh = () => {
  return (
    <button className={styles.refresh}>
      <RefreshImg />
      <span className={styles.refreshText}>Refresh</span>
    </button>
  )
}
