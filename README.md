# Swatchly.io

A web application that helps Shopify store owners discover products from vendor websites and import them directly into their Shopify stores.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend (database, auth, storage)
- **Vercel** - Deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
swatchly.io/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Landing page
│   └── globals.css   # Global styles
├── components/       # React components (to be created)
├── lib/              # Utility functions and configurations
├── types/            # TypeScript type definitions
└── public/           # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file in the root directory. See `SUPABASE_SETUP.md` for detailed instructions.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Shopify (to be added later)
SHOPIFY_API_KEY=
SHOPIFY_API_SECRET=
```

**Important**: See `SUPABASE_SETUP.md` for complete setup instructions including database schema.

## Next Steps

See `PLAN.md` for the complete development roadmap.

## Additional Setup Guides

- `SUPABASE_SETUP.md` - Initial Supabase database setup
- `SUPABASE_SMTP_SETUP.md` - Configure custom SMTP email authentication
- `RESEND_TEST_DOMAIN_SETUP.md` - **Quick setup using Resend test domain (start here for email!)**
- `RESEND_SETUP_GUIDE.md` - Complete Resend SMTP setup guide
- `VERCEL_DOMAIN_SETUP.md` - How to add a domain to Vercel (read this first if you don't have a domain)
- `DOMAIN_VERIFICATION_GUIDE.md` - Detailed domain verification (including Vercel)
- `VERCEL_SETUP.md` - Vercel deployment instructions
