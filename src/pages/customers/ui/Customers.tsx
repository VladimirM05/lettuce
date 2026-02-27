import { useEffect, useState } from 'react'
import type { TableColumn } from '@/shared/types/TableColumn'
import { Table } from '@/widgets/table'
import { searchData } from '@/widgets/table/model/searchData'

const customerColumns: TableColumn[] = [
  { key: 'name', title: 'Name', searchable: true },
  { key: 'phone', title: 'Phone', searchable: true },
  { key: 'email', title: 'Email', searchable: true },
  { key: 'dateJoined', title: 'Date Joined', searchable: false },
]

interface CustomerData {
  name: string
  phone: string
  email?: string
  dateJoined: string
}

export const Customers = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([])
  // Значение поиска, используемое для фильтрации.
  const [searchValue, setSearchValue] = useState('')
  // Суммарное количество страниц в таблице.
  const [totalPages, setTotalPages] = useState<number>(0)
  // Количество строк в таблице.
  const [rowsCount, setRowsCount] = useState<number>(10)
  // Текущая страница в таблице.
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fetchCustomers = async (searchValue: string, rowsCount: number, currentPage: number): Promise<void> => {
    const result: Response = await fetch('/mock-customers.json')
    const data: { count: number; data: CustomerData[] } = await result.json()

    const filteredData: CustomerData[] = searchValue
      ? searchData({
          columns: customerColumns,
          data: data.data,
          searchQuery: searchValue,
        })
      : data.data

    const startIndex: number = (currentPage - 1) * rowsCount
    const endIndex: number = startIndex + rowsCount

    setCustomers(filteredData.slice(startIndex, endIndex))
    setTotalPages(Math.ceil(filteredData.length / rowsCount) || 1)
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchCustomers(searchValue, rowsCount, currentPage)
    }

    loadData()
  }, [searchValue, rowsCount, currentPage])

  return (
    <Table
      columns={customerColumns}
      data={customers}
      setSearchValue={setSearchValue}
      rowsCount={rowsCount}
      setRowsCount={setRowsCount}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  )
}
