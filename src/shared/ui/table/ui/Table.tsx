import { useRef } from 'react'
import clsx from 'clsx'

import type { TableColumn } from '@/shared/types/TableColumn'

import { Search } from '@/shared/ui/table/ui/Search'
import { Pagination } from '@/shared/ui/table/ui/Pagination'
import { TableBody } from './TableBody'

import { useScrollToTop } from '@/shared/ui/table/model/useScrollToTop'

import ArrowUp from '../assets/arrow-up.svg?react'

import styles from './Table.module.scss'

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  onSearch: (value: string) => void
  rowsCount: number
  currentPage: number
  totalPages: number
  applyPage: (value: number) => void
  onRowsChange: (value: number) => void
}

export const Table = <T extends object>({
  columns,
  data,
  onSearch,
  rowsCount,
  currentPage,
  totalPages,
  applyPage,
  onRowsChange,
}: TableProps<T>) => {
  const bodyRef = useRef<HTMLTableSectionElement | null>(null)

  // Hiding the scroll when it reaches a certain height.
  const { visible, scrollToTop } = useScrollToTop(bodyRef)

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableControls}>
        <Search onSearch={onSearch} />
        <Pagination
          rowsCount={rowsCount}
          currentPage={currentPage}
          totalPages={totalPages}
          applyPage={applyPage}
          onRowsChange={onRowsChange}
        />
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHeader} style={{ gridTemplateColumns: `repeat(${columns?.length}, 1fr)` }}>
          {columns.map((column) => (
            <tr className={styles.tableHeaderRow} key={column.title}>
              <th className={styles.tableHeaderColumn}>{column.title}</th>
            </tr>
          ))}
        </thead>
        <TableBody ref={bodyRef} columns={columns} data={data} />
      </table>
      <button className={clsx(styles.scrollToTopButton, visible && styles.visible)} onClick={scrollToTop}>
        <ArrowUp />
      </button>
    </div>
  )
}
