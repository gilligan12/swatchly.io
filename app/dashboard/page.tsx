'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { UserProfile } from '@/types/database'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      
      // Get current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single()

      if (profileError) {
        console.error('Error loading profile:', profileError)
      } else {
        setProfile(profileData)
      }

      setLoading(false)
    }

    loadUser()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-indigo-600">Swatchly.io</div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {profile?.name || user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Message */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}! 👋
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {profile?.account_type === 'business' 
                ? `You're all set up with your business account. Let's start importing products to your Shopify store.`
                : `You're all set up! Let's start discovering and importing products to your Shopify store.`
              }
            </p>
            
            {profile?.account_type === 'business' && profile?.business_id && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-indigo-900">Business Account</p>
                <p className="text-sm text-indigo-700 mt-1">
                  You can invite team members to collaborate on product imports.
                </p>
              </div>
            )}
          </div>

          {/* Getting Started Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Connect Your Shopify Store
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Securely connect your Shopify store to start importing products. We use OAuth for secure authentication.
                  </p>
                  <Link
                    href="/dashboard/stores/connect"
                    className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Connect Store
                  </Link>
                </div>
              </div>

              <div className="flex gap-6 items-start opacity-60">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Find Products on Vendor Sites
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Browse vendor websites or paste product URLs to scrape product information.
                  </p>
                  <button
                    disabled
                    className="inline-block px-6 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>

              <div className="flex gap-6 items-start opacity-60">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Edit & Import Products
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Review scraped products, edit details, and push them directly to your Shopify store.
                  </p>
                  <button
                    disabled
                    className="inline-block px-6 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats / Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="font-semibold text-gray-900 mb-1">Stores Connected</h3>
              <p className="text-2xl font-bold text-indigo-600">0</p>
              <p className="text-sm text-gray-500 mt-2">Connect your first store to get started</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-semibold text-gray-900 mb-1">Products Scraped</h3>
              <p className="text-2xl font-bold text-indigo-600">0</p>
              <p className="text-sm text-gray-500 mt-2">Start scraping products from vendors</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-900 mb-1">Products Imported</h3>
              <p className="text-2xl font-bold text-indigo-600">0</p>
              <p className="text-sm text-gray-500 mt-2">Products in your Shopify store</p>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              Check out our documentation or reach out if you have any questions about getting started.
            </p>
            <div className="flex gap-4">
              <Link
                href="/docs"
                className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                View Docs
              </Link>
              <Link
                href="/support"
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
