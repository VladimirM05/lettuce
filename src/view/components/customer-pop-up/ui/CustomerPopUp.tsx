import { useState } from "react"
import clsx from "clsx"
import type { Customer } from "@/domain/entities/Customer.ts"
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
    <form className={styles["customer-pop-up"]} action="/public" method="POST">
      <h4 className={styles["customer-pop-up__title"]}>Customer information</h4>
      <ul className={styles["customer-pop-up__list"]}>
        {Object.keys(customer)
          .slice(1)
          .map((column) => (
            <li className={styles["customer-pop-up__item"]} key={column}>
              <label className={styles["customer-pop-up__label"]}>
                {column}
              </label>
              <input
                className={styles["customer-pop-up__value"]}
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
      <div className={styles["customer-pop-up__action-bar"]}>
        <button
          className={clsx(
            styles["customer-pop-up__button"],
            styles["customer-pop-up__button--cancel"],
          )}
          onClick={() => onVisibleCustomerPopUpChange(false)}
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
        >
          Confirm
        </button>
      </div>
    </form>
  )
}
