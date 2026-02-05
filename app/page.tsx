import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 via-teal-50 to-cyan-50">
      {/* Floating Navigation */}
      <nav className="sticky top-4 z-50 mx-4 mt-4 mb-8">
        <div className="container mx-auto px-6 py-4 backdrop-blur-md bg-white/80 border border-gray-200/50 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-green-700">
              Swatchly.io
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-700 hover:text-green-700 transition-colors font-medium text-sm"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-sm font-semibold text-green-700 mb-4 tracking-wide uppercase">
            Introducing Swatchly
          </p>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            See it, clip it, sell it.
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Swatchly makes Shopify easy by simplifying the product sourcing process. 
            Turn any product into a Shopify listing instantly and never manually enter product data again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-gray-900 text-white rounded-lg text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Sign up for free
            </Link>
            <Link
              href="#demo"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Contact us
            </Link>
          </div>
        </div>

        {/* Dashboard Demo */}
        <div id="demo" className="max-w-6xl mx-auto -mt-10 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-semibold text-gray-900 text-sm">Swatchly Dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 bg-gray-50">
              <div className="flex gap-6">
                {/* Left Sidebar */}
                <div className="w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-900 text-xs">Collections</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                        <span className="text-sm font-medium text-green-700">Summer Collection</span>
                        <button className="text-green-600 hover:text-green-700">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="space-y-2">
                      <div className="px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Draft</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">12</span>
                        </div>
                      </div>
                      <div className="px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Ready</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">8</span>
                        </div>
                      </div>
                      <div className="px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Imported</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">24</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  {/* Search Bar */}
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-900">Draft</span>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      {/* Product Item 1 */}
                      <div className="px-4 py-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">👕</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                Premium Cotton T-Shirt
                              </h3>
                              <span className="text-xs text-gray-500 ml-2">2d ago</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Scraped from vendor-site.com</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">$29.99</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">3 variants</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Item 2 */}
                      <div className="px-4 py-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">👟</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                Running Sneakers Pro
                              </h3>
                              <span className="text-xs text-gray-500 ml-2">1d ago</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Scraped from vendor-site.com</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">$89.99</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">5 variants</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Item 3 */}
                      <div className="px-4 py-4 hover:bg-gray-50 cursor-pointer bg-green-50">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">🎒</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                Travel Backpack Elite
                              </h3>
                              <span className="text-xs text-gray-500 ml-2">3h ago</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Scraped from vendor-site.com</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">$129.99</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">4 variants</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar - Product Details */}
                <div className="w-80 flex-shrink-0">
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-900">Overview</span>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 text-green-600 mt-0.5">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Product scraped</p>
                          <p className="text-xs text-gray-500 mt-0.5">3 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 text-green-600 mt-0.5">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Product details</p>
                          <p className="text-xs text-gray-500 mt-0.5">Title, description, images</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 text-green-600 mt-0.5">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Variants</p>
                          <p className="text-xs text-gray-500 mt-0.5">4 size options</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Overview</span>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Edit Product</span>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-bold text-green-700 mb-4 md:mb-0">
            Swatchly.io
          </div>
          <div className="text-gray-600 text-sm">
            © 2024 Swatchly.io. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
