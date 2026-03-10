import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { AdminLayout } from "@/view/layouts/admin-layout"

const Users = lazy(() => import("@/view/pages/users"))
const Customers = lazy(() => import("@/view/pages/customers"))
const Scheduled = lazy(() => import("@/view/pages/scheduled"))
const Plans = lazy(() => import("@/view/pages/plans"))
const Subscriptions = lazy(() => import("@/view/pages/subscriptions"))

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/admin" replace /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="customers" replace /> },
      { path: "users", element: <Users /> },
      { path: "customers", element: <Customers /> },
      { path: "scheduled", element: <Scheduled /> },
      { path: "plans", element: <Plans /> },
      { path: "subscriptions", element: <Subscriptions /> },
    ],
  },
])
