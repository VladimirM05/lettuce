import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import clsx from "clsx"

import { customerColumns } from "@/view/pages/customers/customerColumns"
import { CustomersInteractor } from "@/domain/interactors/CustomersInteractor"

import type { Customer } from "@/domain/entities/Customer"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn"

import BackIcon from "../images/back.svg?react"
import PencilIcon from "../images/pencil.svg?react"
import ConfirmIcon from "../images/confirm.svg?react"
import GoToIcon from "../images/go-to.svg?react"

import styles from "./CustomerDetail.module.scss"

export const CustomerDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [activeFields, setActiveFields] = useState<Record<string, boolean>>({})
  const [customer, setCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    const loadCustomer = async () => {
      const customer = await CustomersInteractor.getCustomerById(Number(id))
      setCustomer(customer)
    }

    void loadCustomer()
  }, [id])

  return (
    <section className={styles["customer-detail"]}>
      <button
        className={styles["customer-detail__go-back-button"]}
        onClick={() => navigate(-1)}
      >
        <BackIcon />
        <span className={styles["go-back-button__text"]}>To Customers</span>
      </button>
      <div className={styles["customer-detail__inner"]}>
        <div className={styles["customer-info"]}>
          <div className={styles["customer-info__title"]}>
            Customer information
          </div>
          <div className={styles["customer_info__wrapper"]}>
            <ul className={styles["customer-info__list"]}>
              {customerColumns.map((column: TableColumn<Customer>) => (
                <li className={styles["customer-info__item"]} key={column.key}>
                  <b className={styles["customer-info__label"]}>
                    {column.title}
                  </b>
                  <input
                    className={styles["customer-info__value"]}
                    type="text"
                    value={customer ? customer[column.key] : ""}
                    onChange={(e) => {
                      if (!customer) return

                      const updatedCustomer = {
                        ...customer,
                        [column.key]: column.key !== "id" ? e.target.value : id,
                      }

                      setCustomer(updatedCustomer)
                      CustomersInteractor.updateCustomer(updatedCustomer)
                    }}
                    disabled={!activeFields[column.key]}
                  />
                  <button
                    className={styles["customer-info__pencil"]}
                    onClick={() =>
                      setActiveFields((prev) => ({
                        ...prev,
                        [column.key]: !prev[column.key],
                      }))
                    }
                  >
                    {activeFields[column.key] ? (
                      <ConfirmIcon />
                    ) : (
                      <PencilIcon />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles["customer-info__action-bar"]}>
              <a
                className={styles["customer-info__action-bar-button"]}
                href="https://admin.getmeadow.com/sign-in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoToIcon />
                View in Meadow
              </a>
              <button
                className={clsx(
                  styles["customer-info__action-bar-button"],
                  styles["customer-info__action-bar-button--schedule"],
                )}
              >
                Schedule Membership Cancellation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
