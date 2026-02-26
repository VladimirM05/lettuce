import type { TableColumn } from "@/widgets/table/model/TableColumn"
import styles from "./TableHeader.module.scss"

interface TableHeaderProps {
  columns: TableColumn[]
}

export const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead className={styles.adminTableHeader} style={{ gridTemplateColumns: `repeat(${columns?.length}, 1fr)` }}>
      {columns.map((column) => (
        <tr className={styles.adminTableHeaderRow} key={column.key}>
          <th className={styles.adminTableHeaderColumn}>{column.title}</th>
        </tr>
      ))}
    </thead>
  )
}
