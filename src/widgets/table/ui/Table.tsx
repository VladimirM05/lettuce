import { type Dispatch, type SetStateAction, useRef } from 'react'
import clsx from 'clsx'

import type { TableColumn } from '@/shared/types/TableColumn'

import { Search } from '@/widgets/table/ui/Search'

import { Pagination } from '@/widgets/table/ui/Pagination'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'

import { useScrollToTop } from '@/widgets/table/model/useScrollToTop'

import ArrowUp from '../assets/arrow-up.svg?react'

import styles from './Table.module.scss'

interface TableProps<T> {
  columns: TableColumn[]
  data: T[]
  setSearchValue: Dispatch<SetStateAction<string>>
  rowsCount: number
  setRowsCount: Dispatch<SetStateAction<number>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  totalPages: number
}

export const Table = <T extends object>({
  columns,
  data,
  setSearchValue,
  rowsCount,
  setRowsCount,
  currentPage,
  setCurrentPage,
  totalPages,
}: TableProps<T>) => {
  const bodyRef = useRef<HTMLTableSectionElement | null>(null)

  // Hiding the scroll when it reaches a certain height.
  const { visible, scrollToTop } = useScrollToTop(bodyRef)

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableControls}>
        <Search setSearchValue={setSearchValue} setCurrentPage={setCurrentPage} />
        <Pagination
          rowsCount={rowsCount}
          setRowsCount={setRowsCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <table className={styles.table}>
        <TableHeader columns={columns} />
        <TableBody ref={bodyRef} columns={columns} data={data} />
      </table>
      <button className={clsx(styles.scrollToTopButton, visible && styles.visible)} onClick={scrollToTop}>
        <ArrowUp />
      </button>
    </div>
  )
}
