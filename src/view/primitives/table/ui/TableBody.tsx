import { forwardRef, type Ref, useState } from "react"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import type { Customer } from "@/domain/entities/Customer"
import CustomerPopUp from "@/view/components/customer-pop-up"
import NoResults from "../images/no-results.svg?react"
import styles from "./TableBody.module.scss"
import { createPortal } from "react-dom"

interface TableBodyProps {
  columns: TableColumn<Customer>[]
  data: Customer[]
  handleUpdateCustomer: (customer: Customer) => void
}

export const TableBody = forwardRef(
  (
    { columns, data, handleUpdateCustomer }: TableBodyProps,
    ref: Ref<HTMLTableSectionElement>,
  ) => {
    const [visiblePopUp, setVisiblePopUp] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
      null,
    )

    return (
      <>
        {visiblePopUp &&
          selectedCustomer &&
          createPortal(
            <CustomerPopUp
              columns={columns}
              customer={selectedCustomer}
              setVisiblePopUp={setVisiblePopUp}
              handleUpdateCustomer={handleUpdateCustomer}
            />,
            document.body,
          )}

        <tbody className={styles.tableBody} ref={ref}>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                className={styles.tableBodyRow}
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                }}
                onClick={() => {
                  setVisiblePopUp(true)
                  setSelectedCustomer(row)
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
      </>
    )
  },
)
