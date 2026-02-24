import ArrowUp from '../assets/arrow-up.svg?react'
import styles from './ScrollToTopButton.module.scss'
import clsx from 'clsx'

interface ScrollToTopButtonProps {
  onClick: () => void
  visible: boolean
}

export const ScrollToTopButton = ({
  onClick,
  visible,
}: ScrollToTopButtonProps) => {
  return (
    <button
      className={clsx(styles.scrollToTopButton, visible && styles.visible)}
      onClick={onClick}
    >
      <ArrowUp />
    </button>
  )
}
