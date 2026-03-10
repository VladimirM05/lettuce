import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import NoResultsIcon from "../images/no-results.svg?react"
import ArrowUpIcon from "../images/arrow-up.svg?react"
import styles from "./Table.module.scss"

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  onSelectedRowChange: (selectedRow: T) => void
}

export const Table = <T,>({
  columns,
  data,
  onSelectedRowChange,
}: TableProps<T>) => {
  const [visibleScrollButton, setVisibleScrollButton] = useState<boolean>(false)
  const ref = useRef<HTMLTableSectionElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const shouldShow = element.scrollTop > 300
      setVisibleScrollButton(prev => (prev !== shouldShow ? shouldShow : prev))
    }

    element.addEventListener("scroll", handleScroll)
    return () => element.removeEventListener("scroll", handleScroll)
  }, [ref])

  const scrollToTop = () =>
    ref.current?.scrollTo({ top: 0, behavior: "smooth" })

  const gridTemplateColumns = `repeat(${columns?.length}, 1fr)`

  return (
    <div className={styles["table-wrapper"]}>
      <table className={styles["table-wrapper__table"]}>
        <thead
          className={styles["table-wrapper__header"]}
          style={{ gridTemplateColumns }}
        >
          {columns.map(column => (
            <tr
              className={styles["table-wrapper__header-row"]}
              key={column.title}
            >
              <th className={styles["table-wrapper__header-cell"]}>
                {column.title}
              </th>
            </tr>
          ))}
        </thead>

        <tbody className={styles["table-wrapper__body"]} ref={ref}>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                className={styles["table-wrapper__body-row"]}
                style={{ gridTemplateColumns }}
                onClick={() => onSelectedRowChange(row)}
                key={rowIndex}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    className={styles["table-wrapper__body-cell"]}
                    key={columnIndex}
                  >
                    {String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className={styles["table-wrapper__no-results"]}
                colSpan={columns.length || 1}
              >
                <NoResultsIcon />
                <span className={styles["table-wrapper__no-results-text"]}>
                  No results found
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        className={clsx(
          styles["table_wrapper__scroll-button"],
          visibleScrollButton &&
            styles["table_wrapper__scroll-button--visible"],
        )}
        onClick={scrollToTop}
      >
        <ArrowUpIcon />
      </button>
    </div>
  )
}
