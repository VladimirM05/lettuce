import { useRef, useState } from 'react'
import clsx from 'clsx'

import type { TableColumn } from '@/widgets/table/model/TableColumn'

import { useScrollToTop } from '@/widgets/table/model/hooks/useScrollToTop'
import { useSearch } from '@/widgets/table/model/hooks/useSearch'

import { Search } from '@/widgets/table/ui/Search'
import { Pagination } from '@/widgets/table/ui/Pagination'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'

import ArrowUp from '../assets/arrow-up.svg?react'

import styles from './Table.module.scss'

interface TableProps<T> {
  columns: TableColumn[]
  data: T[]
}

export const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const bodyRef = useRef<HTMLTableSectionElement | null>(null)

  // Hiding the scroll when it reaches a certain height.
  const { visible, scrollToTop } = useScrollToTop(bodyRef)

  // search
  const { filteredData } = useSearch(columns, data, search)

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableControls}>
        <Search setSearch={setSearch} setCurrentPage={setCurrentPage} />
        <Pagination
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>

      <table className={styles.table}>
        <TableHeader columns={columns} />
        <TableBody
          ref={bodyRef}
          columns={columns}
          filteredData={filteredData}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
        />
      </table>

      <button className={clsx(styles.scrollToTopButton, visible && styles.visible)} onClick={scrollToTop}>
        <ArrowUp />
      </button>
    </div>
  )
}
