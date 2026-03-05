import { Outlet } from "react-router-dom"
import { Sidebar } from "@/view/components/sidebar/Sidebar"
import styles from "./AdminLayout.module.scss"

export const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <Outlet />
    </div>
  )
}
