import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { AdminLayout } from "@/view/layouts/AdminLayout"

const Users = lazy(() => import("@/view/pages/Users.tsx"))
const Customers = lazy(() => import("@/view/pages/customers/Customers.tsx"))
const CustomerDetail = lazy(() => import("@/view/pages/customer-detail"))
const Scheduled = lazy(() => import("@/view/pages/Scheduled.tsx"))
const Plans = lazy(() => import("@/view/pages/Plans.tsx"))
const Subscriptions = lazy(() => import("@/view/pages/Subscriptions.tsx"))

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/admin" replace /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="customers" replace /> },
      { path: "users", element: <Users /> },
      { path: "customers", element: <Customers /> },
      { path: "customers/:id", element: <CustomerDetail /> },
      { path: "scheduled", element: <Scheduled /> },
      { path: "plans", element: <Plans /> },
      { path: "subscriptions", element: <Subscriptions /> },
    ],
  },
])
