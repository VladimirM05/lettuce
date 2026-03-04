import { useState } from 'react'

import { Button } from '@/shared/ui/button/Button'
import { PaginationSelect } from './PaginationSelect'

import RefreshIcon from '@/shared/ui/table/assets/refresh.svg?react'
import FirstIcon from '@/shared/ui/table/assets/first.svg?react'
import ArrowLeftIcon from '@/shared/ui/table/assets/arrow-left.svg?react'
import ArrowRightIcon from '@/shared/ui/table/assets/arrow-right.svg?react'
import LastIcon from '@/shared/ui/table/assets/last.svg?react'

import styles from './Pagination.module.scss'

interface PaginationProps {
  rowsCount: number
  currentPage: number
  totalPages: number
  onRowsCountChange: (value: number) => void
  onCurrentPageChange: (value: number) => void
}

export const Pagination = ({
  rowsCount,
  currentPage,
  totalPages,
  onRowsCountChange,
  onCurrentPageChange,
}: PaginationProps) => {
  const [inputValue, setInputValue] = useState<string | null>(null)

  const checkInputValue = (value: number): string => {
    return String(Math.min(Math.max(value, 1), totalPages))
  }

  return (
    <div className={styles.pagination}>
      <button className={styles.refresh}>
        <RefreshIcon />
        <span className={styles.refreshText}>Refresh</span>
      </button>

      <div className={styles.paginationControls}>
        <Button onClick={() => onRowsCountChange(1)} disabled={currentPage === 1}>
          <FirstIcon />
        </Button>

        <Button onClick={() => onRowsCountChange(currentPage - 1)} disabled={currentPage === 1}>
          <ArrowLeftIcon />
        </Button>

        <PaginationSelect rowsCount={rowsCount} onChange={onCurrentPageChange} />

        <Button onClick={() => onRowsCountChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <ArrowRightIcon />
        </Button>

        <Button onClick={() => onRowsCountChange(totalPages)} disabled={currentPage === totalPages}>
          <LastIcon />
        </Button>
      </div>

      <div className={styles.paginationCounter}>
        <input
          className={styles.currentPage}
          type="number"
          value={inputValue ?? currentPage.toString()}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const page: string = checkInputValue(Number(inputValue))
              setInputValue(page)
              onRowsCountChange(Number(page))
            }
          }}
          onBlur={() => setInputValue(checkInputValue(Number(inputValue)))}
        />
        <span className={styles.lastPage}>of {totalPages}</span>
      </div>
    </div>
  )
}
