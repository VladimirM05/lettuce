import { forwardRef, useContext } from 'react'
import { CustomerContext } from '@/pages/customers/model/CustomerContext'
import type { CustomerData } from '@/pages/customers/model/customerData'
import styles from './TableBody.module.scss'

interface TableBodyProps {
  data?: CustomerData[]
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => {
  const { data } = props
  const context = useContext(CustomerContext)!
  const { columns } = context

  if (!columns || !data) return null

  const gridTemplateColumns: string = `repeat(${columns.length}, 1fr)`

  return (
    <tbody className={styles.tableBody} ref={ref}>
      {data.map((customer, rowIndex) => (
        <tr className={styles.tableBodyRow} style={{ gridTemplateColumns: gridTemplateColumns }} key={rowIndex}>
          {columns.map((column, columnIndex) => (
            <td className={styles.tableBodyCell} key={columnIndex}>
              {customer[column.key as keyof typeof customer]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
})
