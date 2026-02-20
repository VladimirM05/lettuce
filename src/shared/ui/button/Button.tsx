import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'icon'

interface ButtonProps {
  variant?: ButtonVariant
  children: ReactNode
}

export const Button = ({ variant = 'primary', children }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, styles[variant])}>{children}</button>
  )
}
