import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-display font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            Swatchly.io
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Now in Beta
          </div>

          <h1 className="text-7xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight">
            Import Products to Your
            <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Shopify Store
            </span>
          </h1>
          
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Discover products from any vendor website, scrape product information,
            edit and customize, then push directly to your Shopify store. 
            <span className="font-semibold text-green-700">Streamline your workflow.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/signup"
              className="group px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-green-500/50 flex items-center gap-2"
            >
              Start Free Trial
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#features"
              className="px-10 py-5 bg-white text-green-700 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all border-2 border-green-600 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-green-700 mb-2">10x</div>
              <div className="text-sm text-gray-600">Faster Import</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-green-700 mb-2">100%</div>
              <div className="text-sm text-gray-600">Automated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-green-700 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 max-w-6xl mx-auto relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
              <div className="aspect-video bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="relative z-10 text-center">
                  <div className="text-8xl mb-6 animate-bounce-slow">🛍️</div>
                  <p className="text-gray-600 font-medium">Product Import Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Source Products
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to make product sourcing effortless and efficient
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:border-green-300 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Navigate Any Vendor Site
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse vendor websites directly from the app. Find products you want 
                to sell in your Shopify store with ease.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:border-green-300 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Scrape & Edit Products
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically extract product information. Edit titles, descriptions, 
                prices, and images before importing.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:border-green-300 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Push to Shopify
              </h3>
              <p className="text-gray-600 leading-relaxed">
                One-click import to your Shopify store. Products are created with 
                variants, images, and all details intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple, fast, and powerful</p>
          </div>
          
          <div className="space-y-12">
            <div className="flex gap-8 items-start group">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-display font-bold shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                  Connect Your Shopify Store
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Securely connect your Shopify store through OAuth. Your store 
                  credentials are encrypted and stored safely.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8 items-start group">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-display font-bold shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                  Find Products on Vendor Sites
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Navigate vendor websites or paste product URLs. Our scraper 
                  extracts all product information automatically.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8 items-start group">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-display font-bold shadow-lg group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                  Edit & Customize
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Review and edit product details. Adjust pricing, modify 
                  descriptions, select images, and configure variants.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8 items-start group">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-display font-bold shadow-lg group-hover:scale-110 transition-transform">
                4
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                  Import to Shopify
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Push products directly to your Shopify store. Images are uploaded, 
                  variants are created, and products are ready to sell.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Streamline Your Product Sourcing?
            </h2>
            <p className="text-xl text-green-50 mb-10 max-w-2xl mx-auto">
              Join merchants who are saving hours every week with Swatchly.io
            </p>
            <Link
              href="/signup"
              className="inline-block px-10 py-5 bg-white text-green-700 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/50"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-green-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-display font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4 md:mb-0">
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
