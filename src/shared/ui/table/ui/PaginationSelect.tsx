import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import PaginationSelectIcon from '@/shared/ui/table/assets/arrow-down.svg?react'
import styles from './PaginationSelect.module.scss'

interface PaginationSelectProps {
  rowsCount: number
  onChange: (value: number) => void
}

const options: readonly number[] = [10, 50, 100]

export const PaginationSelect = ({ rowsCount, onChange }: PaginationSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: number): void => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className={styles.paginationSelect}>
      <div className={styles.paginationSelectInner} onClick={() => setIsOpen((prev) => !prev)}>
        <span className={styles.paginationOption}>{rowsCount}</span>
        <PaginationSelectIcon className={clsx(styles.paginationSelectImg, isOpen && styles.open)} />
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
