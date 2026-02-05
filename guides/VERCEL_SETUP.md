# Vercel Deployment Setup

## Prerequisites
- ✅ GitHub repository set up: https://github.com/gilligan12/swatchly.io
- ✅ Code pushed to GitHub

## Step 1: Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up or log in (use GitHub to connect)
3. Click **"Add New Project"** or **"Import Project"**
4. Select your GitHub repository: `gilligan12/swatchly.io`
5. Click **"Import"**

## Step 2: Configure Project Settings

Vercel will auto-detect Next.js. Configure:

### Framework Preset
- **Framework Preset**: Next.js (auto-detected)

### Build Settings
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Environment Variables

Add these environment variables in Vercel:

1. Click **"Environment Variables"** section
2. Add each variable:

```
NEXT_PUBLIC_SUPABASE_URL
```
Value: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Value: Your Supabase anon key

```
SUPABASE_SERVICE_ROLE_KEY
```
Value: Your Supabase service role key (mark as sensitive)

```
NEXT_PUBLIC_APP_URL
```
Value: Your Vercel deployment URL (will be something like `https://swatchly-io.vercel.app`)

**Important**: 
- Add these to **Production**, **Preview**, and **Development** environments
- Mark `SUPABASE_SERVICE_ROLE_KEY` as sensitive
- You can update `NEXT_PUBLIC_APP_URL` after first deployment

## Step 3: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. Your app will be live at: `https://swatchly-io.vercel.app` (or similar)

## Step 4: Update Supabase Settings

After deployment, update your Supabase project:

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Site URL**: `https://your-app.vercel.app`
3. Add to **Redirect URLs**: 
   - `https://your-app.vercel.app/**`
   - `https://your-app.vercel.app/auth/callback`

## Step 5: Update Environment Variables (if needed)

If your Vercel URL changed, update `NEXT_PUBLIC_APP_URL` in Vercel environment variables.

## Automatic Deployments

Vercel will automatically deploy:
- **Production**: When you push to `main` branch
- **Preview**: When you push to other branches or create pull requests

## Custom Domain (Optional)

1. Go to your project in Vercel
2. Settings → **Domains**
3. Add your custom domain (e.g., `swatchly.io`)
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` has correct scripts

### Authentication Not Working
- Check Supabase redirect URLs are configured
- Verify environment variables are correct
- Check browser console for errors

### Database Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check Supabase project is active
- Ensure RLS policies are set up correctly

## Next Steps

After deployment:
1. Test sign-up and login flows
2. Verify dashboard loads correctly
3. Check that Supabase connections work
4. Monitor Vercel analytics and logs
