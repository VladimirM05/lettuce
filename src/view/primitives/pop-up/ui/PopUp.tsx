import { type ReactNode, useEffect, useRef } from "react"
import styles from "./PopUp.module.scss"

interface PopUpProps {
  children: ReactNode
  onClose: (close: boolean) => void
}

export const PopUp = ({ children, onClose }: PopUpProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <section className={styles["pop-up"]}>
      <div className={styles["pop-up__inner"]} ref={ref}>
        {children}
      </div>
    </section>
  )
}
