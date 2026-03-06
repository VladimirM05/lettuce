import { useLocation, useNavigate } from "react-router-dom"
import type { Customer } from "@/domain/entities/Customer.ts"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn.ts"
import BackIcon from "../images/back.svg?react"
import styles from "./CustomerDetail.module.scss"
import clsx from "clsx"

export const CustomerDetail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

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
              {state.columns.map((column: TableColumn<Customer>) => (
                <li className={styles["customer-info__item"]} key={column.key}>
                  <b className={styles["customer-info__label"]}>
                    {column.title}
                  </b>
                  <span className={styles["customer-info__value"]}>
                    {state.customer[column.key as keyof Customer] ?? ""}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles["customer-info__action-bar"]}>
              <button className={styles["customer-info__action-bar-button"]}>
                View in Meadow
              </button>
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
