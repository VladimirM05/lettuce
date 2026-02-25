import clsx from "clsx";
import type { FC, SVGProps } from "react";
import { NavLink } from "react-router-dom";

import styles from "./SidebarMenuItem.module.scss";

interface SidebarMenuItemProps {
  path: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  text: string;
}

export const SidebarMenuItem = ({ path, icon: Icon, text }: SidebarMenuItemProps) => {
  return (
    <li className={styles.item}>
      <NavLink className={({ isActive }) => clsx(styles.link, isActive && styles.active)} to={path}>
        <Icon aria-hidden />
        <span className={styles.text}>{text}</span>
      </NavLink>
    </li>
  );
};
