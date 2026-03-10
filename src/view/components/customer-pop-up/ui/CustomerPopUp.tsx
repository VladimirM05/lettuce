import { useState } from "react"
import clsx from "clsx"
import type { Customer } from "@/domain/entities/Customer"
import styles from "./CustomerPopUp.module.scss"

interface CustomerPopUpProps {
  customer: Customer
  onVisibleCustomerPopUpChange: (visible: boolean) => void
  handleUpdateCustomer: (customer: Customer) => void
}

export const CustomerPopUp = ({
  customer,
  onVisibleCustomerPopUpChange,
  handleUpdateCustomer,
}: CustomerPopUpProps) => {
  const [editedCustomer, setEditedCustomer] = useState<Customer>(customer)

  return (
    <section className={styles["customer-pop-up"]}>
      <h2 className={styles["customer-pop-up__title"]}>Customer information</h2>

      <ul className={styles["customer-pop-up__list"]}>
        {(Object.keys(customer) as (keyof Customer)[])
          .slice(1)
          .map((column) => (
            <li className={styles["customer-pop-up__item"]} key={column}>
              <label
                className={styles["customer-pop-up__label"]}
                htmlFor={column}
              >
                {column}
              </label>
              <input
                id={column}
                className={styles["customer-pop-up__input"]}
                type="text"
                value={editedCustomer[column]}
                onChange={(e) => {
                  setEditedCustomer((prev) => ({
                    ...prev,
                    [column]: e.target.value,
                  }))
                }}
              />
            </li>
          ))}
      </ul>

      <div className={styles["customer-pop-up__actions"]}>
        <button
          className={clsx(
            styles["customer-pop-up__button"],
            styles["customer-pop-up__button--cancel"],
          )}
          onClick={() => onVisibleCustomerPopUpChange(false)}
          type="button"
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
            onVisibleCustomerPopUpChange(false)
          }}
          type="button"
        >
          Confirm
        </button>
      </div>
    </section>
  )
}
