import { useContext, useState } from 'react'
import clsx from 'clsx'
import { TableContext } from '@/widgets/table/model/TableContext'
import PaginationSelectImg from '@/widgets/table/assets/arrow-down.svg?react'
import styles from './PaginationSelect.module.scss'

const options: readonly number[] = [10, 50, 100]

export const PaginationSelect = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const context = useContext(TableContext)!
  const { rowsPerPage, setRowsPerPage, currentPage, setCurrentPage, totalPages } = context

  const handleSelect = (option: number): void => {
    setRowsPerPage(option)
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }

  return (
    <div className={styles.paginationSelect} onClick={() => setIsOpen((prev) => !prev)}>
      <span className={styles.paginationOption}>{rowsPerPage}</span>
      <PaginationSelectImg className={clsx(styles.paginationSelectImg, isOpen && styles.open)} />

      {isOpen && (
        <ul className={styles.paginationOptionList}>
          {options.map((option) => (
            <li
              className={clsx(styles.paginationOptionItem, option === rowsPerPage && styles.selected)}
              onClick={() => handleSelect(option)}
              key={option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
