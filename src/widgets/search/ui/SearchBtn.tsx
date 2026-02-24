import styles from './SearchBtn.module.scss'

export const SearchBtn = () => {
  return (
    <button className={styles.searchBtn}>
      <span className={styles.searchBtnText}>Search</span>
    </button>
  )
}
