# Fix SMTP Email Configuration

Since signup works when email confirmation is disabled, the issue is specifically with email sending. Follow these steps to fix SMTP.

## Step 1: Verify Resend API Key

1. **Go to Resend Dashboard**
   - https://resend.com/api-keys
   - Check your API key is active
   - Copy it again (starts with `re_`)

2. **Verify Key Permissions**
   - Should have "Sending access" permission
   - If not, create a new key with full access

## Step 2: Double-Check Supabase SMTP Settings

Go to **Supabase → Authentication → Settings → SMTP Settings**

Verify each field **exactly** (copy-paste to avoid typos):

```
SMTP Host: smtp.resend.com
```
- No spaces before/after
- All lowercase
- Exact spelling

```
SMTP Port: 587
```
- Use `587` (TLS)
- Not `465` (SSL)
- Just the number, no spaces

```
SMTP User: resend
```
- All lowercase
- No spaces
- Exactly "resend"

```
SMTP Password: [Your Resend API Key]
```
- Starts with `re_`
- Copy the ENTIRE key (it's long)
- No spaces or line breaks
- Make sure you copied it completely

```
Sender Email: onboarding@resend.dev
```
- Exact email address
- No spaces
- This is Resend's test domain email

```
Sender Name: Swatchly.io
```
- Can be anything, but keep it professional

## Step 3: Test SMTP Connection

1. **In Supabase SMTP Settings**
2. **Click "Test SMTP Connection" or "Send Test Email"**
3. **Enter your email address**
4. **Click "Send"**

**If test fails:**
- Check the error message
- Verify each field matches exactly above
- Try creating a new Resend API key

**If test succeeds:**
- SMTP is configured correctly
- The issue might be with email templates or Resend account

## Step 4: Check Resend Account Status

1. **Go to Resend Dashboard**
   - https://resend.com
   - Check account status
   - Verify you haven't hit rate limits
   - Free tier: 3,000 emails/month

2. **Check Email Logs**
   - Go to **Resend → Emails**
   - Look for any attempted emails
   - Check for errors, bounces, or spam issues

## Step 5: Verify Sender Email in Resend

1. **Go to Resend Dashboard**
   - Look for **"From Addresses"** or **"Domains"**
   - Check if `onboarding@resend.dev` is available/verified
   - If not, you may need to verify it

2. **Alternative: Use Different Sender**
   - Try: `noreply@resend.dev` (if available)
   - Or verify your own domain (see `DOMAIN_VERIFICATION_GUIDE.md`)

## Step 6: Re-enable Email Confirmation

Once SMTP test works:

1. **Go to Supabase → Authentication → Settings**
2. **Toggle "Enable email confirmations" ON**
3. **Try signing up again**
4. **Check your email for verification message**

## Common Issues and Fixes

### Issue: "SMTP Authentication Failed"

**Fix:**
- Double-check API key is correct
- Make sure it's the full key (not truncated)
- Try creating a new API key

### Issue: "Connection Timeout"

**Fix:**
- Check SMTP Host: `smtp.resend.com` (exact)
- Check Port: `587` (not 465)
- Try port `465` if `587` doesn't work

### Issue: Test Email Works But Signup Fails

**Possible Causes:**
- Email template issue
- Rate limiting
- Resend account issue

**Fix:**
- Check Resend dashboard for email attempts
- Check for rate limits
- Contact Resend support if needed

### Issue: "Invalid Sender Email"

**Fix:**
- Verify sender email in Resend
- Use `onboarding@resend.dev` (test domain)
- Or verify your own domain

## Quick Checklist

Before re-enabling email confirmation:

- [ ] Resend API key is active and correct
- [ ] SMTP Host: `smtp.resend.com` (exact)
- [ ] SMTP Port: `587`
- [ ] SMTP User: `resend` (lowercase)
- [ ] SMTP Password: Full API key (starts with `re_`)
- [ ] Sender Email: `onboarding@resend.dev`
- [ ] SMTP test email works
- [ ] Resend account is active
- [ ] No rate limits hit
- [ ] Sender email is verified/available

## If Still Not Working

1. **Try Creating New Resend API Key**
   - Delete old one
   - Create new one with "Sending access"
   - Update in Supabase

2. **Try Different Sender Email**
   - Use `noreply@resend.dev` if available
   - Or verify your own domain

3. **Check Supabase Logs**
   - Logs → Auth Logs
   - Look for specific email sending errors

4. **Contact Support**
   - Resend support if API key issues
   - Supabase support if SMTP test works but signup fails

---

**Once SMTP test works, re-enable email confirmation and try signup again!**
