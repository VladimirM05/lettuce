import * as React from 'react'
import { createContext } from 'react'

interface TableContext {
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
}

export const TableContext = createContext<TableContext | null>(null)
