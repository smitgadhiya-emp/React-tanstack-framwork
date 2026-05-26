import { createFileRoute, Link } from '@tanstack/react-router'
import GoogleSignInButton from '#/components/GoogleSignInButton'
import { useAuth } from '#/hooks/useAuth'

export const Route = createFileRoute('/')({ component: HomePage })

const FEATURES = [
  {
    title: 'Secure accounts',
    description:
      'Email/password or Google OAuth — both issue JWTs from the Go API and persist in the browser.',
  },
  {
    title: 'Protected workspace',
    description:
      'Authenticated users land on a private dashboard; guests are guided to login first.',
  },
  {
    title: 'Type-safe routing',
    description:
      'TanStack Router keeps URLs, links, and redirects consistent across the whole app.',
  },
  {
    title: 'Fast data layer',
    description:
      'React Query handles auth mutations and cache invalidation without extra boilerplate.',
  },
] as const

const STEPS = [
  {
    step: '01',
    title: 'Create an account',
    body: 'Sign up with email or continue with Google — one click redirects through OAuth and back.',
  },
  {
    step: '02',
    title: 'Sign in',
    body: 'Log in to receive a token from the Gin backend and unlock protected routes.',
  },
  {
    step: '03',
    title: 'Open your dashboard',
    body: 'Review activity, stats, and quick links from your personal workspace.',
  },
] as const

function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <main className="page-wrap px-4 pb-12 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">Coastal workspace</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Your projects, one calm place to work.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          A full-stack starter pairing TanStack Start on the frontend with a Gin
          API on the backend. Manage access, ship features, and grow from a
          focused foundation.
        </p>
        <div className="flex flex-wrap gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
              >
                Sign in
              </Link>
              <div className="w-full sm:w-auto sm:min-w-[220px]">
                <GoogleSignInButton redirectTo="/dashboard" />
              </div>
            </>
          )}
          <Link
            to="/about"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            Learn more
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ title, description }, index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
              {description}
            </p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">How it works</p>
        <h2 className="mb-6 text-2xl font-bold text-[var(--sea-ink)]">
          Three steps to your workspace
        </h2>
        <ol className="m-0 grid list-none gap-6 p-0 sm:grid-cols-3">
          {STEPS.map(({ step, title, body }) => (
            <li key={step} className="flex flex-col gap-2">
              <span className="text-sm font-bold tracking-widest text-[var(--lagoon-deep)]">
                {step}
              </span>
              <h3 className="text-base font-semibold text-[var(--sea-ink)]">
                {title}
              </h3>
              <p className="m-0 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="island-kicker mb-2">Ready when you are</p>
            <p className="m-0 max-w-xl text-sm text-[var(--sea-ink-soft)]">
              {isAuthenticated
                ? 'You are signed in. Head to the dashboard to continue.'
                : 'New here? Create an account in under a minute.'}
            </p>
          </div>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="shrink-0 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-center text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
            >
              Create free account
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
