# Quick Setup: Using Resend Test Domain

This guide will help you set up Resend with their test domain so you can start sending emails immediately without verifying your own domain.

## What You'll Get

- ✅ Email sending working in minutes
- ✅ No domain verification needed
- ✅ Perfect for development and testing
- ✅ Can upgrade to your own domain later

**Note:** Emails will show as coming from `onboarding@resend.dev` (or similar). For production, you'll want to verify your own domain later.

## Step 1: Create Resend Account

1. **Go to Resend Website**
   - Visit: https://resend.com
   - Click **"Get Started"** or **"Sign Up"** (top right)

2. **Sign Up**
   - Choose your preferred method:
     - **GitHub** (recommended for developers)
     - **Google**
     - **Email and password**
   - Complete the sign-up process

3. **Verify Your Email** (if required)
   - Check your email inbox
   - Click the verification link
   - You're now logged into Resend

## Step 2: Get Your API Key

1. **Navigate to API Keys**
   - In Resend dashboard, click **"API Keys"** in the left sidebar
   - You should see it in the navigation menu

2. **Create API Key**
   - Click **"Create API Key"** button
   - **Name**: Enter something descriptive like `Supabase SMTP` or `Swatchly Email`
   - **Permission**: Select **"Sending access"** (full access)
   - Click **"Add API Key"**

3. **Copy Your API Key**
   - **⚠️ CRITICAL**: Copy the API key immediately
   - It will look like: `re_1234567890abcdefghijklmnop`
   - Starts with `re_` followed by random characters
   - **You won't be able to see it again after this!**
   - Save it somewhere safe:
     - Password manager (1Password, LastPass, etc.)
     - Notes app
     - Text file (but don't commit to git!)

4. **Confirm You Have It**
   - Double-check you copied the entire key
   - Make sure it starts with `re_`
   - Keep it secure - you'll need it in the next step

## Step 3: Configure Supabase SMTP

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Sign in to your account
   - Select your **Swatchly** project (or the project you're using)

2. **Navigate to Authentication Settings**
   - Click **"Authentication"** in the left sidebar
   - Click **"Settings"** (or look for a gear icon)
   - Scroll down to find **"SMTP Settings"** section

3. **Enable Custom SMTP**
   - Find the toggle for **"Enable Custom SMTP"**
   - Toggle it to **ON** (it should turn green/enabled)

4. **Enter Resend SMTP Credentials**

   Fill in each field exactly as shown:

   **SMTP Host:**
   ```
   smtp.resend.com
   ```

   **SMTP Port:**
   ```
   587
   ```
   (If 587 doesn't work, try `465`, but 587 is recommended)

   **SMTP User:**
   ```
   resend
   ```
   (This is always "resend" - lowercase, no spaces)

   **SMTP Password:**
   ```
   [Paste your Resend API key here]
   ```
   (The API key you copied in Step 2 - the one starting with `re_`)

   **Sender Email:**
   ```
   onboarding@resend.dev
   ```
   (This is Resend's test domain email - you can use this without verification)

   **Sender Name:**
   ```
   Swatchly.io
   ```
   (Or whatever you want users to see as the sender name)

5. **Save Settings**
   - Click **"Save"** or **"Update"** button
   - Supabase will validate the connection
   - You should see a success message or the settings saved

6. **Test SMTP Connection**
   - Look for a **"Test SMTP Connection"** or **"Send Test Email"** button
   - Click it
   - Enter your email address (the one you want to receive the test)
   - Click **"Send Test Email"** or **"Test"**
   - Wait a few seconds

7. **Check Your Email**
   - Go to your email inbox
   - Check spam/junk folder too (just in case)
   - You should receive a test email from `onboarding@resend.dev`
   - If you received it, you're all set! ✅

## Step 4: Test Email Flow in Your App

Now let's test that emails work in your actual application:

1. **Go to Your App**
   - Visit your app: `https://swatchly-io.vercel.app` (or your Vercel URL)
   - Or run locally: `http://localhost:3000`

2. **Test Sign-Up Email**
   - Go to `/signup` page
   - Create a new test account with your email address
   - Fill in the form:
     - Choose "Individual" or "Business"
     - Enter your name
     - Enter your email
     - Create a password
   - Click **"Create Account"** or **"Sign Up"**

3. **Check Your Email**
   - Go to your email inbox
   - You should receive a verification email from `onboarding@resend.dev`
   - The email should say "Welcome to Swatchly.io" (or similar)
   - Click the verification link in the email

4. **Verify It Works**
   - You should be redirected back to your app
   - You should be logged in or see a success message
   - If this works, email verification is working! ✅

5. **Test Password Reset** (Optional)
   - Go to `/login` page
   - Click **"Forgot password"** or **"Reset password"** link
   - Enter your email
   - Check email for reset link
   - Click the link and verify it works

## Step 5: Verify Everything Works

Check these things to make sure setup is complete:

- ✅ Test email received from Supabase
- ✅ Sign-up verification email received
- ✅ Verification link works
- ✅ Password reset email works (if tested)
- ✅ Emails show correct sender name ("Swatchly.io")

## Troubleshooting

### Problem: "Test Email Not Received"

**Solutions:**
1. **Check Spam Folder**
   - Emails might go to spam initially
   - Mark as "Not Spam" if found there

2. **Verify SMTP Settings**
   - Double-check SMTP host: `smtp.resend.com`
   - Verify port is `587`
   - Check username is exactly `resend` (lowercase)
   - Confirm API key is correct (starts with `re_`)

3. **Check Resend Dashboard**
   - Go to Resend → **"Emails"**
   - See if email was sent
   - Check delivery status

4. **Wait a Bit**
   - Sometimes there's a 1-2 minute delay
   - Wait and check again

### Problem: "SMTP Connection Failed"

**Solutions:**
1. **Check API Key**
   - Make sure you copied the entire key
   - Verify it starts with `re_`
   - Try creating a new API key if needed

2. **Check Port**
   - Try port `587` first
   - If that fails, try `465`
   - Make sure you're using the correct port

3. **Verify Settings**
   - SMTP Host: `smtp.resend.com` (exact, no spaces)
   - SMTP User: `resend` (lowercase, no spaces)
   - Check for typos

### Problem: "Emails Going to Spam"

**Solutions:**
1. **This is Normal for Test Domain**
   - `onboarding@resend.dev` may go to spam
   - This is expected with test domains
   - For production, verify your own domain

2. **Mark as Not Spam**
   - When you receive emails, mark them as "Not Spam"
   - This helps train the spam filter

3. **Check Email Content**
   - Make sure email templates look professional
   - Avoid spam trigger words

### Problem: "Verification Link Not Working"

**Solutions:**
1. **Check Supabase Redirect URLs**
   - Go to Supabase → Authentication → URL Configuration
   - Make sure your app URL is in redirect URLs:
     - `https://your-app.vercel.app/**`
     - `http://localhost:3000/**` (for local dev)

2. **Check Link Format**
   - Verification links should start with your Supabase URL
   - Should include a token parameter

## Quick Reference: Resend Test Domain Settings

Save these for quick reference:

```
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend
SMTP Password: [Your Resend API Key - starts with re_]
Sender Email: onboarding@resend.dev
Sender Name: Swatchly.io
```

## What's Next?

Now that email is working with the test domain:

1. ✅ **Test all email flows** (sign-up, password reset, etc.)
2. ✅ **Customize email templates** in Supabase (optional)
3. ✅ **Monitor email delivery** in Resend dashboard
4. 🔄 **Later: Verify your own domain** (when ready for production)
   - Follow `VERCEL_DOMAIN_SETUP.md` to add domain to Vercel
   - Follow `DOMAIN_VERIFICATION_GUIDE.md` to verify with Resend
   - Update Supabase sender email to `noreply@yourdomain.com`

## Upgrading to Your Own Domain Later

When you're ready to use your own domain:

1. **Buy/Add Domain to Vercel**
   - See `VERCEL_DOMAIN_SETUP.md`

2. **Verify Domain with Resend**
   - See `DOMAIN_VERIFICATION_GUIDE.md`

3. **Update Supabase SMTP**
   - Change sender email from `onboarding@resend.dev` to `noreply@yourdomain.com`
   - Keep all other settings the same

4. **Test Again**
   - Send test emails
   - Verify they come from your domain

---

**You're all set!** Your email authentication should now be working with Resend's test domain. You can start using your app and test all email functionality.
