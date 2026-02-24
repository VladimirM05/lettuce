import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { TableControls } from './TableControls'
import styles from './Table.module.scss'

export const Table = () => {
  return (
    <div className={styles.adminTableWrapper}>
      <TableControls />
      <table className={styles.adminTable}>
        <TableHeader />
        <TableBody />
      </table>
    </div>
  )
}
