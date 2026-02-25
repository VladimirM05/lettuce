import { type Dispatch, type SetStateAction, useContext } from 'react'
import { CustomerContext } from '@/pages/customers/model/CustomerContext'
import Search from '@/widgets/table/assets/search.svg?react'
import Cross from '@/widgets/table/assets/cross.svg?react'
import styles from './SearchInput.module.scss'

interface SearchInputProps {
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  onEnter: Dispatch<SetStateAction<string>>
}

export const SearchInput = ({ inputValue, setInputValue, onEnter }: SearchInputProps) => {
  const context = useContext(CustomerContext)!
  const { setSearchQuery } = context

  const handleClear = () => {
    setInputValue('')
    setSearchQuery('')
  }

  return (
    <div className={styles.search}>
      <Search className={styles.searchImg} />
      <input
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnter(inputValue)}
        placeholder="Search"
        type="text"
      />
      {inputValue && <Cross className={styles.cross} onClick={() => handleClear()} />}
    </div>
  )
}
