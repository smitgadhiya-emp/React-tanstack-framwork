const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'
const AUTH_CHANGE_EVENT = 'auth-change'

export type StoredUser = {
  userId: string
  email: string
  role: string
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredUser
  } catch {
    return null
  }
}

export function setAuth(token: string, user: StoredUser) {
  window.localStorage.setItem(TOKEN_KEY, token)
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
}

export function clearAuth() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
}

export function subscribeAuth(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(AUTH_CHANGE_EVENT, listener)
  window.addEventListener('storage', listener)
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, listener)
    window.removeEventListener('storage', listener)
  }
}
