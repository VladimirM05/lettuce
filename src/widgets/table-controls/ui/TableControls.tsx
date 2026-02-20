import { SearchInput } from '@/entities/search-input'
import { SearchBtn } from '@/entities/search-btn'
import styles from './TableControls.module.scss'

export const TableControls = () => {
  return (
    <div className={styles.tableControls}>
      <div className={styles.search}>
        <SearchInput />
        <SearchBtn />
      </div>
    </div>
  )
}
