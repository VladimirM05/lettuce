import clsx from "clsx"
import type { ReactNode } from "react"
import styles from "./index.module.scss"

interface ActionButtonProps {
  type?: "submit" | "button"
  color?: "primary" | "warning" | "secondary" | "disabled"
  shape?: "rect" | "square"
  icon?: ReactNode
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

const ActionButton = ({
  type = "button",
  color = "primary",
  shape = "rect",
  icon,
  children,
  onClick,
  disabled = false,
}: ActionButtonProps) => {
  return (
    <button
      className={clsx(
        styles["action-button"],
        styles[`action-button--${color}`],
        styles[`action-button--${shape}`],
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <span className={styles["action-button__icon"]}>{icon}</span>}
      {children && (
        <span className={styles["action-button__text"]}>{children}</span>
      )}
    </button>
  )
}

export default ActionButton
