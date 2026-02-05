-- Fix for RLS Policy Issue
-- Run this in your Supabase SQL Editor if you're getting RLS policy errors

-- Option 1: Create a function that can insert profiles (bypasses RLS)
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_user_profile TO authenticated;

-- Option 2: Alternative - Make the insert policy more permissive
-- Drop the existing insert policy
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- Create a more permissive policy that allows inserts for new users
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id OR
    -- Allow if the user is authenticated and the id matches
    (auth.uid() IS NOT NULL AND auth.uid() = id)
  );
