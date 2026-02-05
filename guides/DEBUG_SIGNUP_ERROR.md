# Debugging Signup "Error sending confirmation email"

If you're still getting this error after verifying SMTP settings, follow these steps:

## Step 1: Check Browser Console

1. **Open Browser Developer Tools**
   - Press F12 or right-click → Inspect
   - Go to **Console** tab
   - Clear the console

2. **Try to Sign Up**
   - Fill out the form
   - Click "Create Account"
   - Look for error messages in the console
   - Copy any error messages you see

3. **Check Network Tab**
   - Go to **Network** tab in DevTools
   - Try signup again
   - Look for failed requests (red)
   - Click on failed requests to see error details

## Step 2: Check Supabase Logs

1. **Go to Supabase Dashboard**
   - Logs → **Auth Logs**
   - Look for recent signup attempts
   - Check for error messages
   - Note the exact error text

2. **Check API Logs**
   - Logs → **API Logs**
   - Look for errors related to auth

## Step 3: Test Without Email Redirect

I've temporarily removed the `emailRedirectTo` option in the code to test if that's causing the issue.

**Try signing up now** - if it works, the issue is with the redirect URL configuration.

## Step 4: Verify Supabase Settings

### Check Email Confirmation Settings

1. **Go to Authentication → Settings**
2. **Find "Enable email confirmations"**
3. **Check if it's enabled**
   - If disabled, users won't need email verification
   - If enabled, emails must be sent

### Check SMTP Settings Again

1. **Authentication → Settings → SMTP Settings**
2. **Verify each field:**
   - Host: `smtp.resend.com` (exact, no spaces)
   - Port: `587` (not 465)
   - User: `resend` (lowercase)
   - Password: Your API key (starts with `re_`)
   - Sender: `onboarding@resend.dev`

3. **Test Connection Again**
   - Click "Test SMTP Connection"
   - If it fails, note the exact error

## Step 5: Check Resend Dashboard

1. **Go to Resend Dashboard**
   - https://resend.com/emails
   - Check if any emails were attempted
   - Look for delivery status
   - Check for any errors or bounces

2. **Check API Key**
   - Go to API Keys
   - Verify your key is active
   - Check if it has "Sending access" permission

## Step 6: Try Disabling Email Confirmation (Temporary)

**For testing only** - to see if the issue is with email sending:

1. **Supabase → Authentication → Settings**
2. **Find "Enable email confirmations"**
3. **Toggle it OFF** (temporarily)
4. **Try signing up**
5. **If signup works**: The issue is with email sending
6. **Re-enable after testing**

## Common Error Messages and Fixes

### "Invalid redirect URL"
- **Fix**: Add your URL to Supabase Redirect URLs
- Format: `https://your-app.vercel.app/**`

### "SMTP connection failed"
- **Fix**: Check SMTP credentials
- Test SMTP connection in Supabase
- Verify Resend API key is correct

### "Email rate limit exceeded"
- **Fix**: Check Resend dashboard for rate limits
- Free tier: 3,000 emails/month
- Wait or upgrade plan

### "User already exists"
- **Fix**: Try a different email
- Or reset password for existing account

## What to Share for Help

If you're still stuck, share:

1. **Exact error message** from browser console
2. **Supabase Auth Logs** error message
3. **SMTP test result** (does it work?)
4. **Resend dashboard** - any emails attempted?
5. **Browser console** - any JavaScript errors?

## Quick Test: Sign Up Without Email Verification

To test if the issue is specifically with email:

1. **Disable email confirmation** in Supabase (temporary)
2. **Try signing up**
3. **If it works**: Issue is with email/SMTP
4. **If it fails**: Issue is with signup itself (not email)

---

**Next Steps:**
1. Check browser console for exact error
2. Check Supabase logs
3. Try the updated code (without emailRedirectTo)
4. Share the exact error message if still failing
