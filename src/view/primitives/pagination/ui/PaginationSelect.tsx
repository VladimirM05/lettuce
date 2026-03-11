import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import PaginationSelectIcon from "../images/arrow-down.svg?react"
import styles from "./PaginationSelect.module.scss"

interface PaginationSelectProps {
  rowsCount: number
  onChange: (value: number) => void
  onCurrentPageChange: (page: number) => void
}

const options: readonly number[] = [10, 50, 100]

export const PaginationSelect = ({
  rowsCount,
  onChange,
  onCurrentPageChange,
}: PaginationSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={styles["pagination-select"]} ref={ref}>
      <div
        className={styles["pagination-select__inner"]}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={styles["pagination-select__option"]}>{rowsCount}</span>
        <PaginationSelectIcon
          className={clsx(
            styles["pagination-select__img"],
            isOpen && styles["pagination-select__img--open"],
          )}
        />
      </div>

      {isOpen && (
        <ul className={styles["pagination-select__list"]}>
          {options.map(option => (
            <li
              className={clsx(
                styles["pagination-select__item"],
                option === rowsCount &&
                  styles["pagination-select__item--selected"],
              )}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
                onCurrentPageChange(1)
              }}
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
