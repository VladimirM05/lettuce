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
  applyPage: (value: number) => void
  onRowsChange: (value: number) => void
}

export const Pagination = ({ rowsCount, currentPage, totalPages, applyPage, onRowsChange }: PaginationProps) => {
  const [inputValue, setInputValue] = useState<string | null>(null)

  return (
    <div className={styles.pagination}>
      <button className={styles.refresh}>
        <RefreshIcon />
        <span className={styles.refreshText}>Refresh</span>
      </button>

      <div className={styles.paginationControls}>
        <Button onClick={() => applyPage(1)} disabled={currentPage === 1}>
          <FirstIcon />
        </Button>

        <Button onClick={() => applyPage(currentPage - 1)} disabled={currentPage === 1}>
          <ArrowLeftIcon />
        </Button>

        <PaginationSelect rowsCount={rowsCount} onChange={onRowsChange} />

        <Button onClick={() => applyPage(currentPage + 1)} disabled={currentPage === totalPages}>
          <ArrowRightIcon />
        </Button>

        <Button onClick={() => applyPage(totalPages)} disabled={currentPage === totalPages}>
          <LastIcon />
        </Button>
      </div>

      <div className={styles.paginationCounter}>
        <input
          className={styles.currentPage}
          type="number"
          min={1}
          max={totalPages}
          value={inputValue ?? currentPage}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              applyPage(Number(inputValue))
              setInputValue(null)
            }
          }}
          onBlur={() => {
            applyPage(Number(inputValue))
            setInputValue(null)
          }}
        />
        <span className={styles.lastPage}>of {totalPages}</span>
      </div>
    </div>
  )
}
