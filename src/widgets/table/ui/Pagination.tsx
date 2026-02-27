import { useState, type Dispatch, type SetStateAction, useEffect } from 'react'

import { Button } from '@/shared/ui/button/Button'
import { PaginationSelect } from './PaginationSelect'

import Refresh from '@/widgets/table/assets/refresh.svg?react'
import First from '@/widgets/table/assets/first.svg?react'
import ArrowLeft from '@/widgets/table/assets/arrow-left.svg?react'
import ArrowRight from '@/widgets/table/assets/arrow-right.svg?react'
import Last from '@/widgets/table/assets/last.svg?react'

import styles from './Pagination.module.scss'

interface PaginationProps {
  setRowsCount: Dispatch<SetStateAction<number>>
  rowsCount: number
  currentPage: number
  setCurrentPage: (currentPage: number) => void
  totalPages: number
}

export const Pagination = ({ setRowsCount, rowsCount, currentPage, setCurrentPage, totalPages }: PaginationProps) => {
  const [inputValue, setInputValue] = useState(String(currentPage))

  useEffect(() => {
    setInputValue(String(currentPage))
  }, [currentPage])

  const clampPage = (value: number) => Math.min(Math.max(value, 1), totalPages)

  const applyPage = (value: string) => {
    const page = clampPage(Number(value) || currentPage)
    setCurrentPage(page)
    setInputValue(String(page))
  }

  return (
    <div className={styles.pagination}>
      <button className={styles.refresh}>
        <Refresh />
        <span className={styles.refreshText}>Refresh</span>
      </button>

      <div className={styles.paginationControls}>
        <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          <First />
        </Button>

        <Button onClick={() => setCurrentPage(clampPage(currentPage - 1))} disabled={currentPage === 1}>
          <ArrowLeft />
        </Button>

        <PaginationSelect setRowsCount={setRowsCount} rowsCount={rowsCount} />

        <Button onClick={() => setCurrentPage(clampPage(currentPage + 1))} disabled={currentPage === totalPages}>
          <ArrowRight />
        </Button>

        <Button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          <Last />
        </Button>
      </div>

      <div className={styles.paginationCounter}>
        <input
          className={styles.currentPage}
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && applyPage(inputValue)}
          onBlur={() => applyPage(inputValue)}
        />
        <span className={styles.lastPage}>of {totalPages}</span>
      </div>
    </div>
  )
}
