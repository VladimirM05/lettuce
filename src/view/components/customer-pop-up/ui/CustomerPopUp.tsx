import { type SyntheticEvent, useState } from "react"
import clsx from "clsx"
import { PopUp } from "@/view/primitives/pop-up"
import { ActionButton } from "@/view/primitives/action-button"
import type { Customer } from "@/domain/entities/Customer"
import styles from "./CustomerPopUp.module.scss"

interface CustomerPopUpProps {
  customer: Customer
  onClose: () => void
  onCustomerChange: (customer: Customer) => void
  errors: Partial<Record<keyof Customer, string>> | null
}

interface CustomerFields<T> {
  key: keyof T
  label: string
  type: "text" | "phone" | "email" | "date"
  editable: boolean
}

const customerFields: CustomerFields<Customer>[] = [
  { key: "name", label: "Name", type: "text", editable: true },
  { key: "phone", label: "Phone", type: "phone", editable: true },
  { key: "email", label: "Email", type: "email", editable: true },
  { key: "dateJoined", label: "Date Joined", type: "date", editable: false },
]

export const CustomerPopUp = ({
  customer,
  onClose,
  onCustomerChange,
  errors,
}: CustomerPopUpProps) => {
  const [editedCustomer, setEditedCustomer] = useState<Customer>(() => ({
    ...customer,
  }))

  const handleConfirm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    onCustomerChange(editedCustomer)
  }

  return (
    <PopUp onClose={onClose}>
      <form className={styles["customer-pop-up"]} onSubmit={handleConfirm}>
        <h2 className={styles["customer-pop-up__title"]}>
          Customer information
        </h2>

        <ul className={styles["customer-pop-up__list"]}>
          {customerFields.map(field => (
            <li
              className={styles["customer-pop-up__item"]}
              key={String(field.key)}
            >
              <label
                className={styles["customer-pop-up__label"]}
                htmlFor={String(field.key)}
              >
                {field.label}
              </label>
              <div className={styles["customer-pop-up__wrapper"]}>
                {errors && errors[field.key] && (
                  <span className={styles["customer-pop-up__error-text"]}>
                    {errors[field.key]}
                  </span>
                )}
                <input
                  id={String(field.key)}
                  className={clsx(
                    styles["customer-pop-up__input"],
                    !field.editable &&
                      styles["customer-pop-up__input--disabled"],
                  )}
                  type={field.type}
                  value={String(editedCustomer[field.key])}
                  onChange={e => {
                    setEditedCustomer(prev => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }}
                  disabled={!field.editable}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className={styles["customer-pop-up__actions"]}>
          <ActionButton onClick={() => onClose()} color="warning">
            Cancel
          </ActionButton>
          <ActionButton type="submit">Confirm</ActionButton>
        </div>
      </form>
    </PopUp>
  )
}
