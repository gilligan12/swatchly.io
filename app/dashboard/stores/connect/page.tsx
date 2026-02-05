'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConnectStorePage() {
  const [loading, setLoading] = useState(false)

  const handleConnect = () => {
    // TODO: Implement Shopify OAuth flow
    setLoading(true)
    // This will be implemented when we set up Shopify integration
    setTimeout(() => {
      setLoading(false)
      alert('Shopify connection will be implemented in the next phase!')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
              Swatchly.io
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Connect Your Shopify Store
            </h1>
            <p className="text-gray-600 mb-8">
              Securely connect your Shopify store to start importing products. We use OAuth 2.0 for secure authentication.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Shopify store connection will be implemented in Phase 2. 
                You'll need to create a Shopify app in the Partner Dashboard first.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">What you'll need:</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">✓</span>
                    <span>A Shopify store (development or production)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">✓</span>
                    <span>Admin access to your Shopify store</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">✓</span>
                    <span>A Shopify Partner account (for app development)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Permissions we'll request:</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span><strong>write_products</strong> - Create and update products in your store</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span><strong>read_products</strong> - Read existing products (for updates)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span><strong>write_files</strong> - Upload product images</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting...' : 'Connect Shopify Store'}
              </button>

              <p className="text-sm text-gray-500 text-center">
                By connecting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
