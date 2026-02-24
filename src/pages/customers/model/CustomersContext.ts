import { createContext } from 'react'
import type { TableColumn } from '@/widgets/table/model/TableColumn.ts'

export const CustomerContext = createContext<TableColumn[] | null>(null)
