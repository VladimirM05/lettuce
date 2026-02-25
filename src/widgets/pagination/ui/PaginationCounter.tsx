import styles from './PaginationCounter.module.scss'
import { useContext } from 'react'
import { TableContext } from '@/widgets/table/model/TableContext.ts'

export const PaginationCounter = () => {
  const context = useContext(TableContext)!
  const { currentPage, setCurrentPage, totalPages } = context

  return (
    <div className={styles.paginationCounter}>
      <input
        className={styles.currentPage}
        type="text"
        value={currentPage}
        onChange={(e) => setCurrentPage(Number(e.target.value))}
      />
      <span className="totalPages">of {totalPages}</span>
    </div>
  )
}
