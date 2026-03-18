import { type SyntheticEvent, useState } from "react"
import clsx from "clsx"
import PopUp from "@/view/primitives/pop-up"
import ActionButton from "@/view/primitives/action-button"
import { Customer } from "@/model/entities/Customer"
import { Name } from "@/model/object-values/Name"
import { Phone } from "@/model/object-values/Phone"
import { Email } from "@/model/object-values/Email"
import styles from "./index.module.scss"

interface CustomerPopUpProps {
  customer: Customer
  onClose: () => void
  onCustomerChange: (customer: Customer) => void
  errors: Partial<Record<keyof Customer, string>> | null
}

interface CustomerFields {
  key: keyof Customer
  label: string
  editable: boolean
}

const customerFields: CustomerFields[] = [
  { key: "name", label: "Name", editable: true },
  { key: "phone", label: "Phone", editable: true },
  { key: "email", label: "Email", editable: true },
  { key: "dateJoined", label: "Date Joined", editable: false },
]

const CustomerPopUp = ({
  customer,
  onClose,
  onCustomerChange,
  errors,
}: CustomerPopUpProps) => {
  const [editedCustomer, setEditedCustomer] = useState<Customer>(customer)

  const handleConfirm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    onCustomerChange(editedCustomer)
  }

  const handleChange = (fieldKey: string, value: string) => {
    setEditedCustomer(
      prev =>
        new Customer(
          prev.id,
          fieldKey === "name" ? new Name(value) : prev.name,
          fieldKey === "phone" ? new Phone(value) : prev.phone,
          prev.dateJoined,
          fieldKey === "email" ? new Email(value) : prev.email,
        ),
    )
  }

  return (
    <PopUp onClose={onClose}>
      <form className={styles["customer-pop-up"]} onSubmit={handleConfirm}>
        <h2 className={styles["customer-pop-up__title"]}>
          Customer information
        </h2>

        <ul className={styles["customer-pop-up__list"]}>
          {customerFields.map(field => (
            <li className={styles["customer-pop-up__item"]} key={field.key}>
              <label
                className={styles["customer-pop-up__label"]}
                htmlFor={field.key}
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
                  id={field.key}
                  className={clsx(
                    styles["customer-pop-up__input"],
                    !field.editable &&
                      styles["customer-pop-up__input--disabled"],
                  )}
                  type="text"
                  value={String(editedCustomer[field.key])}
                  onChange={e => handleChange(field.key, e.target.value)}
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

export default CustomerPopUp
