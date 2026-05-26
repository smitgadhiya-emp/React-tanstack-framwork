import {
  getGoogleOAuthUrl,
  saveOAuthRedirect,
} from '#/lib/oauth'

type GoogleSignInButtonProps = {
  redirectTo?: string
  className?: string
}

const defaultClassName =
  'inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 no-underline transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800'

export default function GoogleSignInButton({
  redirectTo = '/dashboard',
  className = defaultClassName,
}: GoogleSignInButtonProps) {
  const oauthUrl = getGoogleOAuthUrl()

  const handleClick = () => {
    saveOAuthRedirect(redirectTo)
  }

  return (
    <a
      href={oauthUrl}
      onClick={handleClick}
      className={className}
    >
      <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A9 9 0 009 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A9 9 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A9 9 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
        />
      </svg>
      Continue with Google
    </a>
  )
}
