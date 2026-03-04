import { useEffect, useState } from 'react'
import { searchData } from '@/shared/ui/table/model/searchData'
import type { TableColumn } from '@/shared/types/TableColumn'

interface UseTableDataProps<T> {
  fetchFn: () => Promise<T[]>
  columns: TableColumn<T>[]
  rowsValue?: number
}

export const useTableData = <T extends object>({ fetchFn, columns, rowsValue = 10 }: UseTableDataProps<T>) => {
  const [rawData, setRawData] = useState<T[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [rowsCount, setRowsCount] = useState<number>(rowsValue)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect((): void => {
    const loadData = async (): Promise<void> => {
      const result: T[] = await fetchFn()
      setRawData(result)
    }
    void loadData()
  }, [fetchFn])

  // Filtering the data by the value in the search.
  const filteredData: T[] = searchData({
    columns: columns,
    data: rawData,
    searchQuery: searchValue,
  })

  // We calculate the beginning and end of the slice and produce it.
  const start: number = (currentPage - 1) * rowsCount
  const data: T[] = filteredData.slice(start, start + rowsCount)

  const onSearch = (value: string): void => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  const totalPages: number = Math.ceil(filteredData.length / rowsCount) || 1

  const applyPage = (value: number): void => {
    const page = Math.min(Math.max(value, 1), totalPages) || currentPage
    setCurrentPage(page)
  }

  const onRowsChange = (value: number): void => {
    setRowsCount(value)
    setCurrentPage(1)
  }

  return {
    columns,
    data,
    onSearch,
    rowsCount,
    currentPage,
    totalPages,
    applyPage,
    onRowsChange,
  }
}
