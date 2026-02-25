import { useContext, useState } from 'react'
import clsx from 'clsx'
import PaginationSelectImg from '@/widgets/pagination/assets/arrow-down.svg?react'
import styles from './PaginationSelect.module.scss'
import { TableContext } from '@/widgets/table/model/TableContext.ts'

const options: number[] = [10, 50, 100]

export const PaginationSelect = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const context = useContext(TableContext)!
  const { rowsPerPage, setRowsPerPage, currentPage, setCurrentPage, totalPages } = context

  const handleSelect = (option: number): void => {
    setRowsPerPage(option)

    const newTotalPages = Math.ceil(totalPages * (rowsPerPage / option)) // можно пересчитать динамически
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages)
    }
  }

  return (
    <div className={styles.paginationSelect} onClick={() => setIsOpen((prev) => !prev)}>
      <span className={styles.paginationOption}>{rowsPerPage}</span>
      <PaginationSelectImg className={clsx(styles.paginationSelectImg, isOpen ? styles.open : '')} />
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
