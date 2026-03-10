import { Outlet } from "react-router-dom"
import { Sidebar } from "@/view/components/sidebar"
import styles from "./AdminLayout.module.scss"

export const AdminLayout = () => {
  return (
    <div className={styles["admin-layout"]}>
      <Sidebar />
      <Outlet />
    </div>
  )
}
