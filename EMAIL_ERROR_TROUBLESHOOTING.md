# Troubleshooting: "Error sending confirmation email"

If you're getting "Error sending confirmation email" and users aren't being created, follow these steps:

## Quick Checks

### 1. Verify SMTP is Configured in Supabase

1. **Go to Supabase Dashboard**
   - Authentication → Settings → SMTP Settings
   - Check that **"Enable Custom SMTP"** is toggled ON
   - Verify all SMTP fields are filled:
     - SMTP Host: `smtp.resend.com`
     - SMTP Port: `587`
     - SMTP User: `resend`
     - SMTP Password: Your Resend API key
     - Sender Email: `onboarding@resend.dev` (or your verified domain)
     - Sender Name: `Swatchly.io`

2. **Test SMTP Connection**
   - Click "Test SMTP Connection" or "Send Test Email"
   - Enter your email
   - Check if you receive the test email
   - If test fails, SMTP is misconfigured

### 2. Check Resend API Key

1. **Verify API Key is Correct**
   - Go to Resend Dashboard → API Keys
   - Make sure your API key is active
   - Copy it again if needed
   - Update in Supabase SMTP settings

2. **Check Resend Account Status**
   - Make sure your Resend account is active
   - Check if you've hit any rate limits
   - Free tier: 3,000 emails/month

### 3. Check Supabase URL Configuration

1. **Go to Authentication → URL Configuration**
   - **Site URL**: Should be your production URL or `http://localhost:3000` for local
   - **Redirect URLs**: Should include:
     - `https://your-app.vercel.app/**`
     - `https://your-app.vercel.app/auth/callback`
     - `http://localhost:3000/**` (for local dev)

2. **Verify Redirect URLs are Valid**
   - Make sure URLs use correct protocol (`https://` for production, `http://` for localhost)
   - No trailing slashes (except after `/**`)
   - URLs are in the allowed list

### 4. Check Browser Console

1. **Open Browser Developer Tools**
   - Press F12 or right-click → Inspect
   - Go to Console tab

2. **Look for Errors**
   - Check for any JavaScript errors
   - Look for Supabase error messages
   - Note the exact error text

### 5. Check Supabase Logs

1. **Go to Supabase Dashboard**
   - Logs → Auth Logs
   - Look for recent signup attempts
   - Check for error messages

## Common Issues and Fixes

### Issue 1: SMTP Not Configured

**Symptoms:**
- "Error sending confirmation email"
- No user created in Supabase

**Fix:**
- Follow `RESEND_TEST_DOMAIN_SETUP.md` to configure SMTP
- Make sure SMTP is enabled in Supabase

### Issue 2: Invalid Redirect URL

**Symptoms:**
- Error when clicking signup
- URL not in allowed list

**Fix:**
- Add your URL to Supabase Redirect URLs
- Make sure format is correct: `https://your-app.vercel.app/**`

### Issue 3: Resend API Key Invalid

**Symptoms:**
- SMTP test fails
- "Authentication failed" error

**Fix:**
- Get a new API key from Resend
- Update in Supabase SMTP settings
- Test connection again

### Issue 4: Email Service Down

**Symptoms:**
- SMTP test worked before but now fails
- No recent changes

**Fix:**
- Check Resend status page
- Wait a few minutes and try again
- Contact Resend support if persistent

## Step-by-Step Debugging

### Step 1: Test SMTP First

Before trying to sign up, test SMTP:

1. Supabase → Authentication → Settings → SMTP Settings
2. Click "Test SMTP Connection"
3. Enter your email
4. Check inbox for test email

**If test fails:**
- Fix SMTP configuration first
- Don't try signup until SMTP test works

**If test succeeds:**
- SMTP is working, issue is elsewhere
- Continue to Step 2

### Step 2: Check Signup Code

1. Open browser console (F12)
2. Try to sign up
3. Look for errors in console
4. Check Network tab for failed requests

### Step 3: Verify User Creation

Even if email fails, user should still be created:

1. Go to Supabase → Authentication → Users
2. Check if user appears (even if unverified)
3. If user appears: Email sending issue
4. If user doesn't appear: Signup is failing completely

### Step 4: Check Email in Resend

1. Go to Resend Dashboard → Emails
2. Check if email was attempted to send
3. See delivery status
4. Check for bounce/spam issues

## Temporary Workaround

If you need to test without email verification:

1. **Disable Email Confirmation** (temporary, for testing only)
   - Supabase → Authentication → Settings
   - Find "Enable email confirmations"
   - Toggle OFF (not recommended for production)

2. **Users can sign up without email verification**
   - Good for testing
   - Bad for production security

3. **Re-enable after fixing SMTP**

## Getting More Help

If nothing works:

1. **Check Supabase Status**: https://status.supabase.com
2. **Check Resend Status**: https://status.resend.com
3. **Check Browser Console**: For specific error messages
4. **Check Supabase Logs**: For server-side errors
5. **Check Resend Dashboard**: For email delivery status

## Quick Fix Checklist

- [ ] SMTP enabled in Supabase
- [ ] SMTP test email works
- [ ] Resend API key is correct
- [ ] Redirect URLs configured in Supabase
- [ ] Site URL is correct
- [ ] No errors in browser console
- [ ] No errors in Supabase logs
- [ ] Resend account is active

---

**Most Common Fix:** Make sure SMTP is properly configured and test connection works before trying signup!
