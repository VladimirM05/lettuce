import { searchData } from '@/shared/ui/table/model/searchData'
import type { TableColumn } from '@/shared/types/TableColumn'
import { fetchCustomers } from '@/entities/customers/api/customers.api'
import type { CustomerData } from '@/entities/customers/types/customers'

interface GetCustomersProps {
  columns: TableColumn<CustomerData>[]
  searchValue: string
  currentPage: number
  rowsCount: number
}

export class FetchCustomersInteractor {
  getCustomers = async ({ columns, searchValue, currentPage, rowsCount }: GetCustomersProps) => {
    const customers: CustomerData[] = await fetchCustomers()

    const filteredCustomers = searchData({
      columns: columns,
      data: customers,
      searchQuery: searchValue,
    })

    const totalPages = Math.ceil(filteredCustomers.length / rowsCount) || 1

    const start = (currentPage - 1) * rowsCount
    const slicedCustomers = filteredCustomers.slice(start, start + rowsCount)

    return { slicedCustomers, totalPages }
  }
}
