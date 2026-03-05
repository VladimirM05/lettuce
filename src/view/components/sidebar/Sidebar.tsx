import { NavLink } from "react-router-dom"
import clsx from "clsx"

import type { ComponentType, SVGProps } from "react"

import LogoIcon from "@/view/shared/assets/images/logo.svg?react"
import UsersIcon from "./images/users.svg?react"
import CustomersIcon from "./images/customers.svg?react"
import ScheduledIcon from "./images/scheduled.svg?react"
import PlansIcon from "./images/plans.svg?react"
import SubscriptionsIcon from "./images/subscriptions.svg?react"
import SignoutIcon from "./images/signout.svg?react"

import styles from "./Sidebar.module.scss"

type AdminRoute =
  | "users"
  | "customers"
  | "scheduled"
  | "plans"
  | "subscriptions"

export interface MenuItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  path: AdminRoute
  text: string
}

const username = "Vladimirmalakhov"

const menuItems = [
  { icon: UsersIcon, path: "users", text: "Users" },
  { icon: CustomersIcon, path: "customers", text: "Customers" },
  { icon: ScheduledIcon, path: "scheduled", text: "Scheduled Cancellations" },
  { icon: PlansIcon, path: "plans", text: "Plans" },
  { icon: SubscriptionsIcon, path: "subscriptions", text: "Subscriptions" },
] as const satisfies readonly MenuItem[]

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <LogoIcon />
        <span className={styles.helloText}>Hi, {username}</span>
      </header>

      <hr className={styles.divider} />

      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((menuItem) => (
            <li className={styles.menuItem} key={menuItem.path}>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.menuLink, isActive && styles.active)
                }
                to={menuItem.path}
              >
                <menuItem.icon aria-hidden />
                <span className={styles.menuLinkText}>{menuItem.text}</span>
              </NavLink>
            </li>
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
