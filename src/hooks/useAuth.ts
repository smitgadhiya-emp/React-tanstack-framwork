import { useSyncExternalStore } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '#/lib/api-client'
import {
  clearAuth,
  getStoredUser,
  getToken,
  setAuth,
  subscribeAuth,
  type StoredUser,
} from '#/lib/auth-storage'

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  userName: string
  email: string
  password: string
  city: string
  pincode: number
  role: string
}

type LoginResponse = {
  token: string
  userId: string
  email: string
  role: string
}

type SignupResponse = {
  id: string
  token: string
}

function loginRequest(payload: LoginPayload) {
  return apiRequest<LoginResponse>('/api/v1/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

function signupRequest(payload: SignupPayload) {
  return apiRequest<SignupResponse>('/api/v1/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuth(data.token, {
        userId: data.userId,
        email: data.email,
        role: data.role,
      })
      queryClient.invalidateQueries()
    },
  })
}

export function useSignup() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signupRequest,
    onSuccess: (data, variables) => {
      setAuth(data.token, {
        userId: data.id,
        email: variables.email,
        role: variables.role,
      })
      queryClient.invalidateQueries()
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return () => {
    clearAuth()
    queryClient.clear()
  }
}

type AuthState = {
  token: string | null
  user: StoredUser | null
  isAuthenticated: boolean
}

const SERVER_SNAPSHOT: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
}

let cachedSnapshot: AuthState = SERVER_SNAPSHOT

function getAuthSnapshot(): AuthState {
  const token = getToken()
  const user = getStoredUser()
  if (
    cachedSnapshot.token === token &&
    cachedSnapshot.user?.userId === user?.userId
  ) {
    return cachedSnapshot
  }
  cachedSnapshot = { token, user, isAuthenticated: Boolean(token) }
  return cachedSnapshot
}

export function useAuth(): AuthState {
  return useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    () => SERVER_SNAPSHOT,
  )
}
