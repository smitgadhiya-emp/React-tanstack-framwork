import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const STACK = [
  { name: 'TanStack Start', role: 'React framework, routing, SSR' },
  { name: 'TanStack Query', role: 'Server state and auth mutations' },
  { name: 'Gin (Go)', role: 'REST API, JWT, SQLite persistence' },
  { name: 'Tailwind CSS', role: 'Utility-first styling and theming' },
] as const

const VALUES = [
  {
    title: 'Clarity over clutter',
    body: 'Every screen uses the same coastal palette, typography, and card patterns so navigation feels predictable.',
  },
  {
    title: 'Security by default',
    body: 'Protected routes check for a valid token before rendering. The API validates credentials on every sensitive call.',
  },
  {
    title: 'Room to extend',
    body: 'The codebase is intentionally small: add modules, swap the database, or plug in new API endpoints without fighting the scaffold.',
  },
] as const

function AboutPage() {
  return (
    <main className="page-wrap px-4 pb-12 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.28),transparent_66%)]" />
        <p className="island-kicker mb-3">About this app</p>
        <h1 className="display-title mb-4 max-w-3xl text-4xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Built for learning, ready for production patterns.
        </h1>
        <p className="m-0 max-w-2xl text-base leading-relaxed text-[var(--sea-ink-soft)] sm:text-lg">
          Coastal Workspace is a reference implementation for full-stack auth:
          a React client talks to a Go API, sessions live in local storage, and
          authenticated users get a dedicated dashboard. Use it as a template or
          tear it apart and rebuild what you need.
        </p>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {VALUES.map(({ title, body }, index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
              {body}
            </p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-4">Tech stack</p>
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
          {STACK.map(({ name, role }) => (
            <li
              key={name}
              className="flex flex-col gap-1 rounded-xl border border-[rgba(23,58,64,0.1)] bg-white/30 px-4 py-3 dark:bg-white/5"
            >
              <span className="text-sm font-semibold text-[var(--sea-ink)]">
                {name}
              </span>
              <span className="text-sm text-[var(--sea-ink-soft)]">{role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Project layout</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-[var(--sea-ink)]">
              Frontend
            </h2>
            <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[var(--sea-ink-soft)]">
              <li>
                Routes live in <code>src/routes</code> with file-based routing
              </li>
              <li>
                Auth hooks in <code>src/hooks/useAuth.ts</code> call the Go API
              </li>
              <li>
                Protected pages sit under <code>src/routes/_protected</code>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-lg font-semibold text-[var(--sea-ink)]">
              Backend
            </h2>
            <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[var(--sea-ink-soft)]">
              <li>
                Gin serves <code>/api/v1/signup</code> and{' '}
                <code>/api/v1/login</code>
              </li>
              <li>JWT middleware guards password-change endpoints</li>
              <li>SQLite stores users via GORM</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="island-kicker mb-2">Explore the app</p>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
              Return home or try signing in to see the protected dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
            >
              Back to home
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
