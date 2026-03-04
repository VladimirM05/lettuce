import { useEffect, useState } from 'react'
import type { TableColumn } from '@/shared/types/TableColumn'
import { FetchCustomersInteractor } from '@/entities/customers/domain/fetchCustomersInteractor'
import type { CustomerData } from '@/entities/customers/types/customers'
import { Table } from '@/shared/ui/table'

const customerColumns: TableColumn<CustomerData>[] = [
  { key: 'name', title: 'Name', searchable: true },
  { key: 'phone', title: 'Phone', searchable: true },
  { key: 'email', title: 'Email', searchable: true },
  { key: 'dateJoined', title: 'Date Joined', searchable: false },
]

const interactor = new FetchCustomersInteractor()

const Customers = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [rowsCount, setRowsCount] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadCustomers = async () => {
      const result = await interactor.getCustomers({
        columns: customerColumns,
        searchValue: searchValue,
        currentPage: currentPage,
        rowsCount: rowsCount,
      })

      setCustomers(result.slicedCustomers)
      setTotalPages(result.totalPages)
    }

    void loadCustomers()
  }, [searchValue, currentPage, rowsCount])

  const onSearchValueChange = (value: string): void => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  const onCurrentPageChange = (value: number): void => setCurrentPage(value)

  const onRowsCountChange = (value: number): void => {
    setRowsCount(value)
    setCurrentPage(1)
  }

  return (
    <Table
      columns={customerColumns}
      data={customers}
      onSearchValueChange={onSearchValueChange}
      rowsCount={rowsCount}
      currentPage={currentPage}
      totalPages={totalPages}
      onCurrentPageChange={onCurrentPageChange}
      onRowsCountChange={onRowsCountChange}
    />
  )
}

export default Customers
