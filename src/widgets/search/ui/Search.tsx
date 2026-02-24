import { SearchInput } from './SearchInput.tsx'
import { SearchBtn } from './SearchBtn.tsx'
import styles from './Search.module.scss'
import { useContext, useState } from 'react'
import { CustomerContext } from '@/pages/customers/model/CustomerContext.ts'

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
