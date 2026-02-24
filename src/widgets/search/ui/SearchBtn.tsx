import styles from './SearchBtn.module.scss'

interface SearchBtnProps {
  onClick: () => void
}

export const SearchBtn = ({ onClick }: SearchBtnProps) => {
  return (
    <button className={styles.searchBtn} onClick={onClick}>
      <span className={styles.searchBtnText}>Search</span>
    </button>
  )
}
