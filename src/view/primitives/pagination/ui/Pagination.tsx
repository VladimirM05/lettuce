import * as React from "react"
import { useState } from "react"

import { ActionButton } from "@/view/primitives/action-button"
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

  const checkInputValue = (value: number): string =>
    String(Math.min(Math.max(value, 1), totalPages))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return

    const page: string = checkInputValue(Number(inputValue))

    setInputValue(page)
    onCurrentPageChange(Number(page))
  }

  return (
    <div className={styles["pagination"]}>
      <ActionButton color="warning" icon={<RefreshIcon />}>
        Refresh
      </ActionButton>

      <div className={styles["pagination__controls"]}>
        <ActionButton
          onClick={() => onCurrentPageChange(1)}
          color={currentPage !== 1 ? "secondary" : "disabled"}
          shape="square"
          icon={<FirstIcon />}
          disabled={currentPage === 1}
        />
        <ActionButton
          onClick={() => onCurrentPageChange(currentPage - 1)}
          color={currentPage !== 1 ? "secondary" : "disabled"}
          shape="square"
          icon={<ArrowLeftIcon />}
          disabled={currentPage === 1}
        />
        <PaginationSelect
          rowsCount={rowsCount}
          onChange={onRowsCountChange}
          onCurrentPageChange={onCurrentPageChange}
        />
        <ActionButton
          onClick={() => onCurrentPageChange(currentPage + 1)}
          color={currentPage !== totalPages ? "secondary" : "disabled"}
          shape="square"
          icon={<ArrowRightIcon />}
          disabled={currentPage === totalPages}
        />
        <ActionButton
          onClick={() => onCurrentPageChange(totalPages)}
          color={currentPage !== totalPages ? "secondary" : "disabled"}
          shape="square"
          icon={<LastIcon />}
          disabled={currentPage === totalPages}
        />
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
