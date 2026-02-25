import { useContext, useRef, useState } from 'react'
import clsx from 'clsx'

import { CustomerContext } from '@/pages/customers/model/CustomerContext'
import { TableContext } from '../model/TableContext'

import { useScrollToTop } from '@/widgets/table/model/hooks/useScrollToTop'
import { useSearch } from '@/widgets/table/model/hooks/useSearch'

import type { CustomerData } from '@/pages/customers/model/customerData'

import { Search } from '@/widgets/table/ui/Search'
import { Pagination } from '@/widgets/table/ui/Pagination'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'

import ArrowUp from '../assets/arrow-up.svg?react'

import styles from './Table.module.scss'

export const Table = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Hiding the scroll when it reaches a certain height.
  const bodyRef = useRef<HTMLTableSectionElement | null>(null)
  const { visible, scrollToTop } = useScrollToTop(bodyRef)

  // search
  const context: CustomerContext | null = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContext is not provided')
  }
  const { data, columns, searchQuery } = context
  const { filteredData } = useSearch(data, columns, searchQuery)

  // A cross-section of the data in the table.
  const startIndex: number = (currentPage - 1) * rowsPerPage
  const endIndex: number = startIndex + rowsPerPage
  const displayedData: CustomerData[] = filteredData.length > 0 ? filteredData.slice(startIndex, endIndex) : []

  const totalPages: number = Math.max(1, Math.ceil(filteredData.length / rowsPerPage))

  return (
    <TableContext.Provider
      value={{
        rowsPerPage: rowsPerPage,
        setRowsPerPage: setRowsPerPage,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        totalPages: totalPages,
      }}
    >
      <div className={styles.tableWrapper}>
        <div className={styles.tableControls}>
          <Search />
          <Pagination />
        </div>

        <table className={styles.table}>
          <TableHeader />
          <TableBody data={displayedData} ref={bodyRef} />
        </table>

        <button className={clsx(styles.scrollToTopButton, visible && styles.visible)} onClick={scrollToTop}>
          <ArrowUp />
        </button>
      </div>
    </TableContext.Provider>
  )
}
