import { useTableData } from '@/shared/hooks/useTableData'
import type { TableColumn } from '@/shared/types/TableColumn'
import { customers } from '@/entities/customers/api/customers.api'
import { Table } from '@/shared/ui/table'

interface Customer {
  name: string
  phone: string
  email?: string
  dateJoined: string
}

const customerColumns: TableColumn<Customer>[] = [
  { key: 'name', title: 'Name', searchable: true },
  { key: 'phone', title: 'Phone', searchable: true },
  { key: 'email', title: 'Email', searchable: true },
  { key: 'dateJoined', title: 'Date Joined', searchable: false },
]

const Customers = () => {
  const { columns, data, onSearch, rowsCount, currentPage, totalPages, applyPage, onRowsChange } = useTableData({
    fetchFn: customers,
    columns: customerColumns,
  })

  return (
    <Table
      columns={columns}
      data={data}
      onSearch={onSearch}
      rowsCount={rowsCount}
      currentPage={currentPage}
      totalPages={totalPages}
      applyPage={applyPage}
      onRowsChange={onRowsChange}
    />
  )
}

export default Customers
