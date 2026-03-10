import * as React from "react"
import { useState } from "react"
import clsx from "clsx"

import { PaginationSelect } from "./PaginationSelect"

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return

    const page: string = checkInputValue(Number(inputValue))

    setInputValue(page)
    onCurrentPageChange(Number(page))
  }

  return (
    <div className={styles["pagination"]}>
      <button className={styles["pagination__refresh-button"]}>
        <RefreshIcon />
        <span className={styles["pagination__refresh-text"]}>Refresh</span>
      </button>

      <div className={styles["pagination__controls"]}>
        <button
          className={clsx(
            styles["pagination__button"],
            currentPage === 1 && styles["pagination__button--disabled"],
          )}
          onClick={() => onCurrentPageChange(1)}
          disabled={currentPage === 1}
        >
          <FirstIcon />
        </button>

        <button
          className={clsx(
            styles["pagination__button"],
            currentPage === 1 && styles["pagination__button--disabled"],
          )}
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
            styles["pagination__button"],
            currentPage === totalPages &&
              styles["pagination__button--disabled"],
          )}
          onClick={() => onCurrentPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon />
        </button>

        <button
          className={clsx(
            styles["pagination__button"],
            currentPage === totalPages &&
              styles["pagination__button--disabled"],
          )}
          onClick={() => onCurrentPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <LastIcon />
        </button>
      </div>

      <div className={styles["pagination__counter"]}>
        <input
          className={styles["pagination__current-page"]}
          type="number"
          value={inputValue ?? currentPage.toString()}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setInputValue(checkInputValue(Number(inputValue)))}
        />
        <span className={styles["pagination__last-page"]}>of {totalPages}</span>
      </div>
    </div>
  )
}
