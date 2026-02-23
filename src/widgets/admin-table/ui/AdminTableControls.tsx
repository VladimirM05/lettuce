import { SearchInput } from '@/entities/search-input'
import { SearchBtn } from '@/entities/buttons/search-btn'
import { Pagination } from '@/widgets/pagination'
import styles from './AdminTableControls.module.scss'

export const AdminTableControls = () => {
  return (
    <div className={styles.tableControls}>
      <div className={styles.search}>
        <SearchInput />
        <SearchBtn />
      </div>
      <Pagination />
    </div>
  )
}
