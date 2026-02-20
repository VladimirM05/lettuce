import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from './layouts/AdminLayout.tsx'

const Users = lazy(() => import('@/pages/users/ui/Users'))
const Customers = lazy(() => import('@/pages/customers/ui/Customers'))
const Scheduled = lazy(() => import('@/pages/scheduled/ui/Scheduled'))
const Plans = lazy(() => import('@/pages/plans/ui/Plans'))
const Subscriptions = lazy(
  () => import('@/pages/subscriptions/ui/Subscriptions'),
)

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/admin" replace /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="customers" replace /> },
      { path: 'users', element: <Users /> },
      { path: 'customers', element: <Customers /> },
      { path: 'scheduled', element: <Scheduled /> },
      { path: 'plans', element: <Plans /> },
      { path: 'subscriptions', element: <Subscriptions /> },
    ],
  },
])
