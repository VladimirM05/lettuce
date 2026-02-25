import type { FC, SVGProps } from "react";
import { NavLink } from "react-router-dom";

import Logo from "@/shared/assets/images/logo.svg?react";
import Customers from "@/widgets/sidebar/assets/customers.svg?react";
import Plans from "@/widgets/sidebar/assets/plans.svg?react";
import Scheduled from "@/widgets/sidebar/assets/scheduled.svg?react";
import SignoutImg from "@/widgets/sidebar/assets/signout.svg?react";
import Subscriptions from "@/widgets/sidebar/assets/subscriptions.svg?react";
import Users from "@/widgets/sidebar/assets/users.svg?react";

import styles from "./Sidebar.module.scss";
import { SidebarMenuItem } from "./SidebarMenuItem";

export interface MenuItem {
  icon: FC<SVGProps<SVGSVGElement>>;
  path: string;
  text: string;
}

const username = "Vladimirmalakhov";

const menuItems: readonly MenuItem[] = [
  { icon: Users, path: "users", text: "Users" },
  { icon: Customers, path: "customers", text: "Customers" },
  { icon: Scheduled, path: "scheduled", text: "Scheduled Cancellations" },
  { icon: Plans, path: "plans", text: "Plans" },
  { icon: Subscriptions, path: "subscriptions", text: "Subscriptions" },
];

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <Logo />
        <span className={styles.helloText}>Hi, {username}</span>
      </header>

      <hr className={styles.divider} />

      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item: MenuItem) => (
            <SidebarMenuItem key={item.path} {...item} />
          ))}
        </ul>
      </nav>

      <hr className={styles.divider} />

      <footer className={styles.footer}>
        <NavLink className={styles.footerSignoutButton} to="/">
          <SignoutImg />
          <span className={styles.footerSignoutButtonText}>Sign out</span>
        </NavLink>
      </footer>
    </aside>
  );
};
