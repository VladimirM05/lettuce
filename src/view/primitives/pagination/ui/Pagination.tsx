import { useState } from "react"
import clsx from "clsx"

import { PaginationSelect } from "./PaginationSelect.tsx"

import RefreshIcon from "../images/refresh.svg?react"
import FirstIcon from "../images/first.svg?react"
import ArrowLeftIcon from "../images/arrow-left.svg?react"
import ArrowRightIcon from "../images/arrow-right.svg?react"
import LastIcon from "../images/last.svg?react"

import styles from "./Pagination.module.scss"

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
        <button
          className={clsx(styles.button, currentPage === 1 && styles.disabled)}
          onClick={() => onCurrentPageChange(1)}
          disabled={currentPage === 1}
        >
          <FirstIcon />
        </button>

        <button
          className={clsx(styles.button, currentPage === 1 && styles.disabled)}
          onClick={() => onCurrentPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon />
        </button>

        <PaginationSelect
          rowsCount={rowsCount}
          onChange={onRowsCountChange}
          onCurrentPageChange={onCurrentPageChange}
        />

        <button
          className={clsx(
            styles.button,
            currentPage === totalPages && styles.disabled,
          )}
          onClick={() => onCurrentPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon />
        </button>

        <button
          className={clsx(
            styles.button,
            currentPage === totalPages && styles.disabled,
          )}
          onClick={() => onCurrentPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <LastIcon />
        </button>
      </div>

      <div className={styles.paginationCounter}>
        <input
          className={styles.currentPage}
          type="number"
          value={inputValue ?? currentPage.toString()}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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
