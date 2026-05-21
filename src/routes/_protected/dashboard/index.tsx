import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuth, useLogout } from '#/hooks/useAuth'

export const Route = createFileRoute('/_protected/dashboard/')({
  component: DashboardPage,
})

const STATS = [
  { label: 'Active projects', value: '12', change: '+2 this week' },
  { label: 'Tasks completed', value: '48', change: '+8 this week' },
  { label: 'Team members', value: '6', change: 'No change' },
  { label: 'Open issues', value: '3', change: '-1 this week' },
] as const

const RECENT_ACTIVITY = [
  { id: 1, action: 'Deployed staging build', time: '2 hours ago' },
  { id: 2, action: 'Merged pull request #42', time: '5 hours ago' },
  { id: 3, action: 'Updated project settings', time: 'Yesterday' },
  { id: 4, action: 'Invited alex@example.com', time: '2 days ago' },
] as const

function DashboardPage() {
  const { user } = useAuth()
  const logout = useLogout()
  const navigate = useNavigate()
  const displayName = user?.email ?? 'there'

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="island-kicker mb-3">Dashboard</p>
            <h1 className="display-title mb-3 max-w-2xl text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
              Welcome back, {displayName}
            </h1>
            <p className="m-0 max-w-xl text-base text-[var(--sea-ink-soft)]">
              Signed in as <strong>{user?.role ?? 'user'}</strong> (id:{' '}
              {user?.userId ?? '—'}).
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-xl border border-[rgba(23,58,64,0.12)] bg-white/40 px-4 py-2 text-sm font-medium text-[var(--sea-ink)] transition hover:-translate-y-0.5 hover:border-[rgba(50,143,151,0.3)] hover:bg-[rgba(79,184,178,0.1)]"
          >
            Sign out
          </button>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, change }, index) => (
          <article
            key={label}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <p className="island-kicker mb-2">{label}</p>
            <p className="mb-1 text-3xl font-bold text-[var(--sea-ink)]">
              {value}
            </p>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">{change}</p>
          </article>
        ))}
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="island-shell rise-in rounded-2xl p-6 lg:col-span-2">
          <p className="island-kicker mb-4">Recent activity</p>
          <ul className="m-0 list-none space-y-3 p-0">
            {RECENT_ACTIVITY.map(({ id, action, time }) => (
              <li
                key={id}
                className="flex items-center justify-between gap-4 border-b border-[rgba(23,58,64,0.08)] pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm font-medium text-[var(--sea-ink)]">
                  {action}
                </span>
                <span className="shrink-0 text-xs text-[var(--sea-ink-soft)]">
                  {time}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="island-shell rise-in rounded-2xl p-6">
          <p className="island-kicker mb-4">Quick links</p>
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              className="rounded-xl border border-[rgba(23,58,64,0.12)] bg-white/40 px-4 py-2.5 text-sm font-medium text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(50,143,151,0.3)] hover:bg-[rgba(79,184,178,0.1)]"
            >
              Home
            </Link>
            <Link
              to="/demo/better-auth"
              className="rounded-xl border border-[rgba(23,58,64,0.12)] bg-white/40 px-4 py-2.5 text-sm font-medium text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(50,143,151,0.3)] hover:bg-[rgba(79,184,178,0.1)]"
            >
              Account settings
            </Link>
            <Link
              to="/about"
              className="rounded-xl border border-[rgba(23,58,64,0.12)] bg-white/40 px-4 py-2.5 text-sm font-medium text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(50,143,151,0.3)] hover:bg-[rgba(79,184,178,0.1)]"
            >
              About
            </Link>
          </nav>
        </section>
      </div>
    </main>
  )
}
