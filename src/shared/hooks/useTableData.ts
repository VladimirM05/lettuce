import { useEffect, useState } from 'react'
import { searchData } from '@/widgets/table/model/searchData'
import type { TableColumn } from '@/shared/types/TableColumn'

interface UseTableDataProps<T> {
  fetchFn: () => Promise<T[]>
  columns: TableColumn[]
  rowsValue?: number
}

export const useTableData = <T extends object>({ fetchFn, columns, rowsValue = 10 }: UseTableDataProps<T>) => {
  const [rawData, setRawData] = useState<T[]>([])
  // Значение поиска, используемое для фильтрации.
  const [searchValue, setSearchValue] = useState('')
  // Количество строк в таблице.
  const [rowsCount, setRowsCount] = useState<number>(rowsValue)
  // Текущая страница в таблице.
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect((): void => {
    const loadData = async (): Promise<void> => {
      const result: T[] = await fetchFn()
      setRawData(result)
    }
    void loadData()
  }, [fetchFn])

  const filteredData: T[] = searchData({
    columns: columns,
    data: rawData,
    searchQuery: searchValue,
  })

  const start: number = (currentPage - 1) * rowsCount
  const data: T[] = filteredData.slice(start, start + rowsCount)

  const totalPages: number = Math.ceil(filteredData.length / rowsCount) || 1

  return {
    columns,
    data,
    setSearchValue,
    rowsCount,
    setRowsCount,
    currentPage,
    setCurrentPage,
    totalPages,
  }
}
