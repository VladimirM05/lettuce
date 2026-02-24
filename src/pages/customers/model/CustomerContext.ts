import * as React from 'react'
import { createContext } from 'react'
import type { CustomerData } from '@/pages/customers/model/customerData'
import type { TableColumn } from '@/widgets/table/model/TableColumn.ts'

export interface CustomerContext {
  columns: TableColumn[]
  data: CustomerData[]
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const CustomerContext = createContext<CustomerContext | null>(null)
