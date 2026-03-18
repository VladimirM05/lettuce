import { type ReactNode, useEffect, useRef } from "react"
import styles from "./index.module.scss"

interface PopUpProps {
  children: ReactNode
  onClose: () => void
}

const PopUp = ({ children, onClose }: PopUpProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
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

export default PopUp
