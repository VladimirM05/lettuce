import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/widgets/sidebar'

import styles from './AdminLayout.module.scss'

export const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <div className={styles.table}>
        <Outlet />
      </div>
    </div>
  )
}
