import { useContext, useState } from "react"
import { SearchInput } from "./SearchInput"
import { CustomerContext } from "@/pages/customers/model/CustomerContext"
import { TableContext } from "@/widgets/table/model/TableContext.ts"
import styles from "./Search.module.scss"

export const Search = () => {
  const { setSearchQuery } = useContext(CustomerContext)!
  const { setCurrentPage } = useContext(TableContext)!
  const [inputValue, setInputValue] = useState("")

  const handleSearch = () => {
    setSearchQuery(inputValue)
    setCurrentPage(1)
  }

  return (
    <div className={styles.search}>
      <SearchInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onEnter={handleSearch}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}
