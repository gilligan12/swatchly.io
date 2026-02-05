# SWATCHLY.IO - Shopify Product Clipper App Plan

## 🎯 Project Overview

A web application that helps Shopify store owners discover products from vendor websites and import them into their Shopify stores. Users can:
1. Navigate vendor websites (any e-commerce site)
2. Scrape product information when they find items they want to sell
3. Edit and customize the scraped product data
4. Push products directly to their Shopify store via Shopify Admin API

## 🏗️ Architecture Decision

**Recommended: Next.js Full-Stack App (App Router)**

- **Frontend**: Next.js 16 with React (App Router)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS (recommended for modern UI)

### Why This Stack?

1. **Next.js + Vercel**: Seamless deployment, serverless functions, edge runtime
2. **Supabase**: Built-in auth, real-time database, file storage for product images
3. **TypeScript**: Type safety for better development experience

## 📋 Core Features

### MVP (Minimum Viable Product)
1. **User Authentication**
   - Sign up / Sign in via Supabase Auth
   - User profiles

2. **Shopify Store Connection**
   - Connect user's Shopify store via OAuth
   - Store API credentials securely
   - Support multiple stores per user (optional)

3. **Vendor Website Navigation**
   - Built-in browser/iframe for navigating vendor sites
   - OR URL input field to paste product URLs
   - Support for any e-commerce website (not just Shopify)

4. **Product Scraping**
   - Extract product data from vendor URLs:
     - Title, description, price
     - Images (multiple)
     - Variants (size, color, etc.)
     - SKU, barcode
     - Product type, tags
   - Save scraped data to user's profile

5. **Product Editing**
   - Edit all product fields before importing
   - Adjust pricing (markup/discount)
   - Modify titles and descriptions
   - Reorder/select images
   - Edit variant options
   - Add custom fields/metafields

6. **Product Management**
   - View all scraped products (draft/ready status)
   - Filter by status, store, date
   - Search products
   - Bulk operations (edit multiple, delete)

7. **Push to Shopify**
   - One-click import to connected Shopify store
   - Handle image uploads (download from vendor, upload to Shopify)
   - Create products with variants
   - Support for collections/tags
   - Error handling and retry logic

### Future Enhancements
- Browser extension for one-click scraping while browsing
- Bulk import from CSV
- Product templates/presets
- Automated price rules
- Inventory sync
- Multi-store management
- Product scheduling (publish later)

## 🗄️ Database Schema (Supabase)

### `users` (handled by Supabase Auth)
- id (uuid)
- email
- created_at

### `shopify_stores`
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- store_domain (text) -- e.g., "mystore.myshopify.com"
- store_name (text)
- access_token (text, encrypted) -- Shopify Admin API access token
- scope (text) -- OAuth scopes granted
- is_active (boolean, default true)
- connected_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

### `products`
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- shopify_store_id (uuid, foreign key to shopify_stores, nullable)
- vendor_url (text) -- Original product URL from vendor site
- vendor_domain (text) -- Domain of vendor website
- status (text) -- 'draft', 'ready', 'imported', 'failed'
- shopify_product_id (text, nullable) -- ID after import to Shopify
  
  -- Product Data
- title (text)
- description (text, nullable)
- handle (text, nullable) -- URL slug
- product_type (text, nullable)
- vendor (text, nullable)
- tags (text[], nullable)
  
  -- Pricing (base/starting price)
- price (decimal, nullable)
- compare_at_price (decimal, nullable)
- currency (text, default 'USD')
  
  -- Media
- image_urls (jsonb) -- array of image URLs from vendor
- shopify_image_ids (jsonb, nullable) -- Shopify image IDs after upload
  
  -- Variants
- variants (jsonb) -- array of variant objects with:
  -- { title, price, sku, barcode, inventory_quantity, option1, option2, option3 }
  
  -- Metadata
- scraped_at (timestamp)
- imported_at (timestamp, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🔧 Technical Implementation

### Product Extraction Strategy

**Web Scraping** (Universal approach)
- Parse HTML from any vendor product URL
- Extract structured data using multiple methods:
  1. **JSON-LD** (structured data) - most reliable
  2. **Open Graph / Meta tags** - fallback
  3. **Schema.org microdata** - additional fallback
  4. **CSS selectors** - for common e-commerce patterns
- Support for major platforms:
  - Shopify stores
  - WooCommerce
  - BigCommerce
  - Generic e-commerce sites
- Handle image extraction (multiple images)
- Extract variant data (options, prices, SKUs)

**Libraries/Tools:**
- `cheerio` or `jsdom` for HTML parsing
- `puppeteer` or `playwright` for JavaScript-heavy sites (if needed)
- Custom extractors for common platforms

### Shopify Integration

**Shopify Admin API** (Required for pushing products)
- OAuth 2.0 flow for store connection
- Required scopes: `write_products`, `read_products`, `write_files`
- Store access tokens securely in Supabase (encrypted)
- Use Shopify Admin API to:
  - Create products
  - Upload images to Shopify Files API
  - Create variants
  - Set inventory
  - Add to collections

**Image Handling:**
- Download images from vendor URLs
- Upload to Shopify Files API
- Get Shopify image URLs
- Store mapping in database

### API Routes (Next.js)

```
# Shopify OAuth
/api/shopify/connect - GET (initiate OAuth)
/api/shopify/callback - GET (OAuth callback)
/api/shopify/stores - GET (list user's stores), POST, DELETE

# Products
/api/products/scrape - POST (scrape product from URL)
/api/products - GET (list user's products), POST
/api/products/[id] - GET, PUT, DELETE
/api/products/[id]/import - POST (push to Shopify)

# Utilities
/api/products/bulk - POST (bulk operations)
```

### Environment Variables Needed

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Shopify App (for OAuth)
SHOPIFY_API_KEY=
SHOPIFY_API_SECRET=
SHOPIFY_APP_URL= # Your app URL for OAuth redirect
NEXT_PUBLIC_APP_URL= # Public app URL

# Optional: Image processing
IMAGE_PROXY_URL= # If using image proxy service
```

## 📁 Project Structure

```
swatchly.io/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── stores/
│   │   │   ├── connect/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   ├── edit/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── scrape/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── shopify/
│   │   │   ├── connect/
│   │   │   ├── callback/
│   │   │   └── stores/
│   │   └── products/
│   │       ├── scrape/
│   │       ├── [id]/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductEditor.tsx
│   ├── ScrapeForm.tsx
│   ├── StoreConnection.tsx
│   └── VendorBrowser.tsx (optional)
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── shopify/
│   │   ├── oauth.ts
│   │   ├── admin-api.ts
│   │   └── scraper.ts
│   ├── vendors/
│   │   └── extractors.ts (platform-specific extractors)
│   └── utils.ts
├── types/
│   ├── product.ts
│   ├── shopify.ts
│   └── vendor.ts
└── public/
```

## 🚀 Development Phases

### Phase 1: Setup & Foundation
- [ ] Initialize Next.js 16 project with TypeScript
- [ ] Set up Supabase project and configure
- [ ] Create database schema (users, shopify_stores, products)
- [ ] Set up authentication flow (Supabase Auth)
- [ ] Configure Vercel deployment
- [ ] Set up Tailwind CSS and shadcn/ui

### Phase 2: Shopify Integration
- [ ] Create Shopify app in Partner Dashboard
- [ ] Implement OAuth 2.0 flow for store connection
- [ ] Build store connection UI
- [ ] Secure token storage in Supabase
- [ ] Test Shopify Admin API connection

### Phase 3: Product Scraping
- [ ] Build URL input/scraping form
- [ ] Implement web scraper (JSON-LD, meta tags, selectors)
- [ ] Create platform-specific extractors
- [ ] Handle image extraction
- [ ] Parse variant data
- [ ] Save scraped data to database

### Phase 4: Product Management
- [ ] Build product list/grid view
- [ ] Create product detail/edit page
- [ ] Implement product editing form
- [ ] Add image reordering/selection
- [ ] Variant editing interface
- [ ] Search and filter functionality

### Phase 5: Shopify Import
- [ ] Implement image upload to Shopify
- [ ] Build product creation API
- [ ] Handle variant creation
- [ ] Error handling and retry logic
- [ ] Import status tracking
- [ ] Success/failure notifications

### Phase 6: UI/UX Polish
- [ ] Design dashboard layout
- [ ] Responsive design
- [ ] Loading states and animations
- [ ] Error messages and validation
- [ ] Onboarding flow

### Phase 7: Testing & Deploy
- [ ] Test scraping on various sites
- [ ] Test Shopify import flow
- [ ] Error handling edge cases
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] Set up custom domain (optional)

## ❓ Questions to Consider

1. **Authentication**: Email/password only, or add OAuth (Google, GitHub)?
2. **Vendor Navigation**: Built-in browser/iframe, or just URL input field?
3. **Image Storage**: Download and store in Supabase, or just URLs until import?
4. **Rate Limiting**: 
   - Scraping rate limits (respect robots.txt)
   - Shopify API rate limits (2 requests/second)
   - User product limits?
5. **Multiple Stores**: Support multiple Shopify stores per user?
6. **Scraping Method**: Server-side only, or client-side option?
7. **Error Handling**: How to handle failed scrapes or imports?
8. **Product Updates**: If product already exists in Shopify, update or skip?

## 🎨 UI Framework Recommendation

**shadcn/ui** - Modern, accessible component library built on Radix UI and Tailwind CSS
- Easy to customize
- Great for dashboards
- Works perfectly with Next.js 16

## 🔐 Security Considerations

1. **Shopify Tokens**: Encrypt access tokens in database (Supabase Vault or encryption)
2. **API Keys**: Never expose Shopify API secret in client-side code
3. **Scraping**: Respect robots.txt, use proper user agents, rate limiting
4. **Image Downloads**: Validate URLs, prevent SSRF attacks
5. **User Data**: Row-level security (RLS) in Supabase for data isolation

## 📊 Shopify API Requirements

**Required Scopes:**
- `write_products` - Create/update products
- `read_products` - Read existing products (for updates)
- `write_files` - Upload product images

**API Endpoints Used:**
- `POST /admin/api/2024-01/products.json` - Create product
- `POST /admin/api/2024-01/files.json` - Upload images
- `GET /admin/api/2024-01/products.json` - List/read products

**Rate Limits:**
- 2 requests/second (leaky bucket)
- 40 requests/second burst
- Need to implement rate limiting/throttling

---

## Next Steps

1. **Confirm the approach** - Does this updated plan align with your vision?
2. **Answer the questions** - Help refine the requirements
3. **Shopify App Setup** - Need to create app in Shopify Partner Dashboard
4. **Start building** - I can initialize the Next.js 16 project structure

Let me know what you think and we can adjust the plan before we start coding!
