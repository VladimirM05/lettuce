import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

import type { TableColumn } from "@/view/primitives/table/types/TableColumn"

import { Search } from "./Search"
import { Pagination } from "./Pagination"
import { TableBody } from "./TableBody"

import ArrowUp from "../images/arrow-up.svg?react"

import styles from "./Table.module.scss"

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  onSearchValueChange: (value: string) => void
  rowsCount: number
  currentPage: number
  totalPages: number
  onCurrentPageChange: (value: number) => void
  onRowsCountChange: (value: number) => void
}

export const Table = <T extends object>({
  columns,
  data,
  onSearchValueChange,
  rowsCount,
  currentPage,
  totalPages,
  onCurrentPageChange,
  onRowsCountChange,
}: TableProps<T>) => {
  const ref = useRef<HTMLTableSectionElement | null>(null)

  // Hiding the scroll when it reaches a certain height.
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const shouldShow = element.scrollTop > 300
      setVisible((prev) => (prev !== shouldShow ? shouldShow : prev))
    }

    element.addEventListener("scroll", handleScroll)
    return () => element.removeEventListener("scroll", handleScroll)
  }, [ref])

  const scrollToTop = () =>
    ref.current?.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableControls}>
        <Search onSearchValueChange={onSearchValueChange} />
        <Pagination
          rowsCount={rowsCount}
          currentPage={currentPage}
          totalPages={totalPages}
          onRowsCountChange={onRowsCountChange}
          onCurrentPageChange={onCurrentPageChange}
        />
      </div>
      <table className={styles.table}>
        <thead
          className={styles.tableHeader}
          style={{ gridTemplateColumns: `repeat(${columns?.length}, 1fr)` }}
        >
          {columns.map((column) => (
            <tr className={styles.tableHeaderRow} key={column.title}>
              <th className={styles.tableHeaderColumn}>{column.title}</th>
            </tr>
          ))}
        </thead>
        <TableBody ref={ref} columns={columns} data={data} />
      </table>
      <button
        className={clsx(styles.scrollToTopButton, visible && styles.visible)}
        onClick={scrollToTop}
      >
        <ArrowUp />
      </button>
    </div>
  )
}
