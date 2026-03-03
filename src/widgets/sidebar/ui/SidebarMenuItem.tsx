import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import type { MenuItem } from '@/widgets/sidebar/ui/Sidebar'
import styles from './SidebarMenuItem.module.scss'

export const SidebarMenuItem = ({ path, icon: Icon, text }: MenuItem) => {
  return (
    <li className={styles.menuItem}>
      <NavLink className={({ isActive }) => clsx(styles.menuLink, isActive && styles.active)} to={path}>
        <Icon aria-hidden />
        <span className={styles.menuLinkText}>{text}</span>
      </NavLink>
    </li>
  )
}
