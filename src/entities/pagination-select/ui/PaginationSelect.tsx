import { useState } from 'react'
import clsx from 'clsx'
import PaginationSelectImg from '@/app/assets/images/arrow-down.svg?react'
import styles from './PaginationSelect.module.scss'

const options: number[] = [10, 50, 100]

export const PaginationSelect = () => {
  const [selectValue, setSelectValue] = useState<number>(10)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className={styles.paginationSelect}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className={styles.paginationOption}>{selectValue}</span>
      <PaginationSelectImg
        className={clsx(styles.paginationSelectImg, isOpen ? styles.open : '')}
      />
      {isOpen && (
        <ul className={styles.paginationOptionList}>
          {options.map((option) => (
            <li
              className={option === selectValue ? styles.selected : ''}
              onClick={() => setSelectValue(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
