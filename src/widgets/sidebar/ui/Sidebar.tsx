import type { FC, SVGProps } from 'react'

import { SidebarMenuItem } from './SidebarMenuItem.tsx'

import Logo from '@/shared/assets/images/logo.svg?react'
import Users from '@/widgets/sidebar/assets/users.svg?react'
import Customers from '@/widgets/sidebar/assets/customers.svg?react'
import Scheduled from '@/widgets/sidebar/assets/scheduled.svg?react'
import Plans from '@/widgets/sidebar/assets/plans.svg?react'
import Subscriptions from '@/widgets/sidebar/assets/subscriptions.svg?react'
import SignoutImg from '@/widgets/sidebar/assets/signout.svg?react'

import styles from './Sidebar.module.scss'

const username = 'Vladimir'

export interface MenuItem {
  icon: FC<SVGProps<SVGSVGElement>>
  path: string
  text: string
}

const menuItems: MenuItem[] = [
  { icon: Users, path: 'users', text: 'Users' },
  { icon: Customers, path: 'customers', text: 'Customers' },
  { icon: Scheduled, path: 'scheduled', text: 'Scheduled Cancellations' },
  { icon: Plans, path: 'plans', text: 'Plans' },
  { icon: Subscriptions, path: 'subscriptions', text: 'Subscriptions' },
]

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <Logo />
        <div className={styles.headerText}>
          <span className={styles.username}>Hi, {username}</span>
          <span>!</span>
        </div>
      </header>
      <hr className={styles.divider} />
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item: MenuItem) => (
            <SidebarMenuItem key={item.text} {...item} />
          ))}
        </ul>
      </nav>
      <hr className={styles.divider} />
      <footer className={styles.footer}>
        <button className={styles.signoutBtn} type="button">
          <SignoutImg />
          <span className={styles.signoutBtnText}>Sign out</span>
        </button>
      </footer>
    </aside>
  )
}
