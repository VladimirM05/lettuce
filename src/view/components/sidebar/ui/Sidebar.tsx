import { NavLink } from "react-router-dom"
import clsx from "clsx"

import type { ComponentType, SVGProps } from "react"

import LogoIcon from "@/view/shared/images/logo.svg?react"
import UsersIcon from "../images/users.svg?react"
import CustomersIcon from "../images/customers.svg?react"
import ScheduledIcon from "../images/scheduled.svg?react"
import PlansIcon from "../images/plans.svg?react"
import SubscriptionsIcon from "../images/subscriptions.svg?react"
import SignoutIcon from "../images/signout.svg?react"

import styles from "./Sidebar.module.scss"

type AdminRoute =
  | "users"
  | "customers"
  | "scheduled"
  | "plans"
  | "subscriptions"

export interface NavItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  path: AdminRoute
  text: string
}

const username = "Vladimirmalakhov"

const navItems: NavItem[] = [
  { icon: UsersIcon, path: "users", text: "Users" },
  { icon: CustomersIcon, path: "customers", text: "Customers" },
  { icon: ScheduledIcon, path: "scheduled", text: "Scheduled Cancellations" },
  { icon: PlansIcon, path: "plans", text: "Plans" },
  { icon: SubscriptionsIcon, path: "subscriptions", text: "Subscriptions" },
]

export const Sidebar = () => {
  return (
    <aside className={styles["sidebar"]}>
      <header className={styles["sidebar__header"]}>
        <LogoIcon />
        <span className={styles["sidebar__hello-text"]}>Hi, {username}</span>
      </header>

      <hr className={styles["sidebar__divider"]} />

      <nav className={styles["sidebar__nav"]}>
        <ul className={styles["sidebar__list"]}>
          {navItems.map(navItem => (
            <li className={styles["sidebar__item"]} key={navItem.path}>
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    styles["sidebar__link"],
                    isActive && styles["sidebar__link--active"],
                  )
                }
                to={navItem.path}
              >
                <navItem.icon className={styles["sidebar__img"]} aria-hidden />
                <span className={styles["sidebar__text"]}>{navItem.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <hr className={styles["sidebar__divider"]} />

      <footer className={styles["sidebar__footer"]}>
        <NavLink className={styles["sidebar__signout-button"]} to="/">
          <SignoutIcon className={styles["sidebar__signout-img"]} />
          <span className={styles["sidebar__signout-text"]}>Sign out</span>
        </NavLink>
      </footer>
    </aside>
  )
}
