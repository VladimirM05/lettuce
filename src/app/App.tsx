import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Suspense } from 'react'

export const App = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
