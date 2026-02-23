import { createContext } from 'react'
import type { AdminTableColumn } from '@/widgets/admin-table/model/AdminTableColumn.ts'

export const CustomerContext = createContext<AdminTableColumn[] | null>(null)
