import { forwardRef, type ReactNode, type Ref } from 'react'
import type { TableColumn } from '@/shared/types/TableColumn'
import NoResults from '../assets/no-results.svg?react'
import styles from './TableBody.module.scss'

interface TableBodyProps<T> {
  columns: TableColumn[]
  data: T[]
}

export const TableBody = forwardRef(
  <T extends object>({ columns, data }: TableBodyProps<T>, ref: Ref<HTMLTableSectionElement>) => {
    return (
      <tbody className={styles.tableBody} ref={ref}>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
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
