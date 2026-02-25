import type { TableColumn } from '@/widgets/table/model/TableColumn'

export const useSearch = <G>(data: G[], columns: TableColumn[], searchQuery: string) => {
  const query: string = searchQuery.toLowerCase()

  const filteredData = data.filter((row) =>
    columns.some((column) => {
      if (!column.searchable) return false

      const key = column.key as keyof G
      const value = row[key]

      return typeof value === 'string' && value.toLowerCase().includes(query)
    }),
  )

  return { filteredData }
}
