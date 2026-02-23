import { AdminTable } from '@/widgets/admin-table'
import { CustomerContext } from '../model/CustomersContext'
import type { AdminTableColumn } from '@/widgets/admin-table/model/AdminTableColumn'

const customerColumns: AdminTableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'phone', title: 'Phone' },
  { key: 'email', title: 'Email' },
  { key: 'dataJoined', title: 'Data Joined' },
]

const Customers = () => {
  return (
    <CustomerContext.Provider value={customerColumns}>
      <AdminTable />
    </CustomerContext.Provider>
  )
}

export default Customers
