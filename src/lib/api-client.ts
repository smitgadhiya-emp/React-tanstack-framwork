import { getToken } from './auth-storage'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export class ApiError extends Error {
  status: number
  details?: string

  constructor(message: string, status: number, details?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

type GoSuccessResponse<T> = { message: string; data: T }
type GoErrorResponse = { message: string; error: string }

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getToken()
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${API_URL}${path}`, { ...init, headers })
  const body = (await res.json().catch(() => null)) as
    | GoSuccessResponse<T>
    | GoErrorResponse
    | null

  if (!res.ok || !body) {
    const message = body?.message ?? res.statusText ?? 'Request failed'
    const details =
      body && 'error' in body && typeof body.error === 'string'
        ? body.error
        : undefined
    throw new ApiError(message, res.status, details)
  }

  return (body as GoSuccessResponse<T>).data
}
