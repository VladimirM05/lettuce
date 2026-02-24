import { Sidebar } from '@/widgets/sidebar'
import { Outlet } from 'react-router-dom'
import styles from './AdminLayout.module.scss'

export const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <Outlet />
    </div>
  )
}
