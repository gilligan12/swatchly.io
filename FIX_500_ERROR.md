# Fix: Supabase 500 Error on Signup

You're getting a 500 error from Supabase's signup endpoint. This is a server-side error, usually caused by:

1. **Redirect URL not in allowed list**
2. **SMTP configuration issue**
3. **Supabase configuration problem**

## Quick Fix Steps

### Step 1: Verify Redirect URLs in Supabase

The error shows it's trying to use: `https://swatchly-io.vercel.app/auth/callback`

1. **Go to Supabase Dashboard**
   - Authentication → **URL Configuration**

2. **Check Redirect URLs**
   - Make sure this EXACT URL is in the list:
     ```
     https://swatchly-io.vercel.app/**
     ```
   - Also add:
     ```
     https://swatchly-io.vercel.app/auth/callback
     ```

3. **Check Site URL**
   - **Site URL** should be: `https://swatchly-io.vercel.app`
   - This is the default redirect URL

4. **Save Changes**

### Step 2: Verify SMTP is Working

Even though SMTP looks configured, the 500 error might be because Supabase can't send the email.

1. **Go to Authentication → Settings → SMTP Settings**
2. **Click "Test SMTP Connection"**
3. **Send a test email**
4. **Check if you receive it**

**If test fails:**
- The 500 error is likely because SMTP is misconfigured
- Fix SMTP first (see `RESEND_TEST_DOMAIN_SETUP.md`)
- Then try signup again

### Step 3: Check Supabase Status

1. **Check Supabase Status Page**
   - https://status.supabase.com
   - See if there are any ongoing issues

2. **Check Your Project Status**
   - In Supabase Dashboard, check if project is active
   - Look for any warnings or errors

### Step 4: Try Disabling Email Confirmation (Temporary Test)

To test if the issue is specifically with email sending:

1. **Supabase → Authentication → Settings**
2. **Find "Enable email confirmations"**
3. **Toggle it OFF** (temporarily)
4. **Try signing up**
5. **If signup works**: Issue is with email/SMTP
6. **Re-enable after fixing**

## Most Likely Cause

Based on the 500 error, the most likely causes are:

### 1. Redirect URL Not Allowed (Most Common)

**Fix:**
- Add `https://swatchly-io.vercel.app/**` to Redirect URLs
- Make sure Site URL is set correctly

### 2. SMTP Configuration Issue

**Fix:**
- Test SMTP connection in Supabase
- If test fails, reconfigure SMTP
- Verify Resend API key is correct

### 3. Email Confirmation Enabled But SMTP Broken

**Fix:**
- Either fix SMTP
- Or temporarily disable email confirmation

## Step-by-Step Debugging

### Check 1: Redirect URLs

```
✅ Site URL: https://swatchly-io.vercel.app
✅ Redirect URLs include:
   - https://swatchly-io.vercel.app/**
   - https://swatchly-io.vercel.app/auth/callback
```

### Check 2: SMTP Test

```
✅ SMTP enabled: Yes
✅ SMTP test email: Received successfully
```

### Check 3: Email Confirmation

```
Option A: Disable temporarily to test
Option B: Keep enabled but fix SMTP
```

## What the Code Does Now

I've updated the code to:
- **Not set emailRedirectTo** - Let Supabase use the Site URL from settings
- This should avoid redirect URL issues
- Supabase will use whatever is set in Site URL

## After Fixing

1. **Try signing up again**
2. **Check browser console** for any new errors
3. **Check Supabase Auth Logs** for detailed error
4. **If still failing**, share the exact error from Supabase logs

## If Still Getting 500 Error

1. **Check Supabase Logs → Auth Logs**
   - Look for the exact error message
   - It will tell you what's wrong

2. **Contact Supabase Support**
   - If it's a 500 error, it might be a Supabase issue
   - Share the error details with them

---

**Next Steps:**
1. ✅ Add redirect URLs to Supabase
2. ✅ Test SMTP connection
3. ✅ Try signup again
4. ✅ Check Supabase logs for exact error if still failing
