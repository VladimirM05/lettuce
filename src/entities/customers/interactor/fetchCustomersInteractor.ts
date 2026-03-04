import type { TableColumn } from '@/shared/types/TableColumn'
import { filterAndPaginateCustomers } from '@/entities/customers/domain/filterAndPaginateCustomers.ts'
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
    return filterAndPaginateCustomers({
      columns: columns,
      customers: customers,
      searchValue: searchValue,
      currentPage: currentPage,
      rowsCount: rowsCount,
    })
  }
}
