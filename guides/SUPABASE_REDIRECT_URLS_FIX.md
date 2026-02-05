# Fix: Email Verification Redirects to Localhost

If email verification links are taking you to `localhost` instead of your production website, you need to update Supabase's URL configuration.

## Quick Fix

### Step 1: Get Your Production URL

Find your Vercel deployment URL:
- Go to Vercel Dashboard → Your Project
- Your URL will be something like: `https://swatchly-io.vercel.app`
- Or your custom domain if you've set one up

### Step 2: Update Supabase URL Configuration

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project

2. **Navigate to URL Configuration**
   - Click **"Authentication"** in the left sidebar
   - Click **"URL Configuration"** (or go to **Settings** → **URL Configuration**)

3. **Update Site URL**
   - **Site URL**: Change from `http://localhost:3000` to your production URL
   - Example: `https://swatchly-io.vercel.app`
   - This is the default redirect URL

4. **Add Redirect URLs**
   - In the **"Redirect URLs"** section, you should see a list
   - Make sure these URLs are added:
     ```
     https://swatchly-io.vercel.app/**
     https://swatchly-io.vercel.app/auth/callback
     http://localhost:3000/**
     http://localhost:3000/auth/callback
     ```
   - Click **"Add URL"** for each one if they're not already there
   - The `/**` wildcard allows all paths under that domain

5. **Save Changes**
   - Click **"Save"** or **"Update"**
   - Changes take effect immediately

### Step 3: Test Again

1. **Request a New Verification Email**
   - Since the old email link has localhost in it, you'll need a new one
   - Go to your app's login page
   - Try to log in with your unverified account
   - Supabase will offer to resend the verification email
   - OR go to Supabase Dashboard → Authentication → Users
   - Find your user and click "Resend verification email"

2. **Check the New Email**
   - The new verification link should point to your production URL
   - Click it and verify it works

## Alternative: Update Signup to Use Production URL

If you want to ensure signup always uses the production URL, you can update the signup code to specify the redirect URL.

### Update Signup Page

The signup page can specify where to redirect after verification:

```typescript
// In app/signup/page.tsx, update the signUp call:
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: individualEmail,
  password: individualPassword,
  options: {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://swatchly-io.vercel.app'}/auth/callback`,
    data: {
      name: individualName,
      account_type: 'individual',
    },
  },
})
```

But the easier solution is to just update Supabase's URL configuration as shown above.

## For Development vs Production

You can keep both localhost and production URLs in the redirect URLs list. Supabase will use:
- The redirect URL specified in the signup options (if provided)
- Or the Site URL as default
- Or match against the allowed Redirect URLs list

## Verify Your Configuration

After updating, verify:

1. ✅ Site URL is set to production URL
2. ✅ Production URL is in Redirect URLs list
3. ✅ Localhost is still in Redirect URLs (for local development)
4. ✅ New verification emails use production URL

## Troubleshooting

### Still Redirecting to Localhost?

1. **Check Environment Variables**
   - Make sure `NEXT_PUBLIC_APP_URL` in Vercel is set to your production URL
   - Go to Vercel → Project → Settings → Environment Variables

2. **Request New Verification Email**
   - Old emails will still have localhost links
   - Request a new one after updating Supabase settings

3. **Check Supabase Logs**
   - Go to Supabase → Logs → Auth Logs
   - See what redirect URLs are being used

### Links Not Working?

1. **Check Redirect URL Format**
   - Should be: `https://your-app.vercel.app/**`
   - The `/**` allows all paths

2. **Verify HTTPS**
   - Make sure you're using `https://` not `http://` for production

3. **Check Custom Domain**
   - If using a custom domain, add that to redirect URLs too

## Quick Checklist

- [ ] Site URL updated to production URL in Supabase
- [ ] Production URL added to Redirect URLs
- [ ] Localhost still in Redirect URLs (for dev)
- [ ] Requested new verification email
- [ ] Tested new verification link
- [ ] Verified it redirects to production site

---

**After fixing, new verification emails will redirect to your production site!** 🎉
