import { type Dispatch, type SetStateAction, useState } from "react"
import { SearchInput } from "./SearchInput"
import styles from "./Search.module.scss"

interface SearchProps {
  setSearch: Dispatch<SetStateAction<string>>
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export const Search = ({ setSearch, setCurrentPage }: SearchProps) => {
  const [inputValue, setInputValue] = useState("")

  const handleSearch = () => {
    setSearch(inputValue)
    setCurrentPage(1)
  }

  return (
    <div className={styles.search}>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} onEnter={handleSearch} setSearch={setSearch} />
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}
