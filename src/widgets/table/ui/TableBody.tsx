import { forwardRef, type ReactNode, type Ref } from 'react'
import type { TableColumn } from '@/shared/types/TableColumn.ts'
import NoResults from '../assets/no-results.svg?react'
import styles from './TableBody.module.scss'

interface TableBodyProps<T> {
  columns: TableColumn[]
  filteredData?: T[]
  currentPage: number
  rowsPerPage: number
}

export const TableBody = forwardRef(
  <T extends object>(
    { columns, filteredData = [], currentPage, rowsPerPage }: TableBodyProps<T>,
    ref: Ref<HTMLTableSectionElement>,
  ) => {
    const startIndex: number = (currentPage - 1) * rowsPerPage
    const endIndex: number = startIndex + rowsPerPage
    const displayedData = filteredData.length > 0 ? filteredData.slice(startIndex, endIndex) : []

    return (
      <tbody className={styles.tableBody} ref={ref}>
        {displayedData.length > 0 ? (
          displayedData.map((row, rowIndex) => (
            <tr
              className={styles.tableBodyRow}
              style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
              key={rowIndex}
            >
              {columns.map((column, columnIndex) => (
                <td className={styles.tableBodyCell} key={columnIndex}>
                  {String(row[column.key as keyof T]) as ReactNode}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className={styles.noResults} colSpan={columns.length || 1}>
              <NoResults />
              <span className={styles.noResultsText}>No results found</span>
            </td>
          </tr>
        )}
      </tbody>
    )
  },
)
