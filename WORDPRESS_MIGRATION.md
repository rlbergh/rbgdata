# WordPress Content Migration Guide

This guide helps you migrate your existing WordPress content (rbgdata.wordpress.com) to your new Next.js site.

## Step 1: Export Content from WordPress

### 1.1 Export Blog Posts

1. Log in to WordPress
2. Go to **Tools** → **Export**
3. Select **Posts**
4. Click **Download Export File**
5. Save as `wordpress-export.xml`

### 1.2 Download Images

There are two approaches:

#### Option A: Manual Download
1. Visit each blog post
2. Right-click and save images
3. Place in `public/images/blog/` folder
4. Update image paths in markdown

#### Option B: Automated Download
Use a tool like [MediaRssReader](https://www.media-rss.com/) or write a script to batch download images from the export file.

## Step 2: Convert WordPress Posts to Markdown

### 2.1 Parse the XML Export

You can use online tools or write a script:

**Online tool**: [Vertopal](https://www.vertopal.com/en/) can convert XML to other formats

**Or manually:**
1. Open the XML file
2. Extract each post's content
3. Convert HTML to markdown using [Turndown.js](https://joplin.cozic.net/markdown_guide/) online converter

### 2.2 Create Markdown Files

For each WordPress post:

1. Create a new file in `posts/` directory
2. Name it: `YYYY-MM-DD-slug.md` (use post date and URL slug)
3. Add front matter:

```markdown
---
title: "Your Post Title"
date: "2021-05-31"
excerpt: "Brief excerpt from the post (150 characters max)"
author: "Rebecca Gourley"
tags: ["Tag1", "Tag2"]
---

# Your post content here

Converted from Markdown...
```

### 2.3 Update Image References

If images are in your post content:

WordPress:
```html
<img src="https://rbgdata.wordpress.com/wp-content/uploads/2021/05/image.png" />
```

Update to:
```markdown
![Image description](/images/blog/image.png)
```

Then place the image in `public/images/blog/`

## Step 3: Content Mapping

Map your WordPress content structure to the new site:

| WordPress | New Site | Notes |
|-----------|----------|-------|
| /post/title-slug | /blog/title-slug | Posts automatically handled |
| Homepage | / | Review and update |
| Media files | /public/images/ | Copy and organize |
| Categories | /tags/ | Implemented via markdown front matter |
| Archives | /blog | Blog listing shows all |

## Step 4: Set Up Redirects (SEO)

To maintain SEO and not lose traffic, set up redirects from old URLs to new ones.

### 4.1 Create Redirect File

In `public/_redirects` (for GitHub Pages compatibility):

```
# Old WordPress URLs → New site URLs
/2021/05/31/post-title/  /blog/post-title  301
/2021/08/17/another-post/  /blog/another-post  301
```

Note: GitHub Pages doesn't natively support redirect files. Instead, use meta redirects in individual post files or consider using a redirect service.

### 4.2 Alternative: Meta Redirects

Add to `app/layout.tsx` for site-wide redirects:

```tsx
// Check for old WordPress URLs and redirect
if (pathname.includes('/year/month/')) {
  // Extract slug and redirect
  redirect(`/blog/${slug}`);
}
```

### 4.3 Best Practice: Leave WordPress Running

Keep rbgdata.wordpress.com running for 6 months with:
- A notice: "We've moved! Visit https://rbgdata.com"
- Automatic redirects to new site
- Google Search Console configuration to update URLs

## Step 5: Update Links and References

### 5.1 Check Internal Links

Find all posts that link to other posts:

```markdown
[Read my post about accessibility](/2021/05/31/accessibility-tableau/)
```

Update to:
```markdown
[Read my post about accessibility](/blog/accessibility-tableau/)
```

### 5.2 Update External Links

If external links are broken, update them to working versions.

### 5.3 Test All Links

After migration:
1. Go through each blog post
2. Click every link
3. Verify they work
4. Check images load correctly

## Step 6: SEO Updates

### 6.1 Update Metadata

Ensure each post has:
- Clear, descriptive title (already in front matter)
- Meta description (excerpt in front matter)
- Relevant tags/categories
- Proper heading hierarchy (H1, H2, H3)

### 6.2 Create Sitemap

The site has a robots.txt referencing sitemap.xml. To generate:

```bash
npm install --save-dev next-sitemap
```

Add to `next.config.js`:

```js
const withSiteMap = require("next-sitemap");

module.exports = withSiteMap({
  // ... other config
  siteUrl: 'https://rbgdata.com',
  generateRobotsTxt: true,
});
```

Then add to `package.json`:
```json
"build": "next build && next-sitemap && next export"
```

### 6.3 Submit to Search Engines

1. **Google Search Console**:
   - Add property: https://rbgdata.com
   - Upload sitemap
   - Submit old URLs for removal/consolidation

2. **Bing Webmaster Tools**:
   - Add site
   - Upload sitemap
   - Request crawl

## Step 7: Verify Migration

### 7.1 Content Checklist

- [ ] All blog posts migrated
- [ ] Images loading correctly
- [ ] Links are updated
- [ ] Tags/categories properly set
- [ ] Post dates preserved
- [ ] Author information accurate
- [ ] Excerpts created for all posts

### 7.2 Functionality Checklist

- [ ] Home page displays latest posts
- [ ] Blog listing shows all posts
- [ ] Individual posts render correctly
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Search functionality (if any)
- [ ] Comments (if applicable - not included in new site)

### 7.3 Performance Check

1. Run Lighthouse audit
2. Check Core Web Vitals
3. Test on slow 3G network
4. Verify CSS and JS load quickly

## Step 8: Launch

### 8.1 Pre-Launch

1. Deploy new site to GitHub Pages (if not already)
2. Do final QA on staging domain
3. Set up redirects
4. Prepare WordPress "We've moved" notice

### 8.2 Launch Day

1. Update WordPress homepage with redirect notice
2. Post update on social media
3. Update email signature with new link
4. Monitor for issues

### 8.3 Post-Launch

1. Monitor 404 errors in analytics
2. Check Search Console for crawl issues
3. Update any references to old domain
4. Plan WordPress sunset (60-90 days)

## Common Issues

### Images not loading

- Check image paths are relative: `/images/blog/image.png`
- Verify images exist in `public/` directory
- Clear Next.js cache: `rm -rf .next/`

### Formatting looks different

- HTML formatting may not transfer perfectly to markdown
- Review converted posts
- Fix code blocks, quotes, lists manually if needed

### Links broken

- Use a link checker tool: [Dr. Link Check](https://www.drlinkcheck.com/)
- Update any internal links to use new URL structure
- Test redirects

### Performance issues

- Optimize image sizes: resize before uploading
- Use modern formats: WebP instead of PNG/JPG when possible
- Lazy load images in markdown

### SEO rankings drop

- Common after migration if not handled properly
- Ensure 301 redirects are working
- Update Google Search Console
- Submit URLs for recrawling
- Usually recovers in 1-3 months

## Resources

- [WordPress to Static Site Migration Guide](https://jamstack.org/headless-cms/)
- [URL Redirect Best Practices](https://moz.com/blog/301-redirection)
- [Markdown Conversion Tools](https://pandoc.org/)
- [Google Search Console Help](https://support.google.com/webmasters/)

## Rollback Plan

If something goes wrong:

1. Keep WordPress running during migration
2. Don't delete old site immediately
3. Monitor new site for 1-2 weeks
4. Keep backup of all migrated content
5. If needed, direct traffic back to WordPress

---

**Migration Timeline**: Plan for 1-2 weeks of work depending on content volume and customization needs.

Once complete, you'll have a fast, maintainable site hosted on GitHub Pages with your custom domain! 🚀
