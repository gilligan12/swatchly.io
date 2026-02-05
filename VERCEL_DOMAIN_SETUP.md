# Adding a Domain to Vercel

This guide explains how to add your domain to Vercel, which you'll need before you can verify it with Resend for email sending.

## Option 1: You Already Own a Domain

If you already own a domain (e.g., `swatchly.io`), follow these steps to add it to Vercel.

### Step 1: Add Domain to Vercel Project

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your **swatchly.io** project (or create it if you haven't)

2. **Navigate to Domain Settings**
   - Click on your project
   - Go to **Settings** tab (top navigation)
   - Click **"Domains"** in the left sidebar

3. **Add Your Domain**
   - Click **"Add Domain"** or **"Add"** button
   - Enter your domain: `swatchly.io` (or your domain)
   - Click **"Add"**

4. **Choose Domain Configuration**
   - Vercel will ask how you want to configure the domain
   - Select **"Add to Project"** (if you want it for this specific project)
   - Or **"Add to Team"** (if you want to use it across multiple projects)

### Step 2: Configure DNS Records

Vercel needs you to add DNS records to point your domain to Vercel's servers.

1. **Get DNS Records from Vercel**
   - After adding the domain, Vercel will show you DNS records to add
   - You'll typically see:
     - **A Record** pointing to Vercel's IP
     - **CNAME Record** pointing to Vercel
     - Or **Nameservers** to use

2. **Choose Configuration Method**

   **Method A: Using Nameservers (Easiest)**
   - Vercel will provide nameservers (e.g., `ns1.vercel-dns.com`)
   - Go to your domain registrar (where you bought the domain)
   - Update nameservers to Vercel's nameservers
   - This gives Vercel full control of DNS

   **Method B: Using DNS Records (More Control)**
   - Keep your current nameservers
   - Add the DNS records Vercel provides to your current DNS provider
   - This allows you to manage DNS yourself

3. **Add DNS Records to Your Registrar**

   **If using Nameservers:**
   - Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
   - Find **"Nameservers"** or **"DNS Settings"**
   - Replace existing nameservers with Vercel's nameservers
   - Save changes

   **If using DNS Records:**
   - Go to your domain registrar's DNS management
   - Add the A record or CNAME record Vercel provided
   - Save changes

4. **Wait for DNS Propagation**
   - DNS changes take 10 minutes to 48 hours
   - Usually takes 10-30 minutes
   - Vercel will show status: "Pending" → "Valid"

5. **Verify Domain in Vercel**
   - Go back to Vercel dashboard
   - Check domain status
   - When it shows **"Valid"** ✅, your domain is connected

### Step 3: Now You Can Verify with Resend

Once your domain is added to Vercel and DNS is configured:

1. Follow the `DOMAIN_VERIFICATION_GUIDE.md` to add Resend DNS records
2. You can add the Resend DNS records (SPF, DKIM, DMARC) in Vercel's DNS settings
3. Verify the domain in Resend

## Option 2: You Don't Have a Domain Yet

If you don't own a domain yet, you have a few options:

### Option 2a: Buy a Domain

**Recommended Domain Registrars:**
- **Namecheap** - Good prices, easy to use
- **Google Domains** - Simple interface (now part of Squarespace)
- **Cloudflare** - At-cost pricing, no markup
- **GoDaddy** - Popular but can be expensive
- **Vercel** - You can buy domains directly through Vercel!

**Buying Through Vercel:**
1. Go to Vercel Dashboard → **Domains**
2. Click **"Buy Domain"**
3. Search for your desired domain
4. Complete purchase
5. Domain is automatically configured!

**Buying Elsewhere:**
1. Purchase domain from any registrar
2. Follow **Option 1** above to add it to Vercel

### Option 2b: Use Resend Test Domain (Temporary)

If you want to test email functionality before buying a domain:

1. **Use Resend's Test Domain**
   - In Resend, you can use `onboarding@resend.dev` for testing
   - No domain verification needed
   - Good for development/testing

2. **Limitations:**
   - Emails show as coming from Resend, not your domain
   - Not suitable for production
   - Limited to testing

3. **Set Up Later:**
   - Buy domain when ready
   - Add to Vercel
   - Verify with Resend
   - Update Supabase SMTP settings

## Option 3: Verify Domain Through Your Registrar (Not Vercel)

If you own a domain but don't want to add it to Vercel yet, you can verify it with Resend directly through your domain registrar:

1. **Add Domain in Resend**
   - Get DNS records from Resend (SPF, DKIM, DMARC)

2. **Add DNS Records at Your Registrar**
   - Go to your domain registrar's DNS management
   - Add the TXT records Resend provides
   - No need to add domain to Vercel for email verification

3. **Verify in Resend**
   - Wait for DNS propagation
   - Verify domain in Resend

**Note:** This works for email, but you'll still need to add the domain to Vercel if you want to host your website on it.

## Step-by-Step: Buying Domain Through Vercel

If you want to buy a domain directly through Vercel:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click **"Domains"** in left sidebar (or go to project → Settings → Domains)

2. **Buy Domain**
   - Click **"Buy Domain"** button
   - Search for your desired domain (e.g., `swatchly.io`)
   - Vercel will show available options and prices

3. **Complete Purchase**
   - Select domain
   - Choose registration period (1 year, 2 years, etc.)
   - Enter contact information
   - Complete payment

4. **Automatic Configuration**
   - Vercel automatically configures DNS
   - Domain is ready to use immediately
   - No manual DNS setup needed!

5. **Add to Project**
   - Domain is automatically available
   - You can assign it to your project
   - Or use it for email verification with Resend

## Quick Decision Guide

**I own a domain:**
- ✅ Add to Vercel (Option 1)
- ✅ Or verify through registrar (Option 3)

**I don't own a domain:**
- ✅ Buy through Vercel (easiest)
- ✅ Buy from registrar, then add to Vercel
- ✅ Use Resend test domain temporarily (Option 2b)

**I want to test email first:**
- ✅ Use Resend test domain (`onboarding@resend.dev`)
- ✅ Set up real domain later

## After Adding Domain to Vercel

Once your domain is added and configured in Vercel:

1. ✅ Your website will be accessible at your domain
2. ✅ You can add Resend DNS records in Vercel
3. ✅ Follow `DOMAIN_VERIFICATION_GUIDE.md` to verify with Resend
4. ✅ Use `noreply@yourdomain.com` for email sending

## Troubleshooting

### "Domain Already in Use" Error

**Solution:**
- Domain might be added to another Vercel project
- Check other projects in your account
- Remove from other project first, or use a different domain

### DNS Not Propagating

**Solutions:**
1. Wait longer (can take up to 48 hours)
2. Check DNS records are correct
3. Verify nameservers are updated (if using that method)
4. Use DNS checker: https://dnschecker.org

### Can't Access Domain Settings

**Solutions:**
1. Make sure you're project owner/admin
2. Check you're on the right Vercel account
3. Contact Vercel support if needed

## Next Steps

After adding your domain to Vercel:

1. ✅ Wait for DNS to propagate
2. ✅ Verify domain shows as "Valid" in Vercel
3. ✅ Follow `DOMAIN_VERIFICATION_GUIDE.md` to set up Resend
4. ✅ Add Resend DNS records in Vercel
5. ✅ Verify domain in Resend
6. ✅ Update Supabase SMTP with your domain email

---

**Need Help?**
- Vercel Domain Docs: https://vercel.com/docs/concepts/projects/domains
- Vercel Support: https://vercel.com/support
