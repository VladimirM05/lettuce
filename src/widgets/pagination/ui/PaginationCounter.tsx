import styles from './PaginationCounter.module.scss'

export const PaginationCounter = () => {
  return (
    <div className={styles.paginationCounter}>
      <input className={styles.currentPage} type="text" value="1" />
      <span className="totalPages">of {1}</span>
    </div>
  )
}
