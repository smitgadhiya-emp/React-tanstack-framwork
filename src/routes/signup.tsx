import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useSignup } from '#/hooks/useAuth'
import { getToken } from '#/lib/auth-storage'
import { ApiError } from '#/lib/api-client'

export const Route = createFileRoute('/signup')({
  beforeLoad: () => {
    if (typeof window !== 'undefined' && getToken()) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: SignupPage,
})

function SignupPage() {
  const navigate = useNavigate()
  const signup = useSignup()
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    city: '',
    pincode: '',
    role: 'user',
  })

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup.mutate(
      {
        userName: form.userName,
        email: form.email,
        password: form.password,
        city: form.city,
        pincode: Number(form.pincode) || 0,
        role: form.role,
      },
      {
        onSuccess: () => {
          navigate({ to: '/dashboard' })
        },
      },
    )
  }

  const errorMessage =
    signup.error instanceof ApiError
      ? signup.error.details || signup.error.message
      : signup.error?.message

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-md p-6">
        <h1 className="text-lg font-semibold leading-none tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 mb-6">
          Enter your information to create an account
        </p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Field
            id="userName"
            label="Username"
            value={form.userName}
            onChange={handleChange('userName')}
            required
            autoComplete="username"
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            required
            autoComplete="email"
          />
          <Field
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            required
            minLength={8}
            autoComplete="new-password"
          />
          <Field
            id="city"
            label="City"
            value={form.city}
            onChange={handleChange('city')}
          />
          <Field
            id="pincode"
            label="Pincode"
            type="number"
            value={form.pincode}
            onChange={handleChange('pincode')}
          />
          <Field
            id="role"
            label="Role"
            value={form.role}
            onChange={handleChange('role')}
          />

          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">
                {errorMessage}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={signup.isPending}
            className="w-full h-9 px-4 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signup.isPending ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  minLength?: number
  autoComplete?: string
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required,
  minLength,
  autoComplete,
}: FieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className="flex h-9 w-full border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  )
}
