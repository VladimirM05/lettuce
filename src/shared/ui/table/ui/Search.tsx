import { useState } from 'react'
import SearchIcon from '../assets/search.svg?react'
import CrossIcon from '@/shared/ui/table/assets/cross.svg?react'
import styles from './Search.module.scss'

interface SearchProps {
  onSearch: (value: string) => void
}

export const Search = ({ onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleClear = () => {
    setInputValue('')
    onSearch('')
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchInputWrapper}>
        <SearchIcon />
        <input
          className={styles.searchInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(inputValue)}
          placeholder="Search"
          type="text"
        />
        {inputValue && <CrossIcon className={styles.cross} onClick={handleClear} />}
      </div>
      <button className={styles.searchButton} onClick={() => onSearch(inputValue)}>
        Search
      </button>
    </div>
  )
}
