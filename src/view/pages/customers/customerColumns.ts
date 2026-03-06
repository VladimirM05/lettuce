import type { TableColumn } from "@/view/primitives/table/types/TableColumn.ts"
import type { Customer } from "@/domain/entities/Customer.ts"

export const customerColumns: TableColumn<Customer>[] = [
  { key: "name", title: "Name", searchable: true },
  { key: "phone", title: "Phone", searchable: true },
  { key: "email", title: "Email", searchable: true },
  { key: "dateJoined", title: "Date Joined", searchable: false },
]
