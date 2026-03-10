import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import type { Customer } from "@/domain/entities/Customer"

import { TableBody } from "./TableBody"

import ArrowUp from "../images/arrow-up.svg?react"

import styles from "./Table.module.scss"

interface TableProps {
  columns: TableColumn<Customer>[]
  data: Customer[]
  onSelectedCustomerChange: (selectedCustomer: Customer) => void
  onVisibleCustomerPopUpChange: (visible: boolean) => void
}

export const Table = ({
  columns,
  data,
  onSelectedCustomerChange,
  onVisibleCustomerPopUpChange,
}: TableProps) => {
  const [visibleScrollButton, setVisibleScrollButton] = useState<boolean>(false)
  const ref = useRef<HTMLTableSectionElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const shouldShow = element.scrollTop > 300
      setVisibleScrollButton((prev) =>
        prev !== shouldShow ? shouldShow : prev,
      )
    }

    element.addEventListener("scroll", handleScroll)
    return () => element.removeEventListener("scroll", handleScroll)
  }, [ref])

  const scrollToTop = () =>
    ref.current?.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead
          className={styles.tableHeader}
          style={{ gridTemplateColumns: `repeat(${columns?.length}, 1fr)` }}
        >
          {columns.map((column) => (
            <tr className={styles.tableHeaderRow} key={column.title}>
              <th className={styles.tableHeaderColumn}>{column.title}</th>
            </tr>
          ))}
        </thead>
        <TableBody
          ref={ref}
          columns={columns}
          data={data}
          onSelectedCustomerChange={onSelectedCustomerChange}
          onVisibleCustomerPopUpChange={onVisibleCustomerPopUpChange}
        />
      </table>
      <button
        className={clsx(
          styles.scrollToTopButton,
          visibleScrollButton && styles.visible,
        )}
        onClick={scrollToTop}
      >
        <ArrowUp />
      </button>
    </div>
  )
}
