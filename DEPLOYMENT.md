# Deployment Guide: RBG Data on GitHub Pages

This guide walks you through deploying your RBG Data website to GitHub Pages with your custom domain (rbgdata.com).

## Prerequisites

- GitHub account
- Domain already registered (rbgdata.com)
- Repository already set up (this one!)

## Step 1: Configure Your GitHub Repository

### 1.1 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. In the left sidebar, click **Pages**
4. Under "Source", select **GitHub Actions**
5. Click **Save**

### 1.2 Verify the Deploy Workflow

1. Check that `.github/workflows/deploy.yml` exists in your repository
2. The workflow will automatically run when you push to `main` branch
3. Check the **Actions** tab to monitor deployment progress

## Step 2: Configure Your Custom Domain

You have two options:

### Option A: Using CNAME Record (Recommended)

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add a **CNAME record**:
   - **Name/Host**: `@` or leave blank (for root domain)
   - **Type**: CNAME
   - **Value**: `username.github.io` (replace `username` with your GitHub username)
   - **TTL**: 3600 or default

4. Go back to GitHub Pages settings
5. Under "Custom domain", enter `rbgdata.com`
6. Check **Enforce HTTPS**
7. Save

GitHub will automatically create a CNAME file in your repository.

### Option B: Using A Records

If CNAME is not available at your registrar:

1. Add **A records** pointing to GitHub's IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. Add a **AAAA record** (IPv6):
   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```

3. Follow the same GitHub Pages setup as Option A

## Step 3: First Deployment

### 3.1 Commit and Push to Main

```bash
# Make sure all files are staged
git add .

# Create initial commit
git commit -m "Initial RBG Data website commit"

# Push to GitHub (this triggers the deploy workflow)
git push origin main
```

### 3.2 Monitor the Deployment

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Watch the "Deploy to GitHub Pages" workflow
4. It should take 2-5 minutes to complete
5. You'll see a green checkmark when complete

## Step 4: Verify Your Deployment

### 4.1 Check GitHub Pages Status

1. Go to **Settings** → **Pages**
2. You should see a message: "Your site is published at https://rbgdata.com"
3. Look for the CNAME record showing your domain

### 4.2 Test Your Site

1. Visit `https://rbgdata.com` in your browser
2. Check all pages load correctly:
   - Home
   - Blog
   - Individual blog posts
   - Portfolio
   - About
3. Test responsive design on mobile
4. Check that links work

### 4.3 Enable HTTPS (if not automatic)

1. In GitHub Pages settings
2. Check **Enforce HTTPS** (wait up to 24 hours for SSL certificate)

## Step 5: DNS Propagation

DNS changes can take 24-48 hours to fully propagate globally.

Check propagation:
- [What's My DNS](https://www.whatsmydns.net/)
- Enter your domain: `rbgdata.com`
- Should show your GitHub Pages IP or CNAME

## Common Issues

### Site doesn't load

- **Check DNS**: Wait 24 hours and verify with whatsmydns.net
- **Check build**: Look at Actions tab for build errors
- **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Build fails in GitHub Actions

1. Click on the failed workflow in the **Actions** tab
2. Look for error messages
3. Common causes:
   - Missing dependencies: `npm ci` should install everything
   - Node version: Check node version in workflow file
   - Build script error: Check `npm run build` runs locally first

### SSL certificate not issued

- Wait 24 hours
- Ensure HTTPS is enforced in GitHub Pages settings
- Check that custom domain is correctly configured

### Site shows old content

- Clear browser cache
- Verify latest changes were pushed to `main`
- Check that deployment workflow completed successfully

## Making Updates

### Updating Content

1. Edit files locally
2. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "Update blog post"
   git push origin main
   ```
3. GitHub Actions automatically rebuilds and deploys (2-5 minutes)

### Adding Blog Posts

1. Create a new `.md` file in `posts/` directory
2. Include front matter with title, date, excerpt
3. Commit and push
4. Site rebuilds automatically
5. New post appears in blog listing within minutes

### Updating Design

1. Modify `globals.css` for global styles
2. Update `tailwind.config.js` for theme changes
3. Modify component files in `components/` directory
4. Commit, push, and automatic deployment begins

## Monitoring Performance

### Check Build Performance

1. Go to **Actions** tab
2. Click on latest deployment
3. View build duration and any warnings

### SEO and Search Indexing

- Allow 1-2 weeks for search engines to index your site
- Submit sitemap to Google Search Console
- Monitor search performance in Google Analytics (if configured)

## Going Forward

### Regular Maintenance

- Update blog posts regularly
- Keep dependencies current (quarterly `npm update`)
- Monitor build logs for any issues
- Test site after major updates

### Backups

GitHub automatically maintains version history. To backup:

```bash
# Clone the repository as backup
git clone https://github.com/username/rbgdata.git rbgdata-backup
```

### Custom Domain Renewal

Remember to renew your `rbgdata.com` domain before it expires. Set a calendar reminder!

## Next Steps

1. ✓ Deploy the site
2. ✓ Verify everything works
3. Add more blog posts
4. Migrate content from WordPress
5. Monitor analytics
6. Iterate based on user feedback

## Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment/static-exports)
- [Troubleshoot GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites)

## Questions?

Refer to the main README.md for project structure and local development instructions.

---

Happy deploying! Your site should now be live at https://rbgdata.com 🎉
