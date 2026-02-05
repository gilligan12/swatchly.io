# Complete Domain Verification Guide for Resend

This guide covers how to verify your domain for Resend email sending, including specific instructions for Vercel and other common platforms.

**⚠️ Important:** If you don't have a domain added to Vercel yet, see `VERCEL_DOMAIN_SETUP.md` first to add your domain.

## Why Verify Your Domain?

- ✅ Professional email addresses (`noreply@swatchly.io` instead of `onboarding@resend.dev`)
- ✅ Better email deliverability (less likely to go to spam)
- ✅ Builds domain reputation over time
- ✅ Required for production use

## Quick Overview

To verify your domain, you need to add **3 DNS records** (TXT records):
1. **SPF Record** - Verifies you're authorized to send emails
2. **DKIM Record** - Cryptographically signs your emails
3. **DMARC Record** - Optional but recommended for security

## Step-by-Step: Vercel Domain Verification

### Prerequisites

- Domain added to Vercel project
- Access to Vercel dashboard
- Resend account created

### Part 1: Get DNS Records from Resend

1. **Go to Resend Dashboard**
   - Visit: https://resend.com/domains
   - Click **"Add Domain"**
   - Enter your domain: `swatchly.io` (or your domain)
   - Click **"Add Domain"**

2. **Copy DNS Records**
   - Resend will show you 3 DNS records to add
   - **SPF Record**: Usually looks like:
     ```
     v=spf1 include:resend.com ~all
     ```
   - **DKIM Record**: Long string starting with:
     ```
     v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
     ```
     - Note the **Name/Selector** (e.g., `resend._domainkey`)
   - **DMARC Record**: (You can create this yourself)
     ```
     v=DMARC1; p=none; rua=mailto:dmarc@swatchly.io
     ```

3. **Keep Resend Open**
   - You'll need to come back to verify after adding records

### Part 2: Add DNS Records in Vercel

1. **Open Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Select your **swatchly.io** project

2. **Navigate to Domain Settings**
   - Click on your project
   - Go to **Settings** tab (top navigation)
   - Click **"Domains"** in the left sidebar
   - You should see your domain listed

3. **View DNS Configuration**
   - Click on your domain name (e.g., `swatchly.io`)
   - You'll see DNS records for your domain
   - Look for a section showing existing DNS records

4. **Add SPF Record**
   - Click **"Add Record"** or **"Add DNS Record"** button
   - **Record Type**: Select **TXT**
   - **Name**: 
     - Leave blank, OR
     - Enter `@` (represents root domain)
     - For subdomain, enter the subdomain name
   - **Value**: Paste the SPF record from Resend
     ```
     v=spf1 include:resend.com ~all
     ```
   - **TTL**: Leave as default (usually 3600 seconds)
   - Click **"Save"** or **"Add Record"**

5. **Add DKIM Record**
   - Click **"Add Record"** again
   - **Record Type**: Select **TXT**
   - **Name**: Enter the DKIM selector from Resend
     - Example: `resend._domainkey`
     - Resend will show you the exact name (it's usually something like `resend._domainkey` or `default._domainkey`)
     - **Important**: Copy the name exactly as Resend shows it
   - **Value**: Paste the entire DKIM record from Resend
     - This is a long string starting with `v=DKIM1; k=rsa; p=...`
     - Copy the entire value, it's usually 200+ characters
   - **TTL**: Leave as default
   - Click **"Save"**

6. **Add DMARC Record (Recommended)**
   - Click **"Add Record"** again
   - **Record Type**: Select **TXT**
   - **Name**: Enter `_dmarc`
   - **Value**: 
     ```
     v=DMARC1; p=none; rua=mailto:dmarc@swatchly.io
     ```
     - Replace `dmarc@swatchly.io` with an email where you want DMARC reports
     - You can use `admin@swatchly.io` or create a dedicated email
   - **TTL**: Leave as default
   - Click **"Save"**

### Part 3: Wait for DNS Propagation

1. **DNS Propagation Time**
   - DNS changes take time to propagate globally
   - Usually takes **10-30 minutes**
   - Can take up to 48 hours in rare cases

2. **Check DNS Propagation** (Optional)
   - Visit: https://dnschecker.org
   - Enter your domain: `swatchly.io`
   - Select **TXT** record type
   - Click **"Search"**
   - You'll see a world map showing where your DNS records have propagated
   - Wait until most locations show your records

3. **Verify Specific Records**
   - You can check each record individually:
     - Search for `@` or blank name for SPF
     - Search for `resend._domainkey` (or your DKIM selector) for DKIM
     - Search for `_dmarc` for DMARC

### Part 4: Verify Domain in Resend

1. **Go Back to Resend**
   - Visit: https://resend.com/domains
   - Find your domain in the list
   - You should see status: **"Pending Verification"**

2. **Click Verify**
   - Click the **"Verify"** button next to your domain
   - Resend will check all DNS records

3. **Check Status**
   - ✅ **"Verified"** - Success! Your domain is ready to use
   - ⏳ **"Pending"** - DNS still propagating, wait 10-15 minutes and try again
   - ❌ **"Failed"** - Check the error message and verify your DNS records

4. **If Verification Fails**
   - Double-check record names match exactly (case-sensitive)
   - Verify record values are complete (especially DKIM - it's very long)
   - Ensure you added TXT records, not other types
   - Wait a bit longer (sometimes DNS takes time)
   - Check for typos in domain name

### Part 5: Set Up Sender Email

1. **Add From Address**
   - In Resend, go to **"Emails"** → **"From Addresses"**
   - Click **"Add From Address"**
   - Enter your email: `noreply@swatchly.io` (or `hello@swatchly.io`)
   - Click **"Add"**

2. **Verify Sender Email** (if required)
   - Resend may send a verification email
   - Check your email and click the verification link
   - Once verified, you can use this email as the sender

## Alternative: Using a Subdomain

If you prefer to use a subdomain (e.g., `mail.swatchly.io`):

1. **In Resend**: Add `mail.swatchly.io` as the domain
2. **In Vercel DNS**: 
   - SPF: Name = `mail` (or leave blank)
   - DKIM: Name = `resend._domainkey.mail` (Resend will show exact name)
   - DMARC: Name = `_dmarc.mail`
3. **Verify**: Same process as above

## Troubleshooting

### "DNS Record Not Found" Error

**Solutions:**
1. Wait longer (DNS can take 30+ minutes)
2. Check record name is correct (case-sensitive)
3. Verify you're checking the right domain
4. Use dnschecker.org to see global propagation

### "Invalid DKIM Record" Error

**Solutions:**
1. Make sure you copied the entire DKIM value (it's very long)
2. Check the name/selector matches exactly
3. Verify no extra spaces or line breaks
4. Ensure it's a TXT record, not CNAME

### "SPF Record Invalid" Error

**Solutions:**
1. Verify the value starts with `v=spf1`
2. Check for typos in `include:resend.com`
3. Make sure it ends with `~all` or `-all`
4. If you have existing SPF records, you may need to combine them

### Verification Stuck on "Pending"

**Solutions:**
1. Wait 30-60 minutes
2. Check DNS propagation at dnschecker.org
3. Try verifying again
4. Contact Resend support if it's been 24+ hours

## Quick Reference: DNS Records Summary

For domain `swatchly.io`, you need:

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| TXT | `@` (or blank) | `v=spf1 include:resend.com ~all` | SPF - Authorizes Resend to send |
| TXT | `resend._domainkey` | `v=DKIM1; k=rsa; p=...` (long string) | DKIM - Signs emails |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@swatchly.io` | DMARC - Security policy |

## After Verification

Once your domain is verified:

1. ✅ You can use `noreply@swatchly.io` as sender email
2. ✅ Update Supabase SMTP settings with your verified domain email
3. ✅ Start sending emails from your domain
4. ✅ Monitor email delivery in Resend dashboard

## Next Steps

After domain verification:
1. Update Supabase SMTP sender email to use your verified domain
2. Test sending emails
3. Monitor email deliverability
4. Set up email analytics (optional)

---

**Need Help?**
- Resend Support: https://resend.com/support
- Vercel DNS Docs: https://vercel.com/docs/concepts/projects/domains
- DNS Checker: https://dnschecker.org
