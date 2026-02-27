import { useEffect, useState } from 'react'
import { searchData } from '@/widgets/table/model/searchData'
import type { TableColumn } from '@/shared/types/TableColumn'

interface UseTableDataProps<T> {
  fetchFn: () => Promise<T[]>
  columns: TableColumn[]
}

export const useTableData = <T extends object>({ fetchFn, columns }: UseTableDataProps<T>) => {
  const [data, setData] = useState<T[]>([])
  // Значение поиска, используемое для фильтрации.
  const [searchValue, setSearchValue] = useState('')
  // Количество строк в таблице.
  const [rowsCount, setRowsCount] = useState<number>(10)
  // Текущая страница в таблице.
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect((): void => {
    const loadData = async () => {
      const result = await fetchFn()
      setData(result)
    }
    void loadData()
  }, [fetchFn])

  const filteredData: T[] = searchData({
    columns: columns,
    data: data,
    searchQuery: searchValue,
  })

  const start: number = (currentPage - 1) * rowsCount
  const paginatedData: T[] = filteredData.slice(start, start + rowsCount)

  const totalPages: number = Math.ceil(filteredData.length / rowsCount) || 1

  return {
    data: paginatedData,
    setSearchValue,
    rowsCount,
    setRowsCount,
    currentPage,
    setCurrentPage,
    totalPages,
  }
}
