import { Table } from '@/widgets/table'
import { customerData } from '@/pages/customers/model/customerData'
import type { TableColumn } from '@/shared/types/TableColumn.ts'

const customerColumns: TableColumn[] = [
  { key: 'name', title: 'Name', searchable: true },
  { key: 'phone', title: 'Phone', searchable: true },
  { key: 'email', title: 'Email', searchable: true },
  { key: 'dateJoined', title: 'Date Joined', searchable: false },
]

export const Customers = () => <Table columns={customerColumns} data={customerData} />
