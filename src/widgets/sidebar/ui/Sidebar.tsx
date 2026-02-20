import type { FC, SVGProps } from 'react'

import { SidebarMenuItem } from '@/widgets/sidebar/ui/SidebarMenuItem'

import Logo from '@/app/assets/images/logo.svg?react'
import Users from '@/app/assets/images/users.svg?react'
import Customers from '@/app/assets/images/customers.svg?react'
import Scheduled from '@/app/assets/images/scheduled.svg?react'
import Plans from '@/app/assets/images/plans.svg?react'
import Subscriptions from '@/app/assets/images/subscriptions.svg?react'
import SignoutImg from '@/app/assets/images/signout.svg?react'

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
