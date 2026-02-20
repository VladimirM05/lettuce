import { NavLink } from 'react-router-dom'
import type { FC, SVGProps } from 'react'
import styles from './SidebarMenuItem.module.scss'

interface SidebarMenuItemProps {
  icon: FC<SVGProps<SVGSVGElement>>
  path: string
  text: string
}

export const SidebarMenuItem = ({
  icon: Icon,
  path,
  text,
}: SidebarMenuItemProps) => {
  return (
    <li className={styles.item}>
      <NavLink
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
        to={path}
      >
        <Icon aria-hidden />
        <span className={styles.text}>{text}</span>
      </NavLink>
    </li>
  )
}
