import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from '@/pages/layouts/AdminLayout'

const Users = lazy(() => import('@/pages/users'))
const Customers = lazy(() => import('@/pages/customers'))
const Scheduled = lazy(() => import('@/pages/scheduled'))
const Plans = lazy(() => import('@/pages/plans'))
const Subscriptions = lazy(() => import('@/pages/subscriptions'))

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
