import { type Dispatch, type SetStateAction, useState } from "react"
import clsx from "clsx"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import type { Customer } from "@/domain/entities/Customer"
import styles from "./CustomerPopUp.module.scss"

interface CustomerPopUpProps {
  columns: TableColumn<Customer>[]
  customer: Customer
  setVisiblePopUp: Dispatch<SetStateAction<boolean>>
  handleUpdateCustomer: (customer: Customer) => void
}

export const CustomerPopUp = ({
  columns,
  customer,
  setVisiblePopUp,
  handleUpdateCustomer,
}: CustomerPopUpProps) => {
  const [editedCustomer, setEditedCustomer] = useState<Customer>(customer)

  return (
    <form className={styles["customer-pop-up"]} action="/" method="POST">
      <h4 className={styles["customer-pop-up__title"]}>Customer information</h4>
      <ul className={styles["customer-pop-up__list"]}>
        {columns.map((column) => (
          <li className={styles["customer-pop-up__item"]} key={column.key}>
            <label
              className={styles["customer-pop-up__label"]}
              htmlFor={column.key}
            >
              {column.title}
            </label>
            <input
              className={styles["customer-pop-up__value"]}
              type="text"
              value={editedCustomer[column.key]}
              onChange={(e) => {
                setEditedCustomer((prev) => ({
                  ...prev,
                  [column.key]: e.target.value,
                }))
              }}
            />
          </li>
        ))}
      </ul>
      <div className={styles["customer-pop-up__action-bar"]}>
        <button
          className={clsx(
            styles["customer-pop-up__button"],
            styles["customer-pop-up__button--cancel"],
          )}
          onClick={() => setVisiblePopUp(false)}
        >
          Cancel
        </button>
        <button
          className={clsx(
            styles["customer-pop-up__button"],
            styles["customer-pop-up__button--confirm"],
          )}
          onClick={() => {
            handleUpdateCustomer(editedCustomer)
            setVisiblePopUp(false)
          }}
        >
          Confirm
        </button>
      </div>
    </form>
  )
}
