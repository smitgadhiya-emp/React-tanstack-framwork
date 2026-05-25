import { useEffect } from 'react'
import {
  createFileRoute,
  Link,
  useNavigate,
} from '@tanstack/react-router'
import { setAuth } from '#/lib/auth-storage'

type Search = {
  token?: string
  userId?: string
  email?: string
  role?: string
  error?: string
}

export const Route = createFileRoute('/oauth/callback')({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    token: typeof raw.token === 'string' ? raw.token : undefined,
    userId: typeof raw.userId === 'string' ? raw.userId : undefined,
    email: typeof raw.email === 'string' ? raw.email : undefined,
    role: typeof raw.role === 'string' ? raw.role : undefined,
    error: typeof raw.error === 'string' ? raw.error : undefined,
  }),
  component: OAuthCallbackPage,
})

function OAuthCallbackPage() {
  const { token, userId, email, role, error } = Route.useSearch()
  const navigate = useNavigate()

  useEffect(() => {
    if (error || !token || !userId || !email) return
    setAuth(token, { userId, email, role: role ?? 'user' })
    navigate({ to: '/dashboard', replace: true })
  }, [token, userId, email, role, error, navigate])

  if (error) {
    return (
      <div className="flex justify-center py-10 px-4">
        <div className="w-full max-w-md p-6">
          <h1 className="text-lg font-semibold leading-none tracking-tight">
            Sign-in failed
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 mb-6">
            {error}
          </p>
          <Link
            to="/login"
            className="inline-flex h-9 items-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-neutral-50" />
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Signing you in…
        </span>
      </div>
    </div>
  )
}
