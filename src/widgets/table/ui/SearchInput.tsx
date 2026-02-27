import { type Dispatch, type SetStateAction } from 'react'
import Search from '@/widgets/table/assets/search.svg?react'
import Cross from '@/widgets/table/assets/cross.svg?react'
import styles from './SearchInput.module.scss'

interface SearchInputProps {
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  handleSearch: (searchValue: string) => void
}

export const SearchInput = ({ inputValue, setInputValue, handleSearch }: SearchInputProps) => {
  const handleClear = () => {
    setInputValue('')
    handleSearch('')
  }

  return (
    <div className={styles.search}>
      <Search className={styles.searchImg} />
      <input
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(inputValue)}
        placeholder="Search"
        type="text"
      />
      {inputValue && <Cross className={styles.cross} onClick={handleClear} />}
    </div>
  )
}
