import { NavLink } from 'react-router-dom'
import type { ComponentType, JSX, SVGProps } from 'react'

import { SidebarMenuItem } from './SidebarMenuItem'

import LogoIcon from '@/shared/assets/images/logo.svg?react'
import CustomersIcon from '@/widgets/sidebar/assets/customers.svg?react'
import PlansIcon from '@/widgets/sidebar/assets/plans.svg?react'
import ScheduledIcon from '@/widgets/sidebar/assets/scheduled.svg?react'
import SignoutIcon from '@/widgets/sidebar/assets/signout.svg?react'
import SubscriptionsIcon from '@/widgets/sidebar/assets/subscriptions.svg?react'
import UsersIcon from '@/widgets/sidebar/assets/users.svg?react'

import styles from './Sidebar.module.scss'

type AdminRoute = 'users' | 'customers' | 'scheduled' | 'plans' | 'subscriptions'

export interface MenuItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  path: AdminRoute
  text: string
}

const username = 'Vladimirmalakhov'

const menuItems = [
  { icon: UsersIcon, path: 'users', text: 'Users' },
  { icon: CustomersIcon, path: 'customers', text: 'Customers' },
  { icon: ScheduledIcon, path: 'scheduled', text: 'Scheduled Cancellations' },
  { icon: PlansIcon, path: 'plans', text: 'Plans' },
  { icon: SubscriptionsIcon, path: 'subscriptions', text: 'Subscriptions' },
] as const satisfies readonly MenuItem[]

export const Sidebar = (): JSX.Element => {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <LogoIcon />
        <span className={styles.helloText}>Hi, {username}</span>
      </header>

      <hr className={styles.divider} />

      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path} {...item} />
          ))}
        </ul>
      </nav>

      <hr className={styles.divider} />

      <footer className={styles.footer}>
        <NavLink className={styles.footerSignoutButton} to="/">
          <SignoutIcon />
          <span className={styles.footerSignoutButtonText}>Sign out</span>
        </NavLink>
      </footer>
    </aside>
  )
}
