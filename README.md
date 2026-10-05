# RBG Data Website

A modern, accessible website for RBG Data - data stories and visualization insights.

Built with Next.js, Tailwind CSS, and deployed on GitHub Pages.

## Features

- 🎨 Custom branding with Montserrat typography and cohesive color palette
- 📝 Markdown-based blog system
- 🚀 Static site generation for fast performance
- ♿ Accessibility-first design
- 📱 Fully responsive
- 🔗 Git-based deployment to GitHub Pages
- 🎯 SEO-optimized

## Project Structure

```
rbgdata/
├── app/                    # Next.js app router pages
│   ├── blog/              # Blog pages
│   │   ├── page.tsx       # Blog listing
│   │   └── [slug]/        # Individual blog posts
│   ├── portfolio/         # Portfolio showcase
│   ├── about/             # About page
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Header.tsx         # Navigation
│   └── Footer.tsx         # Footer
├── lib/                   # Utilities
│   ├── posts.ts           # Blog post utilities
│   └── markdown.ts        # Markdown rendering
├── posts/                 # Blog posts (markdown files)
├── public/                # Static assets
├── branding/              # Brand guidelines
├── globals.css            # Global styles
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Build

```bash
npm run build
npm start
```

### Export for GitHub Pages

```bash
npm run export
```

This creates a static export in the `out/` directory.

## Adding Blog Posts

Create a new markdown file in the `posts/` directory:

```markdown
---
title: "My First Post"
date: "2024-01-15"
excerpt: "A brief description of the post"
author: "Rebecca Bergh"
tags: ["Tableau", "Data Visualization"]
---

# Your content here

This is a markdown blog post.
```

Front matter (between `---`) is required with:
- `title` - Post title
- `date` - Publication date (YYYY-MM-DD)
- `excerpt` - Short description (used in listings)
- `author` - Author name (optional, defaults to Rebecca Bergh)
- `tags` - Array of tags (optional)

## Deploying to GitHub Pages

### 1. Set up GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages"
3. Set source to "GitHub Actions"
4. Save

### 2. Configure Domain

To use `rbgdata.com`:

1. Add a CNAME record to your domain's DNS:
   - Type: CNAME
   - Name: @
   - Value: `username.github.io` (replace with your GitHub username)

2. Or add A records pointing to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

3. The GitHub Actions workflow will automatically add a CNAME file on each deploy

### 3. First Deployment

Push to the `main` branch:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

GitHub Actions will automatically build and deploy your site to `https://rbgdata.com`.

## Design System

### Colors

- **Teal** (Primary): `#174F5B`
- **Coral** (Accent): `#E56B52`
- **Cream** (Background): `#F7F1E7`
- **Charcoal** (Text): `#25282A`
- **Gold** (Spotlight): `#D6a84B`

### Typography

- **Font**: Montserrat
- **Headlines**: Black (900) or Extra Bold (800)
- **Body**: Normal (400)
- **Subtitles**: Thin (100)

### Design Principles

- Clean, strong grids
- Geometric shapes
- Generous whitespace
- Subtle dots and lines
- Focus on readability and accessibility

## Customization

### Brand Colors

Edit `tailwind.config.js` to change colors globally.

### Typography

Modify `globals.css` or `tailwind.config.js` for font sizing and weights.

### Layout

Components use Tailwind's utility classes. Adjust spacing, sizing, and breakpoints as needed.

## SEO

The site includes:
- Meta tags for social sharing
- Structured data
- Sitemap reference in robots.txt
- SEO-friendly URLs

## Performance

- Static generation (fast)
- Image optimization
- CSS-in-JS minimization
- Lazy loading on images

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML
- Sufficient color contrast
- Keyboard navigation
- Screen reader support
- Focus indicators

## Troubleshooting

### Build fails locally

```bash
npm ci  # Install exact dependencies
npm run build
```

### Posts not showing

- Ensure markdown files are in the `posts/` directory
- Check YAML front matter is valid
- Restart the dev server

### GitHub Pages not updating

- Check GitHub Actions for build errors
- Ensure `main` branch has the latest code
- Verify CNAME configuration

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Pages Help](https://docs.github.com/en/pages)

## License

© 2026 Rebecca Bergh. All rights reserved.
