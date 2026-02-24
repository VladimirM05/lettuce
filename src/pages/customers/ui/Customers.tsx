import { Table } from '@/widgets/table'
import { CustomerContext } from '../model/CustomersContext'
// import { customerData } from '@/pages/customers/model/customerData'
import type { TableColumn } from '@/widgets/table/model/TableColumn'

const customerColumns: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'phone', title: 'Phone' },
  { key: 'email', title: 'Email' },
  { key: 'dataJoined', title: 'Data Joined' },
]

const Customers = () => {
  return (
    <CustomerContext.Provider value={customerColumns}>
      <Table />
    </CustomerContext.Provider>
  )
}

export default Customers
