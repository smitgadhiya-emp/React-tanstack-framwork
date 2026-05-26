/** API origin: use VITE_API_URL, or same-origin /api via Vite proxy in dev. */
export function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL
  if (configured) {
    return configured.replace(/\/$/, '')
  }
  if (import.meta.env.DEV) {
    return ''
  }
  return 'http://localhost:8080'
}

export function apiUrl(path: string): string {
  const base = getApiBaseUrl()
  const normalized = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalized}` : normalized
}
