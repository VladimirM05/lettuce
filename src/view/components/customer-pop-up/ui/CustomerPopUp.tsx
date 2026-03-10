import { useEffect, useState } from "react"
import { CustomersInteractor } from "@/domain/interactors/CustomersInteractor"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn"
import type { Customer } from "@/domain/entities/Customer"
import styles from "./CustomerPopUp.module.scss"
import clsx from "clsx"

interface CustomerPopUpProps {
  columns: TableColumn<Customer>[]
  customer: Customer
}

export const CustomerPopUp = ({ columns, customer }: CustomerPopUpProps) => {
  const [editedCustomer, setEditedCustomer] = useState<Customer>(customer)

  useEffect(() => {
    CustomersInteractor.updateCustomer(editedCustomer)
  }, [editedCustomer])

  return (
    <form className={styles["customer-pop-up"]} action="/" method="POST">
      <h4 className={styles["customer-pop-up__title"]}>Customer information</h4>
      <ul className={styles["customer-pop-up__list"]}>
        {columns.map((column) => (
          <li className={styles["customer-pop-up__item"]} key={column.key}>
            <label className={styles["customer-pop-up__label"]}>
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
        >
          Cancel
        </button>
        <button
          className={clsx(
            styles["customer-pop-up__button"],
            styles["customer-pop-up__button--confirm"],
          )}
        >
          Confirm
        </button>
      </div>
    </form>
  )
}
