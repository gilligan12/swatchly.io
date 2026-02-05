-- Complete RLS Fix for User Profiles
-- Run this in your Supabase SQL Editor to fix the RLS policy issue

-- Step 1: Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Authenticated users can create businesses" ON businesses;

-- Step 2: Create a function that can insert profiles (bypasses RLS with SECURITY DEFINER)
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
    id,
    email,
    name,
    account_type,
    business_id
  ) VALUES (
    p_user_id,
    p_email,
    p_name,
    p_account_type,
    p_business_id
  )
  ON CONFLICT (id) DO NOTHING;
END;
$$;

-- Step 3: Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_user_profile TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_user_profile TO anon;

-- Step 4: Recreate the insert policy (more permissive)
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id
  );

-- Step 5: Allow authenticated users to create businesses
CREATE POLICY "Authenticated users can create businesses"
  ON businesses FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Step 6: Verify the function works (optional test)
-- You can test with: SELECT public.create_user_profile(...);
