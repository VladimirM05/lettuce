import { Table } from '@/widgets/table'
import { useTableData } from '@/shared/hooks/useTableData'
import { customers } from '@/entities/customers/api/customers.api'
import type { TableColumn } from '@/shared/types/TableColumn'

const userColumns: TableColumn[] = [
  { key: 'name', title: 'Name', searchable: true },
  { key: 'phone', title: 'Phone', searchable: true },
  { key: 'email', title: 'Email', searchable: true },
  { key: 'dateJoined', title: 'Date Joined', searchable: false },
]

const Users = () => {
  const usersData = useTableData({
    fetchFn: customers,
    columns: userColumns,
    rowsValue: 50,
  })

  return <Table {...usersData} />
}

export default Users
