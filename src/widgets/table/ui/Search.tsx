import { type Dispatch, type SetStateAction, useState } from 'react'
import { SearchInput } from './SearchInput'
import styles from './Search.module.scss'

interface SearchProps {
  setSearchValue: Dispatch<SetStateAction<string>>
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export const Search = ({ setSearchValue, setCurrentPage }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleSearch = (searchValue: string): void => {
    setSearchValue(searchValue)
    setCurrentPage(1)
  }

  return (
    <div className={styles.search}>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} handleSearch={handleSearch} />
      <button className={styles.searchButton} onClick={() => handleSearch(inputValue)}>
        Search
      </button>
    </div>
  )
}
