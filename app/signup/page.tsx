'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { AccountType } from '@/types/database'

export default function SignUpPage() {
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>('individual')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Individual user form state
  const [individualEmail, setIndividualEmail] = useState('')
  const [individualPassword, setIndividualPassword] = useState('')
  const [individualConfirmPassword, setIndividualConfirmPassword] = useState('')
  const [individualName, setIndividualName] = useState('')
  
  // Business user form state
  const [businessEmail, setBusinessEmail] = useState('')
  const [businessPassword, setBusinessPassword] = useState('')
  const [businessConfirmPassword, setBusinessConfirmPassword] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessAdminName, setBusinessAdminName] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()

    try {
      if (accountType === 'individual') {
        // Validate individual form
        if (!individualEmail || !individualPassword || !individualName) {
          setError('Please fill in all fields')
          setLoading(false)
          return
        }

        if (individualPassword !== individualConfirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        if (individualPassword.length < 8) {
          setError('Password must be at least 8 characters')
          setLoading(false)
          return
        }

        // Sign up individual user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: individualEmail,
          password: individualPassword,
          options: {
            data: {
              name: individualName,
              account_type: 'individual',
            },
          },
        })

        if (authError) throw authError

        // Create user profile via API route (server-side, bypasses RLS issues)
        if (authData.user) {
          const response = await fetch('/api/auth/create-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: authData.user.id,
              email: individualEmail,
              name: individualName,
              accountType: 'individual',
            }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to create profile')
          }
        }

        // Redirect to dashboard or verification page
        router.push('/dashboard')
        router.refresh()
      } else {
        // Validate business form
        if (!businessEmail || !businessPassword || !businessName || !businessAdminName) {
          setError('Please fill in all fields')
          setLoading(false)
          return
        }

        if (businessPassword !== businessConfirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        if (businessPassword.length < 8) {
          setError('Password must be at least 8 characters')
          setLoading(false)
          return
        }

        // Sign up business admin user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: businessEmail,
          password: businessPassword,
          options: {
            data: {
              name: businessAdminName,
              account_type: 'business',
              business_name: businessName,
            },
          },
        })

        if (authError) throw authError

        // Create business and user profile
        if (authData.user) {
          // First create the business
          const { data: businessData, error: businessError } = await supabase
            .from('businesses')
            .insert({
              name: businessName,
            })
            .select()
            .single()

          if (businessError) throw businessError

          // Then create user profile via API route (server-side, bypasses RLS issues)
          const response = await fetch('/api/auth/create-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: authData.user.id,
              email: businessEmail,
              name: businessAdminName,
              accountType: 'business',
              businessId: businessData.id,
            }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to create profile')
          }
        }

        // Redirect to dashboard or verification page
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="flex justify-center">
            <div className="text-3xl font-bold text-indigo-600">Swatchly.io</div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setAccountType('individual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                accountType === 'individual'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Individual
            </button>
            <button
              type="button"
              onClick={() => setAccountType('business')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                accountType === 'business'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Business
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {accountType === 'individual' ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="individual-name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="individual-name"
                  type="text"
                  required
                  value={individualName}
                  onChange={(e) => setIndividualName(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="individual-email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="individual-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={individualEmail}
                  onChange={(e) => setIndividualEmail(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="individual-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="individual-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={individualPassword}
                  onChange={(e) => setIndividualPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="At least 8 characters"
                />
              </div>
              <div>
                <label htmlFor="individual-confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="individual-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={individualConfirmPassword}
                  onChange={(e) => setIndividualConfirmPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  id="business-name"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <label htmlFor="business-admin-name" className="block text-sm font-medium text-gray-700">
                  Your Name (Admin)
                </label>
                <input
                  id="business-admin-name"
                  type="text"
                  required
                  value={businessAdminName}
                  onChange={(e) => setBusinessAdminName(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="business-email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="business-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="admin@business.com"
                />
              </div>
              <div>
                <label htmlFor="business-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="business-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={businessPassword}
                  onChange={(e) => setBusinessPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="At least 8 characters"
                />
              </div>
              <div>
                <label htmlFor="business-confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="business-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={businessConfirmPassword}
                  onChange={(e) => setBusinessConfirmPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : accountType === 'individual' ? 'Create Individual Account' : 'Create Business Account'}
            </button>
          </div>

          <div className="text-xs text-center text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </div>
        </form>
      </div>
    </div>
  )
}
