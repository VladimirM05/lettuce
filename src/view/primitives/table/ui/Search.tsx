import { useState } from "react"
import SearchIcon from "../images/search.svg?react"
import CrossIcon from "../images/cross.svg?react"
import styles from "./Search.module.scss"

interface SearchProps {
  onSearchValueChange: (value: string) => void
  onCurrentPageChange: (page: number) => void
}

export const Search = ({
  onSearchValueChange,
  onCurrentPageChange,
}: SearchProps) => {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className={styles.search}>
      <div className={styles.searchInputWrapper}>
        <SearchIcon />
        <input
          className={styles.searchInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && onSearchValueChange(inputValue)
          }
          placeholder="Search"
          type="text"
        />
        {inputValue && (
          <CrossIcon
            className={styles.cross}
            onClick={() => {
              setInputValue("")
              onSearchValueChange("")
            }}
          />
        )}
      </div>
      <button
        className={styles.searchButton}
        onClick={() => {
          onSearchValueChange(inputValue)
          onCurrentPageChange(1)
        }}
      >
        Search
      </button>
    </div>
  )
}
