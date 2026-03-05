import clsx from 'clsx'
import { type ReactNode } from 'react'
import styles from './Button.module.scss'
import * as React from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  disabled: boolean
}

export const Button = React.memo(({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, disabled && styles.disabled)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
})
