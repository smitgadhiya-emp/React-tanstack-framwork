import { useEffect } from 'react'
import { Outlet, createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { getToken } from '#/lib/auth-storage'
import { useAuth } from '#/hooks/useAuth'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ location }) => {
    if (typeof window === 'undefined') return
    if (!getToken()) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
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
      router.navigate({
        to: '/login',
        search: { redirect: router.state.location.href },
        replace: true,
      })
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return <Outlet />
}
