import { SearchInput } from './SearchInput.tsx'
import { SearchBtn } from './SearchBtn.tsx'
import styles from './Search.module.scss'

export const Search = () => {
  return (
    <div className={styles.adminSearch}>
      <SearchInput />
      <SearchBtn />
    </div>
  )
}
