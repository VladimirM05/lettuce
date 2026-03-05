export interface TableColumn<T> {
  key: keyof T
  title: string
  searchable: boolean
}
