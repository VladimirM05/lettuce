import { Search } from '@/widgets/search'
import { Pagination } from '@/widgets/pagination'
import styles from './TableControls.module.scss'

export const TableControls = () => {
  return (
    <div className={styles.tableControls}>
      <Search />
      <Pagination />
    </div>
  )
}
