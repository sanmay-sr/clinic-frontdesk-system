# Vercel Deployment Guide

This guide will help you deploy the Clinic Front Desk System frontend to Vercel.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Backend URL**: Your backend should be deployed (Railway recommended)

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository: `clinic-frontdesk-system`

### 2. Configure Project Settings

1. **Framework Preset**: Next.js (should be auto-detected)
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)
5. **Install Command**: `npm install` (default)

### 3. Environment Variables

Add the following environment variable:

| Name | Value | Description |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.railway.app` | Your backend API URL |

**Important**: Replace `your-backend-url.railway.app` with your actual backend URL.

### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your application will be live at the provided URL

## Post-Deployment

### 1. Verify Deployment

1. Visit your Vercel URL
2. Test the login functionality
3. Verify all features work correctly

### 2. Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS settings

### 3. Environment Variables Updates

If you need to update environment variables:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add or update variables
4. Redeploy the application

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check if all dependencies are in `package.json`
   - Verify TypeScript compilation
   - Check for missing environment variables

2. **API Connection Issues**:
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Ensure backend is running and accessible
   - Check CORS configuration on backend

3. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Redeploy after adding variables

### Support

If you encounter issues:

1. Check Vercel build logs
2. Review the [Vercel Documentation](https://vercel.com/docs)
3. Create an issue in the GitHub repository

## Next Steps

After successful deployment:

1. **Backend Deployment**: Deploy your backend to Railway or similar service
2. **Database Setup**: Configure your production database
3. **Monitoring**: Set up monitoring and logging
4. **SSL**: Ensure HTTPS is enabled (automatic with Vercel)

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Project Repository](https://github.com/your-username/clinic-frontdesk-system)
