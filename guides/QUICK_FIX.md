# Quick Fix for RLS Error

## The Problem
The RLS (Row Level Security) policy is blocking profile creation during sign-up because the client-side Supabase client is subject to RLS restrictions.

## Solution: Use Service Role Key

I've updated the code to use the **service role key** which bypasses RLS. You need to make sure it's set in your environment variables.

### Step 1: Check Your `.env.local` File

Make sure you have the service role key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here  ← Make sure this is set!
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Where to find it:**
1. Go to your Supabase project dashboard
2. Settings → API
3. Copy the **service_role** key (the secret one, not the anon key)

### Step 2: Restart Your Dev Server

After adding/updating the service role key:

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

### Step 3: Try Signing Up Again

The API route now uses the service role client which bypasses RLS.

## Alternative: Database Function (If Above Doesn't Work)

If you still get errors, run this SQL in your Supabase SQL Editor:

```sql
-- Create a function that bypasses RLS
CREATE OR REPLACE FUNCTION public.create_user_profile(
  p_user_id UUID,
  p_email TEXT,
  p_name TEXT,
  p_account_type TEXT,
  p_business_id UUID DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, email, name, account_type, business_id
  ) VALUES (
    p_user_id, p_email, p_name, p_account_type, p_business_id
  )
  ON CONFLICT (id) DO NOTHING;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_user_profile TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_user_profile TO anon;
```

Then update the API route to call this function instead of direct insert.

## Still Having Issues?

1. Check browser console for specific error messages
2. Check server logs (terminal where `npm run dev` is running)
3. Verify the service role key is correct in `.env.local`
4. Make sure you restarted the dev server after adding the key
