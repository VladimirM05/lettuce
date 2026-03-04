import { searchData } from '@/shared/ui/table/model/searchData'
import type { TableColumn } from '@/shared/types/TableColumn'
import type { CustomerData } from '@/entities/customers/types/customers'

interface FilterAndPaginateCustomersProps {
  columns: TableColumn<CustomerData>[]
  customers: CustomerData[]
  searchValue: string
  currentPage: number
  rowsCount: number
}

interface FilterAndPaginateCustomersInfo {
  slicedCustomers: CustomerData[]
  totalPages: number
}

export const filterAndPaginateCustomers = ({
  columns,
  customers,
  searchValue,
  currentPage,
  rowsCount,
}: FilterAndPaginateCustomersProps): FilterAndPaginateCustomersInfo => {
  const filteredCustomers = searchData({
    columns: columns,
    data: customers,
    searchQuery: searchValue,
  })

  const totalPages = Math.max(Math.ceil(filteredCustomers.length / rowsCount), 1)

  const start = (currentPage - 1) * rowsCount
  const slicedCustomers = filteredCustomers.slice(start, start + rowsCount)

  return { slicedCustomers, totalPages }
}
