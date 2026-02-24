import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/routes/router.tsx'

export const App = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
