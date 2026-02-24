import * as React from 'react'
import Search from '@/widgets/search/assets/search.svg?react'
import Cross from '@/widgets/search/assets/cross.svg?react'
import styles from './SearchInput.module.scss'
import { useContext } from 'react'
import { CustomerContext } from '@/pages/customers/model/CustomerContext.ts'

interface SearchInputProps {
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchInput = ({ inputValue, setInputValue }: SearchInputProps) => {
  const context = useContext(CustomerContext)!
  const { setSearchQuery } = context

  const handleClear = () => {
    setInputValue('') // очищаем input
    setSearchQuery('') // показываем все данные
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchImg}>
        <Search />
      </div>
      <input
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Search"
      />
      {inputValue && (
        <div className={styles.cross} onClick={() => handleClear()}>
          <Cross className={styles.crossImg} />
        </div>
      )}
    </div>
  )
}
