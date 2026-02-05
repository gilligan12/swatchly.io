# Setup Status ✅

## Completed

1. ✅ Next.js 16 project initialized
2. ✅ Landing page created
3. ✅ Sign-up page with Individual/Business account types
4. ✅ Login page
5. ✅ Welcome/Dashboard page
6. ✅ Supabase client configuration
7. ✅ Dependencies installed

## Next Steps: Supabase Setup

### 1. Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: `swatchly` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Wait 2-3 minutes for project creation

### 2. Get API Keys

1. In your Supabase project dashboard
2. Go to **Settings** → **API**
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
   - **service_role** key (keep this secret! Only use server-side)

### 3. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste the SQL from `SUPABASE_SETUP.md` (the full schema)
4. Click **"Run"** to execute

This creates:
- `businesses` table
- `user_profiles` table
- Row Level Security (RLS) policies
- Indexes for performance

### 4. Configure Environment Variables

1. Create `.env.local` file in the project root:

```bash
touch .env.local
```

2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: 
- Never commit `.env.local` to git (it's in `.gitignore`)
- The `NEXT_PUBLIC_` prefix makes variables available in the browser
- `SUPABASE_SERVICE_ROLE_KEY` should only be used server-side

### 5. Test the Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to:
   - Landing page: `http://localhost:3000`
   - Sign up: `http://localhost:3000/signup`
   - Login: `http://localhost:3000/login`

3. Try creating an account:
   - Choose Individual or Business
   - Fill in the form
   - Submit

4. Check Supabase:
   - Go to **Authentication** → **Users** (should see new user)
   - Go to **Table Editor** → **user_profiles** (should see profile)
   - For business accounts, check **businesses** table

### 6. Verify Dashboard

After signing up, you should be redirected to `/dashboard` and see:
- Welcome message with your name
- Getting started steps
- Stats cards (all showing 0 for now)
- Connect Store button

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
- Run: `npm install`

### Authentication errors
- Check `.env.local` has correct values
- Verify Supabase project is active
- Check browser console for specific errors

### Database errors
- Make sure you ran the SQL schema from `SUPABASE_SETUP.md`
- Check RLS policies are enabled
- Verify tables exist in Table Editor

### Redirect issues
- Clear browser cache
- Check that user is authenticated (Supabase dashboard)

## What's Next?

After Supabase is set up:
1. Test sign-up and login flows
2. Verify data is being saved correctly
3. Move on to Phase 2: Shopify Integration

## Files Created

- `/app/signup/page.tsx` - Sign-up page
- `/app/login/page.tsx` - Login page  
- `/app/dashboard/page.tsx` - Welcome dashboard
- `/app/dashboard/stores/connect/page.tsx` - Store connection page (placeholder)
- `/lib/supabase/client.ts` - Browser Supabase client
- `/lib/supabase/server.ts` - Server Supabase client
- `/types/database.ts` - TypeScript types

## Need Help?

- See `SUPABASE_SETUP.md` for detailed SQL schema
- Check Supabase docs: https://supabase.com/docs
- Review Next.js + Supabase guide: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
