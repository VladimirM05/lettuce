import { forwardRef, type Ref } from "react"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import type { Customer } from "@/domain/entities/Customer"
import NoResults from "../images/no-results.svg?react"
import styles from "./TableBody.module.scss"

interface TableBodyProps {
  columns: TableColumn<Customer>[]
  data: Customer[]
  onSelectedCustomerChange: (selectedCustomer: Customer) => void
  onVisibleCustomerPopUpChange: (visible: boolean) => void
}

export const TableBody = forwardRef(
  (
    {
      columns,
      data,
      onSelectedCustomerChange,
      onVisibleCustomerPopUpChange,
    }: TableBodyProps,
    ref: Ref<HTMLTableSectionElement>,
  ) => {
    return (
      <tbody className={styles.tableBody} ref={ref}>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr
              className={styles.tableBodyRow}
              style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
              onClick={() => {
                onSelectedCustomerChange(row)
                onVisibleCustomerPopUpChange(true)
              }}
              key={rowIndex}
            >
              {columns.map((column, columnIndex) => (
                <td className={styles.tableBodyCell} key={columnIndex}>
                  {row[column.key as keyof Customer]}
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
