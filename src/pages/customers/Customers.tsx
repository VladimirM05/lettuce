import { useTableData } from '@/shared/hooks/useTableData'
import type { TableColumn } from '@/shared/types/TableColumn'
import { customers } from '@/entities/customers/api/customers.api'
import { Table } from '@/widgets/table'

const customerColumns: TableColumn[] = [
  { key: 'name', title: 'Name', searchable: true },
  { key: 'phone', title: 'Phone', searchable: true },
  { key: 'email', title: 'Email', searchable: true },
  { key: 'dateJoined', title: 'Date Joined', searchable: false },
]

const Customers = () => {
  const customerData1 = useTableData({
    fetchFn: customers,
    columns: customerColumns,
  })

  const customerData2 = useTableData({
    fetchFn: customers,
    columns: customerColumns,
  })

  return (
    <>
      <Table {...customerData1} columns={customerColumns} />
      <Table {...customerData2} columns={customerColumns} />
    </>
  )
}

export default Customers
