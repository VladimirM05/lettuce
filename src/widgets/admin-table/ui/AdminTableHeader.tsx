import { useContext } from 'react'
import { CustomerContext } from '@/pages/customers/model/CustomersContext'
import styles from './AdminTableHeader.module.scss'

export const AdminTableHeader = () => {
  const customerColumns = useContext(CustomerContext)

  const gridTemplateColumns = `repeat(${customerColumns?.length}, 1fr)`

  return (
    <thead className={styles.adminTableHeader} style={{ gridTemplateColumns }}>
      {customerColumns?.map((column) => (
        <tr className={styles.adminTableHeaderRow} key={column.key}>
          <th className={styles.adminTableHeaderColumn}>{column.title}</th>
        </tr>
      ))}
    </thead>
  )
}
