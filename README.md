# Zaid Abu Alshaar Portfolio

Bilingual (EN/AR) portfolio built with Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui patterns, and Framer Motion.

## Features

- Bilingual: English (default) + Arabic with true RTL support
- Dark/Light theme toggle (dark default)
- Diagonal hero split with floating animated cards
- Orange/gold accent premium theme
- Framer Motion animations (hero entrance, scroll reveal, card stagger, hover tilt)
- SEO: per-page metadata, JSON-LD (Person + WebSite), sitemap.xml, robots.txt
- Floating "AI Assistant (Coming Soon)" button
- All personal data driven from config files

## Getting Started

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # Production build
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Redirects to `/en` |
| `/en` | English home |
| `/ar` | Arabic home (RTL) |
| `/en/services` | Services page |
| `/en/portfolio` | All projects with category filter |
| `/en/portfolio/[slug]` | Project detail page |
| `/en/about` | About page |
| `/en/achievements` | Achievements page |
| `/en/contact` | Contact page |

All routes have `/ar` equivalents.

## Placeholders to Update

### Config Files

| File | What to Update |
|------|---------------|
| `src/content/site.ts` | Email, phone, location, social links (GitHub, LinkedIn, Twitter), site URL, CTA text |
| `src/content/projects.ts` | Replace all 7 placeholder projects with real ones (title, summary, description, tags, techStack, links) |
| `src/content/achievements.ts` | Replace all 8 placeholder achievements with real ones (title, issuer, date, description, credential URLs) |

### Images (in `public/placeholders/`)

| File | Purpose | Recommended Size |
|------|---------|-----------------|
| `portrait.png` | Hero + About page portrait | 800x800px |
| `og-image.png` | OpenGraph social share image | 1200x630px |
| `resume.pdf` | Downloadable resume | PDF |
| `project-{1-7}.png` | Project thumbnails | 1200x675px (16:9) |
| `project-{N}-gallery-{1-3}.png` | Project gallery images | 1200x675px |
| `cert-{1-2}.png` | Certification badge images | 200x200px |
| `course-{1-2}.png` | Course completion images | 200x200px |
| `competition-{1-2}.png` | Competition images | 200x200px |
| `award-{1-2}.png` | Award/trophy images | 200x200px |

### Dictionary Text

| File | What to Update |
|------|---------------|
| `src/i18n/dictionaries/en.ts` | English UI text, bio paragraphs, service descriptions |
| `src/i18n/dictionaries/ar.ts` | Arabic translations for all UI text |

### Other

| Item | Location |
|------|----------|
| Site URL | `src/content/site.ts` → `siteUrl` (currently `https://placeholder-domain.com`) |
| Favicon | `public/favicon.ico` (add your own) |
| Contact form backend | `src/components/pages/contact-content.tsx` → `handleSubmit` function |

## Project Structure

```
src/
  app/
    [locale]/         # Dynamic locale segment (en/ar)
      layout.tsx      # Locale layout (html lang/dir, fonts, providers)
      page.tsx        # Home page
      services/       # Services page
      portfolio/      # Portfolio listing + [slug] detail
      about/          # About page
      achievements/   # Achievements page
      contact/        # Contact page
    layout.tsx        # Root layout (minimal)
    page.tsx          # Redirects / to /en
    sitemap.ts        # Auto-generated sitemap
    robots.ts         # Robots.txt generation
  components/
    sections/         # Home page sections (hero, services preview, etc.)
    pages/            # Page-specific content components
    navbar.tsx        # Main navigation
    footer.tsx        # Footer
    theme-toggle.tsx  # Dark/light toggle
    language-switcher.tsx  # EN/AR switcher
    ai-assistant-button.tsx  # Floating AI button + modal
    project-card.tsx  # Reusable project card
    achievement-card.tsx  # Reusable achievement card
    floating-card.tsx # Animated floating card
    section-reveal.tsx  # Scroll reveal wrapper
    page-header.tsx   # Reusable page header
    json-ld.tsx       # JSON-LD structured data
  content/
    site.ts           # Global site configuration
    projects.ts       # Project data
    achievements.ts   # Achievement data
  i18n/
    index.ts          # i18n utilities
    dictionaries/
      en.ts           # English dictionary
      ar.ts           # Arabic dictionary
  lib/
    utils.ts          # Utility functions (cn)
  providers/
    theme-provider.tsx  # Theme context provider
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion
- **Theme**: next-themes (dark/light)
- **Icons**: Lucide React
- **Fonts**: Inter + Noto Sans Arabic
