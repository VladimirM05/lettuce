import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import PaginationSelectImg from '@/widgets/table/assets/arrow-down.svg?react'
import styles from './PaginationSelect.module.scss'

const options: readonly number[] = [10, 50, 100]

interface PaginationSelectProps {
  setRowsCount: Dispatch<SetStateAction<number>>
  rowsCount: number
}

export const PaginationSelect = ({ setRowsCount, rowsCount }: PaginationSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (option: number): void => {
    setRowsCount(option)
    // setStartIndex(option)
    // setCurrentPage(1)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className={styles.paginationSelect}>
      <div className={styles.paginationSelectInner} onClick={() => setIsOpen((prev) => !prev)}>
        <span className={styles.paginationOption}>{rowsCount}</span>
        <PaginationSelectImg className={clsx(styles.paginationSelectImg, isOpen && styles.open)} />
      </div>

      {isOpen && (
        <ul className={styles.paginationOptionList}>
          {options.map((option) => (
            <li
              className={clsx(styles.paginationOptionItem, option === rowsCount && styles.selected)}
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
