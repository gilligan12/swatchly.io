# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `swatchly` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to you
5. Wait for the project to be created (takes a few minutes)

## 2. Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## 3. Set Up Database Schema

Run the following SQL in your Supabase SQL Editor (SQL Editor → New Query):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('individual', 'business')),
  business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster lookups
CREATE INDEX idx_user_profiles_business_id ON user_profiles(business_id);
CREATE INDEX idx_user_profiles_account_type ON user_profiles(account_type);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create function to handle user profile creation
-- This function runs with elevated privileges to bypass RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- This will be called from the client, so we'll create profiles manually
  -- The trigger approach would require the profile data to be in auth.users metadata
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for user_profiles
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow users to insert their own profile during signup
-- This policy allows insertion if the id matches the authenticated user
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for businesses
-- Allow authenticated users to create businesses (needed during signup)
CREATE POLICY "Authenticated users can create businesses"
  ON businesses FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can view businesses they belong to
CREATE POLICY "Users can view their business"
  ON businesses FOR SELECT
  USING (
    id IN (
      SELECT business_id FROM user_profiles WHERE id = auth.uid()
    )
  );

-- Business admins can update their business
CREATE POLICY "Business admins can update their business"
  ON businesses FOR UPDATE
  USING (
    id IN (
      SELECT business_id FROM user_profiles 
      WHERE id = auth.uid() AND account_type = 'business'
    )
  );
```

## 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 5. Install Dependencies

Run:
```bash
npm install
```

## 6. Test the Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/signup`
3. Try creating an account (individual or business)
4. Check your Supabase dashboard to see if the user and profile were created

## Troubleshooting

- **"Cannot find module '@supabase/supabase-js'"**: Run `npm install`
- **Authentication errors**: Check that your API keys are correct in `.env.local`
- **RLS policy errors**: Make sure you've run all the SQL commands above
- **Database connection errors**: Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
