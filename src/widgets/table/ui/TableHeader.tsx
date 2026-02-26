import type { TableColumn } from '@/shared/types/TableColumn.ts'
import styles from './TableHeader.module.scss'

interface TableHeaderProps {
  columns: TableColumn[]
}

export const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead className={styles.tableHeader} style={{ gridTemplateColumns: `repeat(${columns?.length}, 1fr)` }}>
      {columns.map((column) => (
        <tr className={styles.tableHeaderRow} key={column.key}>
          <th className={styles.tableHeaderColumn}>{column.title}</th>
        </tr>
      ))}
    </thead>
  )
}
