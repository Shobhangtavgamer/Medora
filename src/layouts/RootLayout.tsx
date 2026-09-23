import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '@/hooks/useScrollToTop'

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}