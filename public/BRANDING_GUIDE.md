# RBG Data Brand Guide

Your brand assets are organized and ready to use across all materials.

## Logo Files

### Primary Logo (`logo-primary.png`)
- **Usage**: Homepage hero, large displays, social media covers
- **Contains**: Full mark with "RBG DATA" text + tagline
- **Best for**: Eye-catching, complete brand presentation
- **Location**: `public/logo-primary.png`

### Wordmark (`logo-wordmark.png`)
- **Usage**: Header navigation, smaller spaces, document headers
- **Contains**: "RBG DATA" text only
- **Best for**: Compact spaces, header branding
- **Location**: `public/logo-wordmark.png`

### Submark (`logo-submark.png`)
- **Usage**: Secondary displays, badges, square layouts
- **Contains**: Icon mark with "RBG" text
- **Best for**: Icon-adjacent layouts, social avatars
- **Location**: `public/logo-submark.png`

### Icon Only (`logo-icon.png`)
- **Usage**: Favicons, small headers, app icons
- **Contains**: Geometric mark only
- **Best for**: Very small spaces, icon-only applications
- **Location**: `public/logo-icon.png`

## Where They're Used

### Header Navigation
- Uses: `logo-icon.png` (mobile) + `logo-wordmark.png` (desktop)
- Location: `components/Header.tsx`

### Homepage Hero
- Uses: `logo-primary.png`
- Location: `app/page.tsx`

### Methodology Display
- Uses: `logo-submark.png`
- Location: `app/page.tsx`

## Color Palette

All logos use the RBG Data brand colors:
- **Teal** (Primary): #174F5B
- **Coral** (Accent): #E56B52
- **Gold** (Spotlight): #D6a84B
- **Charcoal** (Contrast): #25282A

## Typography

Montserrat font family:
- Headlines: Black (900) or Extra Bold (800)
- Body: Normal (400)
- Subtitles: Thin (100)

## Design Principles

- Clean, strong grids
- Geometric shapes (note the circular data visualization mark)
- Generous whitespace
- Subtle dots and lines
- Professional and approachable

## Using Logos in New Places

To use a logo in a new component:

```tsx
import Image from 'next/image';

export default function MyComponent() {
  return (
    <Image
      src="/logo-primary.png"
      alt="RBG Data"
      width={600}
      height={180}
      className="w-full max-w-md h-auto"
    />
  );
}
```

Key points:
- Always use Next.js `Image` component for optimization
- Always include descriptive `alt` text
- Set appropriate `width` and `height` for best performance
- Use `className` to control sizing in your layout

## Logo Spacing

Maintain clear space around logos:
- Minimum 10px padding on all sides
- Consider background contrast (light backgrounds for visibility)
- Stack logos vertically on mobile, horizontally on desktop

## Favicon

To use the icon logo as your favicon, add to `app/layout.tsx`:

```tsx
<link rel="icon" href="/logo-icon.png" />
```

## Brand Files Location

All brand assets are stored in: `branding/`
- `style.md` - Color palette and design guidelines
- `primarylogo.png` - Primary logo
- `wordmark.png` - Wordmark
- `submark.png` - Submark with text
- `submarknotext.png` - Icon only

---

For questions about brand usage, refer to `style.md` in the branding folder.
