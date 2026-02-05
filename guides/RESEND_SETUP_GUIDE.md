# Complete Resend + Supabase Setup Guide

This is a detailed, step-by-step guide to set up Resend for email authentication in your Supabase project.

## Overview

Resend is a modern email API built for developers. It offers:
- ✅ 3,000 emails/month free tier
- ✅ Great deliverability
- ✅ Simple API and SMTP
- ✅ Easy domain verification
- ✅ Real-time analytics

## Part 1: Setting Up Resend Account

### Step 1: Create Resend Account

1. **Go to Resend Website**
   - Visit: https://resend.com
   - Click **"Get Started"** or **"Sign Up"** button (top right)

2. **Sign Up Options**
   - You can sign up with:
     - GitHub account (recommended for developers)
     - Google account
     - Email and password

3. **Complete Registration**
   - If using email/password:
     - Enter your email address
     - Create a password
     - Click **"Create Account"**
   - Verify your email if prompted

4. **Welcome Screen**
   - You'll see the Resend dashboard
   - You're now on the free tier (3,000 emails/month)

### Step 2: Verify Your Domain (Recommended)

**Why verify a domain?**
- Better deliverability
- Emails come from your domain (e.g., `noreply@swatchly.io`)
- Professional appearance
- Avoids spam filters
- Builds domain reputation over time

**Option A: Verify Your Own Domain**

#### Step 2a: Add Domain in Resend

1. **Go to Domains in Resend**
   - In Resend dashboard, click **"Domains"** in the left sidebar
   - Click **"Add Domain"** button

2. **Enter Your Domain**
   - Enter your domain (e.g., `swatchly.io`)
   - **Note**: You can use a subdomain like `mail.swatchly.io` if you prefer
   - Click **"Add Domain"**

3. **Get DNS Records**
   - Resend will show you DNS records to add
   - You'll see three types of records:
     - **SPF Record** (TXT record) - Verifies sender identity
     - **DKIM Record** (TXT record) - Signs emails cryptographically
     - **DMARC Record** (TXT record) - Optional but recommended for security
   - **Copy each record** - You'll need to add these to your DNS

#### Step 2b: Add DNS Records to Your Domain

The process depends on where your domain DNS is managed. Here are instructions for common scenarios:

**Scenario 1: Domain Managed by Vercel**

If you've added your domain to Vercel, you can manage DNS through Vercel:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project (swatchly.io)

2. **Navigate to Domain Settings**
   - Click on your project
   - Go to **Settings** → **Domains**
   - Find your domain (e.g., `swatchly.io`)
   - Click on it to view DNS settings

3. **Add DNS Records**
   - Look for **"DNS Records"** or **"DNS Configuration"** section
   - Click **"Add Record"** or **"Add DNS Record"**
   
4. **Add SPF Record**
   - **Type**: Select **TXT**
   - **Name**: Leave blank or enter `@` (for root domain)
   - **Value**: Paste the SPF record from Resend
     - Example: `v=spf1 include:resend.com ~all`
   - **TTL**: Leave default (usually 3600)
   - Click **"Save"** or **"Add Record"**

5. **Add DKIM Record**
   - Click **"Add Record"** again
   - **Type**: Select **TXT**
   - **Name**: Enter the DKIM selector from Resend
     - Example: `resend._domainkey` or similar
     - Resend will show you the exact name to use
   - **Value**: Paste the full DKIM record from Resend
     - This will be a long string starting with `v=DKIM1; k=rsa; p=...`
   - **TTL**: Leave default
   - Click **"Save"**

6. **Add DMARC Record (Optional but Recommended)**
   - Click **"Add Record"** again
   - **Type**: Select **TXT**
   - **Name**: Enter `_dmarc`
   - **Value**: `v=DMARC1; p=none; rua=mailto:dmarc@swatchly.io`
     - Replace `dmarc@swatchly.io` with your email for DMARC reports
   - **TTL**: Leave default
   - Click **"Save"**

7. **Wait for DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually takes 10-30 minutes
   - You can check propagation at: https://dnschecker.org

8. **Verify in Resend**
   - Go back to Resend dashboard → **Domains**
   - Click **"Verify"** button next to your domain
   - Resend will check if DNS records are correct
   - Status will show **"Verified"** ✅ when ready
   - If it fails, wait a few more minutes and try again

**Scenario 2: Domain Managed by Cloudflare**

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Select your domain

2. **Go to DNS Settings**
   - Click **"DNS"** in the left sidebar
   - Click **"Add record"**

3. **Add Each Record**
   - Follow the same steps as Vercel above
   - Add SPF, DKIM, and DMARC records as TXT records
   - Cloudflare will auto-suggest the correct format

4. **Verify in Resend**
   - Wait 5-10 minutes
   - Click "Verify" in Resend dashboard

**Scenario 3: Domain Managed by GoDaddy, Namecheap, or Other Registrar**

1. **Log into Your Registrar**
   - Go to your domain registrar's website
   - Log into your account

2. **Find DNS Management**
   - Look for **"DNS Management"**, **"DNS Settings"**, or **"Advanced DNS"**
   - This is usually under **"Domain Settings"** or **"My Domains"**

3. **Add DNS Records**
   - Find the section to add **TXT records**
   - Click **"Add Record"** or **"Add"**
   - Add each record (SPF, DKIM, DMARC) as shown above
   - Save each record

4. **Verify in Resend**
   - Wait 10-30 minutes for DNS propagation
   - Click "Verify" in Resend dashboard

**Scenario 4: Using a Subdomain (e.g., mail.swatchly.io)**

If you want to use a subdomain instead of the root domain:

1. **In Resend**: Add `mail.swatchly.io` (or your preferred subdomain)
2. **In DNS**: Add records with the subdomain name
   - For SPF: Name = `mail` (or leave blank if using `@`)
   - For DKIM: Name = `resend._domainkey.mail` (Resend will show exact name)
   - For DMARC: Name = `_dmarc.mail`
3. **Verify**: Same process as above

#### Step 2c: Verify Domain Status

1. **Check DNS Propagation** (Optional)
   - Visit: https://dnschecker.org
   - Enter your domain
   - Select **TXT** record type
   - Check if your records appear globally
   - Wait until they show up in most locations

2. **Verify in Resend**
   - Go to Resend dashboard → **Domains**
   - Find your domain in the list
   - Click **"Verify"** button
   - Resend will check all DNS records
   - You'll see status:
     - ✅ **"Verified"** - All good!
     - ❌ **"Pending"** - DNS still propagating, wait and try again
     - ❌ **"Failed"** - Check that records are added correctly

3. **Troubleshooting Verification**
   - If verification fails:
     - Double-check record names match exactly
     - Verify record values are copied completely
     - Ensure TTL has passed (wait 10-15 minutes)
     - Check for typos in domain name
     - Make sure you're adding TXT records, not other types

**Option B: Use Resend Test Domain (For Testing)**

If you don't have a domain yet, you can use Resend's test domain:

1. **Go to Domains**
   - Click **"Domains"** in Resend dashboard
   - You'll see a default domain like `resend.dev`
   - This is for testing only (emails will show as coming from Resend)

2. **Note**: For production, you should verify your own domain

### Step 3: Create API Key

1. **Go to API Keys**
   - In Resend dashboard, click **"API Keys"** in the left sidebar
   - Click **"Create API Key"** button

2. **Configure API Key**
   - **Name**: Give it a descriptive name (e.g., "Supabase SMTP")
   - **Permission**: Select **"Sending access"** (full access)
   - Click **"Add API Key"**

3. **Copy Your API Key**
   - **⚠️ IMPORTANT**: Copy the API key immediately
   - It starts with `re_` followed by random characters
   - Example: `re_1234567890abcdefghijklmnop`
   - **You won't be able to see it again!**
   - Save it securely (password manager, notes app, etc.)

4. **Note the API Key**
   - You'll need this for Supabase SMTP configuration
   - Keep it secret - don't commit to git!

## Part 2: Configure Resend in Supabase

### Step 4: Get Your Sender Email

1. **Determine Sender Email**
   - If you verified a domain: Use `noreply@yourdomain.com` or `hello@yourdomain.com`
   - If using test domain: Use `onboarding@resend.dev` (or similar)
   - This is the "From" address for your emails

2. **Verify Sender Email** (if using your domain)
   - In Resend, go to **"Emails"** → **"From Addresses"**
   - Add your sender email if needed
   - Verify it (Resend will send a verification email)

### Step 5: Configure SMTP in Supabase

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Sign in to your account
   - Select your **Swatchly** project

2. **Navigate to Authentication Settings**
   - Click **"Authentication"** in the left sidebar
   - Click **"Settings"** (or the gear icon)
   - Scroll down to find **"SMTP Settings"** section

3. **Enable Custom SMTP**
   - Find the toggle for **"Enable Custom SMTP"**
   - Toggle it to **ON** (green/enabled)

4. **Enter Resend SMTP Credentials**

   Fill in the following fields:

   **SMTP Host:**
   ```
   smtp.resend.com
   ```

   **SMTP Port:**
   ```
   587
   ```
   (Use `465` if `587` doesn't work, but `587` is recommended)

   **SMTP User:**
   ```
   resend
   ```
   (This is always "resend" for Resend SMTP)

   **SMTP Password:**
   ```
   [Paste your Resend API key here]
   ```
   (The API key you copied in Step 3, starting with `re_`)

   **Sender Email:**
   ```
   noreply@yourdomain.com
   ```
   (Or `onboarding@resend.dev` if using test domain)

   **Sender Name:**
   ```
   Swatchly.io
   ```
   (Or whatever you want users to see as the sender name)

5. **Save Settings**
   - Click **"Save"** or **"Update"** button
   - Supabase will validate the connection

6. **Test SMTP Connection**
   - Look for a **"Test SMTP Connection"** or **"Send Test Email"** button
   - Click it
   - Enter your email address
   - Click **"Send Test Email"**
   - Check your inbox (and spam folder) for the test email
   - If you receive it, you're all set! ✅

## Part 3: Configure Email Templates (Optional but Recommended)

### Step 6: Customize Email Templates

1. **Go to Email Templates**
   - In Supabase, go to **Authentication** → **Email Templates**
   - You'll see several templates:
     - **Confirm signup** - Email verification
     - **Magic Link** - Passwordless login
     - **Change Email Address** - Email change
     - **Reset Password** - Password reset
     - **Invite user** - Team invitations

2. **Customize "Confirm signup" Template**

   Click on **"Confirm signup"** template:

   **Subject Line:**
   ```
   Welcome to Swatchly.io - Verify Your Email
   ```

   **Email Body (HTML):**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
     <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
       <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Swatchly.io!</h1>
     </div>
     
     <div style="background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
       <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
       
       <p style="font-size: 16px; margin-bottom: 20px;">
         Thanks for signing up! We're excited to have you on board.
       </p>
       
       <p style="font-size: 16px; margin-bottom: 30px;">
         To get started, please verify your email address by clicking the button below:
       </p>
       
       <div style="text-align: center; margin: 30px 0;">
         <a href="{{ .ConfirmationURL }}" style="background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">
           Verify Email Address
         </a>
       </div>
       
       <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
         Or copy and paste this URL into your browser:
       </p>
       <p style="font-size: 12px; color: #9ca3af; word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px;">
         {{ .ConfirmationURL }}
       </p>
       
       <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
         This link will expire in 24 hours.
       </p>
       
       <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
         If you didn't create an account, you can safely ignore this email.
       </p>
       
       <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
       
       <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
         © 2024 Swatchly.io. All rights reserved.
       </p>
     </div>
   </body>
   </html>
   ```

   **Click "Save"**

3. **Customize "Reset Password" Template**

   Click on **"Reset Password"** template:

   **Subject Line:**
   ```
   Reset Your Swatchly.io Password
   ```

   **Email Body (HTML):**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
   <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
     <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
       <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
     </div>
     
     <div style="background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
       <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
       
       <p style="font-size: 16px; margin-bottom: 20px;">
         We received a request to reset your password for your Swatchly.io account.
       </p>
       
       <p style="font-size: 16px; margin-bottom: 30px;">
         Click the button below to reset your password:
       </p>
       
       <div style="text-align: center; margin: 30px 0;">
         <a href="{{ .ConfirmationURL }}" style="background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">
           Reset Password
         </a>
       </div>
       
       <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
         Or copy and paste this URL into your browser:
       </p>
       <p style="font-size: 12px; color: #9ca3af; word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px;">
         {{ .ConfirmationURL }}
       </p>
       
       <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
         This link will expire in 1 hour.
       </p>
       
       <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
         If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
       </p>
       
       <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
       
       <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
         © 2024 Swatchly.io. All rights reserved.
       </p>
     </div>
   </body>
   </html>
   ```

   **Click "Save"**

## Part 4: Configure Redirect URLs

### Step 7: Update Supabase URL Configuration

1. **Go to URL Configuration**
   - In Supabase, go to **Authentication** → **URL Configuration**
   - (Or **Authentication** → **Settings** → **URL Configuration**)

2. **Set Site URL**
   - **Site URL**: Enter your production URL
     ```
     https://swatchly-io.vercel.app
     ```
     (Or your actual Vercel deployment URL)

3. **Add Redirect URLs**
   - In **"Redirect URLs"** section, add:
     ```
     https://swatchly-io.vercel.app/**
     https://swatchly-io.vercel.app/auth/callback
     http://localhost:3000/**
     http://localhost:3000/auth/callback
     ```
   - Click **"Add URL"** for each one
   - This allows Supabase to redirect users back to your app after email verification

4. **Save Changes**
   - Click **"Save"** or **"Update"**

## Part 5: Testing Your Setup

### Step 8: Test Email Verification Flow

1. **Test Sign-Up Email**
   - Go to your app: `https://swatchly-io.vercel.app/signup`
   - Create a new test account with your email
   - Check your email inbox
   - You should receive a verification email from Resend
   - Click the verification link
   - You should be redirected back to your app

2. **Check Email Appearance**
   - Verify the email looks good
   - Check sender name and email
   - Test the button/link works
   - Check on mobile device too

3. **Test Password Reset**
   - Go to login page
   - Click "Forgot password" or "Reset password"
   - Enter your email
   - Check email for reset link
   - Click the link and verify it works

### Step 9: Monitor Email Delivery

1. **Check Resend Dashboard**
   - Go to Resend dashboard
   - Click **"Emails"** in the left sidebar
   - You'll see all sent emails
   - Check delivery status, opens, clicks

2. **Check Supabase Logs**
   - In Supabase, go to **Logs** → **Auth Logs**
   - Check for any email sending errors
   - Look for successful email sends

## Troubleshooting

### Problem: Test Email Not Received

**Solutions:**
1. Check spam/junk folder
2. Verify SMTP credentials are correct
3. Check Resend dashboard for delivery status
4. Verify sender email is correct
5. Wait a few minutes (sometimes there's a delay)

### Problem: "SMTP Connection Failed"

**Solutions:**
1. Double-check SMTP host: `smtp.resend.com`
2. Verify port is `587` (try `465` if needed)
3. Check API key is correct (starts with `re_`)
4. Verify username is exactly `resend`
5. Check Resend account is active

### Problem: Emails Going to Spam

**Solutions:**
1. Verify your domain (don't use test domain in production)
2. Set up SPF, DKIM, and DMARC records
3. Warm up your domain (send gradually)
4. Use a professional sender name
5. Avoid spam trigger words in subject/body

### Problem: "Invalid Redirect URL"

**Solutions:**
1. Add your URL to Supabase redirect URLs
2. Include both `https://` and `http://localhost:3000` versions
3. Use wildcard `/**` for all paths
4. Save and wait a few seconds

## Quick Reference: Resend SMTP Settings

Save these for quick reference:

```
SMTP Host: smtp.resend.com
SMTP Port: 587 (or 465)
SMTP User: resend
SMTP Password: [Your Resend API Key - starts with re_]
Sender Email: noreply@yourdomain.com (or onboarding@resend.dev for testing)
Sender Name: Swatchly.io
```

## Next Steps

After setup is complete:

1. ✅ Test sign-up flow end-to-end
2. ✅ Test password reset flow
3. ✅ Monitor email delivery rates
4. ✅ Set up domain verification (if not done)
5. ✅ Customize all email templates
6. ✅ Set up email analytics tracking

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend SMTP Guide](https://resend.com/docs/send-with-smtp)
- [Supabase Auth Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Resend Domain Verification](https://resend.com/docs/dashboard/domains/introduction)

---

**Need Help?** If you run into any issues, check:
1. Resend dashboard for email status
2. Supabase logs for errors
3. Your email spam folder
4. DNS records (if using custom domain)
