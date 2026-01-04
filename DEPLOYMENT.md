# Vercel Deployment Guide

Your IT Help Desk is now ready for Vercel deployment! 🚀

## Files Added

1. **vercel.json** - Vercel configuration for SPA routing
2. **.env.example** - Template for environment variables
3. Updated **vite.config.ts** - Optimized build configuration
4. Updated **README.md** - Deployment instructions

## Quick Deploy Steps

### Option 1: One-Click Deploy (Fastest)

1. Go to your GitHub repo: https://github.com/Iamjunade/ithelpdesk
2. Click the "Deploy to Vercel" button in the README
3. Connect your GitHub account to Vercel
4. Add environment variables (see below)
5. Click Deploy!

### Option 2: Manual Deploy

1. Visit [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Select `Iamjunade/ithelpdesk` repository
4. Vercel will auto-detect Vite configuration
5. Add environment variables
6. Deploy!

## Required Environment Variables

Add these in Vercel dashboard under "Settings" → "Environment Variables":

```
GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: Make sure to add them for all environments (Production, Preview, Development)

## Build Settings (Auto-Detected)

Vercel will automatically use:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## After Deployment

### Automatic Updates
- Every push to `main` → Production deployment
- Every PR → Preview deployment with unique URL

### Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed

### Monitor Deployments
- Check deployment logs in Vercel dashboard
- View build times and bundle size
- Monitor performance with Vercel Analytics (optional)

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Ensure Node.js version compatibility (Vercel uses Node 18 by default)
- Review build logs in Vercel dashboard

### Runtime Errors
- Verify Supabase credentials are correct
- Check browser console for API errors
- Ensure CORS settings in Supabase allow your Vercel domain

### Blank Page
- Check that routing is working (vercel.json handles this)
- Verify assets are loading correctly
- Check console for JavaScript errors

## Testing Before Deploy

Run these commands locally to verify everything works:

```bash
# Install dependencies
npm install

# Test build
npm run build

# Preview production build
npm run preview
```

## Next Steps

1. Deploy to Vercel
2. Test the production app
3. Configure custom domain (optional)
4. Set up Supabase project for production
5. Enable Vercel Analytics for monitoring

---

Need help? Check [Vercel's documentation](https://vercel.com/docs) or open an issue on GitHub.
