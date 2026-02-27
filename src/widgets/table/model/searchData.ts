import type { TableColumn } from '@/shared/types/TableColumn.ts'

interface SearchDataProps<T> {
  columns: TableColumn[]
  data: T[]
  searchQuery: string
}

export const searchData = <T>({ columns, data, searchQuery }: SearchDataProps<T>): T[] => {
  const query: string = searchQuery.toLowerCase()

  return data.filter((row: T): boolean =>
    columns.some((column: TableColumn): boolean => {
      if (!column.searchable) return false

      const key: keyof T = column.key as keyof T
      const value: T[keyof T] = row[key]

      return typeof value === 'string' && value.toLowerCase().includes(query)
    }),
  )
}
