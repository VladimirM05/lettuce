import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import type { TableColumn } from "@/view/primitives/table/types/TableColumn.ts"
import styles from "./EntityPopUp.module.scss"

interface EntityPopUpProps<T> {
  columns: TableColumn<T>[]
  entity: T
  onVisibleEntityPopUpChange: (visible: boolean) => void
  onEntityChange: (entity: T) => void
}

export const EntityPopUp = <T,>({
  columns,
  entity,
  onVisibleEntityPopUpChange,
  onEntityChange,
}: EntityPopUpProps<T>) => {
  const [editedEntity, setEditedEntity] = useState<T>(entity)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
        onVisibleEntityPopUpChange(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onVisibleEntityPopUpChange])

  return (
    <section className={styles["entity-pop-up"]}>
      <div className={styles["entity-pop-up__inner"]} ref={ref}>
        <h2 className={styles["entity-pop-up__title"]}>Editing data</h2>

        <ul className={styles["entity-pop-up__list"]}>
          {columns.map(column => (
            <li
              className={styles["entity-pop-up__item"]}
              key={String(column.key)}
            >
              <label
                className={styles["entity-pop-up__label"]}
                htmlFor={String(column.key)}
              >
                {column.title}
              </label>
              <input
                id={String(column.key)}
                className={styles["entity-pop-up__input"]}
                type="text"
                value={String(editedEntity[column.key])}
                onChange={e => {
                  setEditedEntity(prev => ({
                    ...prev,
                    [column.key]: e.target.value,
                  }))
                }}
              />
            </li>
          ))}
        </ul>

        <div className={styles["entity-pop-up__actions"]}>
          <button
            className={clsx(
              styles["entity-pop-up__button"],
              styles["entity-pop-up__button--cancel"],
            )}
            onClick={() => onVisibleEntityPopUpChange(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className={clsx(
              styles["entity-pop-up__button"],
              styles["entity-pop-up__button--confirm"],
            )}
            onClick={() => {
              onEntityChange(editedEntity)
              onVisibleEntityPopUpChange(false)
            }}
            type="button"
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  )
}
