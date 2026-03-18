import { Outlet } from "react-router-dom"
import Sidebar from "@/view/components/sidebar"
import styles from "./index.module.scss"

const AdminLayout = () => {
  return (
    <div className={styles["admin-layout"]}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default AdminLayout
