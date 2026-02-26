import type { TableColumn } from '@/shared/types/TableColumn.ts'

export const useSearch = <T>(columns: TableColumn[], data: T[], searchQuery: string) => {
  const query: string = searchQuery.toLowerCase()

  const filteredData = data.filter((row) =>
    columns.some((column) => {
      if (!column.searchable) return false

      const key = column.key as keyof T
      const value = row[key]

      return typeof value === 'string' && value.toLowerCase().includes(query)
    }),
  )

  return { filteredData }
}
