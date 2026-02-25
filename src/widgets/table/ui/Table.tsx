import { useContext, useRef, useState } from 'react'

import { CustomerContext } from '@/pages/customers/model/CustomerContext'
import { TableContext } from '../model/TableContext'

import { useScrollToTop } from '@/widgets/table/model/hooks/useScrollToTop'
import { useSearch } from '@/widgets/table/model/hooks/useSearch'

import { TableControls } from './TableControls'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { ScrollToTopButton } from './ScrollToTopButton'

import styles from './Table.module.scss'

export const Table = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Hiding the scroll when it reaches a certain height.
  const bodyRef = useRef<HTMLTableSectionElement>(null)
  const { visible, scrollToTop } = useScrollToTop(bodyRef)

  // search
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContext is not provided')
  }
  const { data, columns, searchQuery } = context
  const { filteredData } = useSearch(data, columns, searchQuery)

  // A cross-section of the data in the table.
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const displayedData = filteredData.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  return (
    <div className={styles.tableWrapper}>
      <TableContext.Provider
        value={{
          rowsPerPage: rowsPerPage,
          setRowsPerPage: setRowsPerPage,
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
          totalPages: totalPages,
        }}
      >
        <TableControls />
        <table className={styles.table}>
          <TableHeader />
          <TableBody data={displayedData} ref={bodyRef} />
        </table>
      </TableContext.Provider>
      <ScrollToTopButton onClick={scrollToTop} visible={visible} />
    </div>
  )
}
