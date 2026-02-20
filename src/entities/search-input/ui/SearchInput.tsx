import { useState } from 'react'
import Search from '@/app/assets/images/search.svg?react'
import Cross from '@/app/assets/images/cross.svg?react'
import styles from './SearchInput.module.scss'

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState<string>('')

  return (
    <div className={styles.search}>
      <div className={styles.searchImg}>
        <Search />
      </div>
      <input
        className={styles.searchInput}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Search"
      />
      {searchValue && (
        <div className={styles.cross} onClick={() => setSearchValue('')}>
          <Cross className={styles.crossImg} />
        </div>
      )}
    </div>
  )
}
