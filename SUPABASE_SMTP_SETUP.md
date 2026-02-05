# Supabase SMTP Email Setup

This guide will help you configure custom SMTP email authentication in Supabase, so you can use your own email service instead of Supabase's default emails.

## Why Use Custom SMTP?

- **Branding**: Send emails from your own domain
- **Deliverability**: Better email deliverability with your own service
- **Control**: More control over email templates and sending
- **Analytics**: Track email opens, clicks, and bounces

## Supported SMTP Providers

Supabase supports any SMTP provider. Popular options:

- **SendGrid** (Recommended - Easy setup, good free tier)
- **Mailgun** (Great for developers)
- **AWS SES** (Cost-effective, reliable)
- **Postmark** (Great deliverability)
- **Resend** (Modern, developer-friendly)
- **Gmail/Google Workspace** (For personal/testing)
- **Custom SMTP Server**

## Step 1: Choose Your Email Provider

### Option A: SendGrid (Recommended for Beginners)

1. Sign up at [https://sendgrid.com](https://sendgrid.com)
2. Verify your account
3. Go to **Settings** → **API Keys**
4. Create a new API key with "Mail Send" permissions
5. Go to **Settings** → **Sender Authentication**
6. Verify your domain or use single sender verification

**SMTP Settings:**
- **Host**: `smtp.sendgrid.net`
- **Port**: `587` (TLS) or `465` (SSL)
- **Username**: `apikey`
- **Password**: Your SendGrid API key
- **From Email**: Your verified sender email

### Option B: Resend (Modern & Developer-Friendly)

1. Sign up at [https://resend.com](https://resend.com)
2. Verify your domain
3. Go to **API Keys** → Create new key
4. Get your SMTP credentials

**SMTP Settings:**
- **Host**: `smtp.resend.com`
- **Port**: `587` or `465`
- **Username**: `resend`
- **Password**: Your Resend API key
- **From Email**: Your verified domain email

### Option C: AWS SES (Cost-Effective)

1. Sign up for AWS account
2. Go to AWS SES console
3. Verify your email/domain
4. Move out of sandbox (request production access)
5. Create SMTP credentials

**SMTP Settings:**
- **Host**: `email-smtp.[region].amazonaws.com` (e.g., `email-smtp.us-east-1.amazonaws.com`)
- **Port**: `587` (TLS) or `465` (SSL)
- **Username**: Your SMTP username
- **Password**: Your SMTP password
- **From Email**: Your verified email

### Option D: Mailgun

1. Sign up at [https://mailgun.com](https://mailgun.com)
2. Verify your domain
3. Go to **Sending** → **Domain Settings**
4. Get SMTP credentials

**SMTP Settings:**
- **Host**: `smtp.mailgun.org`
- **Port**: `587` or `465`
- **Username**: Your Mailgun SMTP username
- **Password**: Your Mailgun SMTP password
- **From Email**: Your verified domain email

## Step 2: Configure SMTP in Supabase

1. **Go to Supabase Dashboard**
   - Navigate to your project: https://app.supabase.com
   - Select your project

2. **Go to Authentication Settings**
   - Click **Authentication** in the left sidebar
   - Click **Settings** (or **Configuration**)
   - Scroll to **SMTP Settings** section

3. **Enable Custom SMTP**
   - Toggle **"Enable Custom SMTP"** to ON

4. **Enter SMTP Credentials**
   ```
   SMTP Host: [Your SMTP host]
   SMTP Port: 587 (or 465 for SSL)
   SMTP User: [Your SMTP username]
   SMTP Password: [Your SMTP password]
   Sender Email: [Your verified sender email]
   Sender Name: Swatchly.io (or your app name)
   ```

5. **Test Connection**
   - Click **"Test SMTP Connection"**
   - Check your email for a test message
   - If successful, you're good to go!

## Step 3: Customize Email Templates (Optional)

Supabase allows you to customize email templates:

1. **Go to Authentication** → **Email Templates**
2. **Customize Templates**:
   - **Confirm signup** - Email verification
   - **Magic Link** - Passwordless login
   - **Change Email Address** - Email change confirmation
   - **Reset Password** - Password reset
   - **Invite user** - Team invitations

3. **Template Variables Available**:
   ```
   {{ .ConfirmationURL }} - Email confirmation link
   {{ .Token }} - Verification token
   {{ .TokenHash }} - Hashed token
   {{ .SiteURL }} - Your app URL
   {{ .Email }} - User's email
   {{ .RedirectTo }} - Redirect URL after confirmation
   ```

### Example Custom Template

**Subject**: Welcome to Swatchly.io - Verify Your Email

**Body**:
```html
<h2>Welcome to Swatchly.io!</h2>
<p>Thanks for signing up. Please verify your email address by clicking the link below:</p>
<p><a href="{{ .ConfirmationURL }}">Verify Email Address</a></p>
<p>Or copy and paste this URL into your browser:</p>
<p>{{ .ConfirmationURL }}</p>
<p>This link will expire in 24 hours.</p>
<p>If you didn't create an account, you can safely ignore this email.</p>
```

## Step 4: Update Site URL and Redirect URLs

After setting up SMTP, make sure your URLs are configured:

1. **Go to Authentication** → **URL Configuration**
2. **Site URL**: Your production URL (e.g., `https://swatchly-io.vercel.app`)
3. **Redirect URLs**: Add your allowed redirect URLs:
   ```
   https://swatchly-io.vercel.app/**
   https://swatchly-io.vercel.app/auth/callback
   http://localhost:3000/** (for development)
   ```

## Step 5: Test Email Flow

1. **Test Sign-Up Email**:
   - Go to your app's sign-up page
   - Create a new account
   - Check your email for verification message
   - Verify it's coming from your custom domain

2. **Test Password Reset**:
   - Go to login page
   - Click "Forgot password"
   - Check email for reset link

## Troubleshooting

### Emails Not Sending

1. **Check SMTP Credentials**: Verify all credentials are correct
2. **Test SMTP Connection**: Use Supabase's test feature
3. **Check Spam Folder**: Emails might be going to spam
4. **Verify Sender Email**: Make sure sender email is verified with your provider
5. **Check Provider Limits**: Some providers have rate limits

### Emails Going to Spam

1. **Set up SPF Record**: Add SPF record to your domain DNS
2. **Set up DKIM**: Configure DKIM signing with your provider
3. **Set up DMARC**: Add DMARC policy
4. **Warm Up Domain**: Gradually increase email volume

### Common SMTP Errors

- **"Authentication failed"**: Check username/password
- **"Connection timeout"**: Check port and firewall settings
- **"TLS/SSL error"**: Try different port (587 vs 465)

## Recommended Settings by Provider

### SendGrid
- Port: `587` (TLS)
- Security: STARTTLS
- Rate Limit: 100 emails/day (free), unlimited (paid)

### Resend
- Port: `587` (TLS) or `465` (SSL)
- Security: STARTTLS or SSL
- Rate Limit: 3,000 emails/month (free), more (paid)

### AWS SES
- Port: `587` (TLS) or `465` (SSL)
- Security: STARTTLS or SSL
- Rate Limit: 200 emails/day (sandbox), request increase for production

### Mailgun
- Port: `587` (TLS) or `465` (SSL)
- Security: STARTTLS or SSL
- Rate Limit: 5,000 emails/month (free), more (paid)

## Security Best Practices

1. **Use Environment Variables**: Never hardcode SMTP credentials
2. **Rotate Keys Regularly**: Change SMTP passwords periodically
3. **Use App Passwords**: For Gmail/Google Workspace, use app-specific passwords
4. **Enable 2FA**: On your email provider account
5. **Monitor Logs**: Check Supabase logs for failed email attempts

## Next Steps

After setting up SMTP:
1. ✅ Test sign-up flow
2. ✅ Test password reset
3. ✅ Customize email templates
4. ✅ Monitor email delivery rates
5. ✅ Set up email analytics (if available)

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Resend Documentation](https://resend.com/docs)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
