import { apiUrl } from '#/lib/api-base'

const OAUTH_REDIRECT_KEY = 'oauth_redirect'

export function getGoogleOAuthUrl(): string {
  return apiUrl('/api/v1/oauth/google')
}

/** Persist post-login path before the browser leaves for Google OAuth. */
export function saveOAuthRedirect(redirectTo: string) {
  sessionStorage.setItem(OAUTH_REDIRECT_KEY, redirectTo)
}

export function startGoogleOAuth(redirectTo = '/dashboard') {
  saveOAuthRedirect(redirectTo)
  window.location.assign(getGoogleOAuthUrl())
}

export function consumeOAuthRedirect(): string {
  const path = sessionStorage.getItem(OAUTH_REDIRECT_KEY) ?? '/dashboard'
  sessionStorage.removeItem(OAUTH_REDIRECT_KEY)
  return path
}

export type OAuthCallbackParams = {
  token?: string
  userId?: string
  email?: string
  role?: string
  error?: string
}

export function parseOAuthCallbackParams(
  raw: Record<string, unknown>,
): OAuthCallbackParams {
  return {
    token: typeof raw.token === 'string' ? raw.token : undefined,
    userId: typeof raw.userId === 'string' ? raw.userId : undefined,
    email: typeof raw.email === 'string' ? raw.email : undefined,
    role: typeof raw.role === 'string' ? raw.role : undefined,
    error: typeof raw.error === 'string' ? raw.error : undefined,
  }
}

export function isOAuthCallbackSuccess(
  params: OAuthCallbackParams,
): params is Required<Pick<OAuthCallbackParams, 'token' | 'userId' | 'email'>> &
OAuthCallbackParams {
  return Boolean(params.token && params.userId && params.email)
}
