import { useContext } from 'react'
import { CustomerContext } from '@/pages/customers/model/CustomerContext.ts'
import styles from './TableHeader.module.scss'

export const TableHeader = () => {
  const context = useContext(CustomerContext)!
  const { columns } = context

  const gridTemplateColumns = `repeat(${columns?.length}, 1fr)`

  return (
    <thead className={styles.adminTableHeader} style={{ gridTemplateColumns }}>
      {columns.map((column) => (
        <tr className={styles.adminTableHeaderRow} key={column.key}>
          <th className={styles.adminTableHeaderColumn}>{column.title}</th>
        </tr>
      ))}
    </thead>
  )
}
