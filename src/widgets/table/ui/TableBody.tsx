import { useContext } from 'react'
import { CustomerContext } from '@/pages/customers/model/CustomersContext'
import { ScrollToTopBtn } from '@/features/scroll-to-top-btn'
import styles from './TableBody.module.scss'

export const TableBody = () => {
  const customerData = useContext(CustomerContext)

  return (
    <tbody className={styles.adminTableBody}>
      {customerData?.map((customer) => (
        <tr className={styles.adminTableBodyRow} key={customer.key}>
          {/*{customer.map((field) => (*/}
          <td className={styles.adminTableBodyCell}>{customer.key}</td>
          {/*// ))}*/}
        </tr>
      ))}
      <ScrollToTopBtn />
    </tbody>
  )
}
