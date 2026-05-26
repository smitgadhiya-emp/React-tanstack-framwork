import { useEffect, useRef } from 'react'
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { completeOAuthCallback } from '#/hooks/useAuth'
import { getToken } from '#/lib/auth-storage'
import {
  isOAuthCallbackSuccess,
  parseOAuthCallbackParams,
} from '#/lib/oauth'

export const Route = createFileRoute('/oauth/callback')({
  validateSearch: parseOAuthCallbackParams,
  beforeLoad: ({ search }) => {
    if (typeof window !== 'undefined' && getToken() && !search.error) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: OAuthCallbackPage,
})

function OAuthCallbackPage() {
  const params = Route.useSearch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const handled = useRef(false)

  useEffect(() => {
    if (handled.current || params.error) return

    if (!isOAuthCallbackSuccess(params)) {
      navigate({
        to: '/login',
        search: { error: 'oauth_incomplete' },
        replace: true,
      })
      return
    }

    handled.current = true
    try {
      const redirectTo = completeOAuthCallback(params)
      queryClient.invalidateQueries()
      navigate({ to: redirectTo as '/dashboard', replace: true })
    } catch {
      navigate({
        to: '/login',
        search: { error: 'oauth_failed' },
        replace: true,
      })
    }
  }, [params, navigate, queryClient])

  if (params.error) {
    return (
      <div className="flex justify-center py-10 px-4">
        <div className="w-full max-w-md p-6">
          <h1 className="text-lg font-semibold leading-none tracking-tight">
            Sign-in failed
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 mb-6">
            {decodeURIComponent(params.error)}
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
          Signing you in with Google…
        </span>
      </div>
    </div>
  )
}
