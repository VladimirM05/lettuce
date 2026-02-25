import { useContext, useState } from 'react'
import { SearchInput } from './SearchInput'
import { SearchBtn } from './SearchBtn'
import { CustomerContext } from '@/pages/customers/model/CustomerContext'
import styles from './Search.module.scss'

export const Search = () => {
  const { setSearchQuery } = useContext(CustomerContext)!
  const [inputValue, setInputValue] = useState('')

  const handleSearch = () => {
    setSearchQuery(inputValue)
  }

  return (
    <div className={styles.adminSearch}>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
      <SearchBtn onClick={handleSearch} />
    </div>
  )
}
