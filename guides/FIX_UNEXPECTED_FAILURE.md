# Fix: "unexpected_failure" 500 Error on Signup

The error code `unexpected_failure` with a 500 status typically means Supabase is failing to send the confirmation email, even if SMTP appears configured.

## Immediate Fix: Temporarily Disable Email Confirmation

This will let you test if the issue is specifically with email sending:

1. **Go to Supabase Dashboard**
   - Authentication → **Settings**
   - Scroll to **"Email Auth"** section
   - Find **"Enable email confirmations"**
   - **Toggle it OFF** (temporarily)

2. **Try Signing Up**
   - Users will be created without email verification
   - If this works, the issue is definitely with email/SMTP

3. **After Testing**
   - Re-enable email confirmations
   - Fix SMTP (see below)

## Root Cause: SMTP Email Sending Failure

Even if SMTP test works, the actual signup email might fail because:

### Issue 1: Sender Email Not Verified in Resend

1. **Go to Resend Dashboard**
   - https://resend.com/emails
   - Go to **"From Addresses"** or **"Domains"**
   - Check if `onboarding@resend.dev` is verified
   - If not, verify it

2. **Or Use a Different Sender**
   - Try: `noreply@resend.dev` (if available)
   - Or verify your own domain

### Issue 2: SMTP Credentials Wrong

Double-check in Supabase:

1. **Authentication → Settings → SMTP Settings**
2. **Verify each field exactly:**
   ```
   SMTP Host: smtp.resend.com
   SMTP Port: 587
   SMTP User: resend
   SMTP Password: [Your Resend API key - starts with re_]
   Sender Email: onboarding@resend.dev
   Sender Name: Swatchly.io
   ```

3. **Common Mistakes:**
   - Extra spaces in host or user
   - Wrong port (should be 587, not 465)
   - API key copied incorrectly
   - Sender email typo

### Issue 3: Resend API Key Issue

1. **Go to Resend Dashboard → API Keys**
2. **Check if your key is active**
3. **Check permissions** - should have "Sending access"
4. **Try creating a new API key**
   - Delete old one
   - Create new one
   - Update in Supabase

### Issue 4: Rate Limit or Account Issue

1. **Check Resend Dashboard**
   - Go to https://resend.com
   - Check account status
   - Check if you've hit rate limits
   - Free tier: 3,000 emails/month

2. **Check Email Logs**
   - Resend → Emails
   - See if any emails were attempted
   - Check for bounce/spam issues

## Step-by-Step Debugging

### Step 1: Test SMTP Connection

1. **Supabase → Authentication → Settings → SMTP Settings**
2. **Click "Test SMTP Connection"**
3. **Enter your email**
4. **Click "Send Test Email"**

**If test fails:**
- SMTP is definitely misconfigured
- Fix SMTP settings
- Try test again

**If test succeeds but signup still fails:**
- Continue to Step 2

### Step 2: Check Resend Dashboard

1. **Go to Resend → Emails**
2. **Look for any signup emails attempted**
3. **Check delivery status**
4. **Look for errors or bounces**

### Step 3: Verify Sender Email

1. **Resend → From Addresses** (or Domains)
2. **Check if sender email is verified**
3. **If using test domain, make sure it's active**

### Step 4: Try Different Sender Email

If `onboarding@resend.dev` doesn't work:

1. **In Supabase SMTP Settings**
2. **Try different sender:**
   - `noreply@resend.dev`
   - Or verify your own domain

## Alternative: Use Supabase Default Email (Temporary)

If Resend isn't working, you can temporarily use Supabase's default email:

1. **Supabase → Authentication → Settings → SMTP Settings**
2. **Toggle "Enable Custom SMTP" OFF**
3. **Try signing up**
4. **If it works**: Issue is with Resend configuration
5. **Re-enable custom SMTP and fix Resend**

## Most Likely Fix

Based on the "unexpected_failure" error, try this order:

1. ✅ **Disable email confirmation temporarily** (to test)
2. ✅ **Verify sender email in Resend** (`onboarding@resend.dev`)
3. ✅ **Test SMTP connection** in Supabase
4. ✅ **Check Resend API key** is correct and active
5. ✅ **Check Resend dashboard** for email attempts/errors

## After Fixing

Once SMTP is working:

1. **Re-enable email confirmations**
2. **Test signup again**
3. **Verify email is received**
4. **Click verification link**
5. **Confirm it works end-to-end**

---

**Quick Test:**
1. Disable email confirmation in Supabase
2. Try signup
3. If it works → Issue is email/SMTP
4. Fix SMTP, then re-enable email confirmation
