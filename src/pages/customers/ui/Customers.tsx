import { useState } from 'react'
import { Table } from '@/widgets/table'
import { CustomerContext } from '../model/CustomerContext.ts'
import { customerData } from '@/pages/customers/model/customerData'
import type { TableColumn } from '@/widgets/table/model/TableColumn'

const customerColumns: TableColumn[] = [
  { key: 'name', title: 'Name', searchable: true },
  { key: 'phone', title: 'Phone', searchable: true },
  { key: 'email', title: 'Email', searchable: true },
  { key: 'dateJoined', title: 'Date Joined', searchable: false },
]

export const Customers = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <CustomerContext.Provider
      value={{
        columns: customerColumns,
        data: customerData,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
      }}
    >
      <Table />
    </CustomerContext.Provider>
  )
}
