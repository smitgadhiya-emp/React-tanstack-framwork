import { useEffect } from 'react'
import { Outlet, createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { getToken } from '#/lib/auth-storage'
import { useAuth } from '#/hooks/useAuth'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ location }) => {
    if (typeof window === 'undefined') return
    if (!getToken()) {
      const returnTo = location.pathname + location.searchStr
      throw redirect({
        to: '/login',
        search: { redirect: returnTo || '/dashboard' },
      })
    }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      const returnTo =
        router.state.location.pathname + router.state.location.searchStr
      router.navigate({
        to: '/login',
        search: { redirect: returnTo || '/dashboard' },
        replace: true,
      })
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return <Outlet />
}
