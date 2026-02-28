# CLAUDE.md — AI Assistant Guide for ZaidAbuAlshaarPortfolio

This file provides guidance for AI assistants (Claude, Copilot, etc.) working in this repository.

---

## Project Overview

A **bilingual (English/Arabic) personal portfolio SPA** for Zaid Abu Alshaar — a Full-Stack Developer & AI Specialist based in Amman, Jordan.

- **Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Routing:** React Router v6 with language-prefixed routes (`/:lang/...`)
- **Deployment:** GitHub Pages via GitHub Actions (auto-deploy on push to `main`)
- **Hosted at:** `https://zaidabualshaar.github.io/ZaidAbuAlshaarPortfolio/`

---

## Repository Structure

```
/
├── public/                    # Static assets (served as-is)
│   ├── cv/                    # Downloadable CV (PDF)
│   ├── images/                # Portfolio images, project screenshots, videos
│   ├── placeholders/          # Placeholder images
│   ├── favicon.png
│   ├── robots.txt
│   ├── sitemap.xml            # EN + AR routes
│   └── .nojekyll              # Disables Jekyll for GitHub Pages
├── src/
│   ├── components/            # Shared UI components
│   │   ├── ui/                # shadcn/ui primitives (accordion, button, card, etc.)
│   │   ├── Layout.tsx         # Sticky navbar, mobile menu, language toggle, footer
│   │   ├── Gallery.tsx        # Single-image expand/collapse gallery
│   │   ├── MediaGallery.tsx   # Multi-media gallery (images + video)
│   │   ├── SEO.tsx            # react-helmet-async wrapper for per-page SEO
│   │   └── ScrollToTop.tsx    # Auto-scroll on route change
│   ├── pages/                 # Route-level page components
│   │   ├── Home.tsx           # Hero, stats, services preview, featured projects, FAQ, CTA
│   │   ├── About.tsx          # Bio, education, skills, experience, CV download
│   │   ├── Services.tsx       # Service cards linked to projects
│   │   ├── Projects.tsx       # Searchable/filterable project grid with galleries
│   │   ├── Awards.tsx         # Awards, certifications, highlights
│   │   ├── Certifications.tsx # Companion certification listings
│   │   ├── Contact.tsx        # Form (WhatsApp/Email) + quick contact links
│   │   └── NotFound.tsx       # 404 page
│   ├── content/               # All portfolio data lives here — edit to update content
│   │   ├── site.ts            # Name, bio, skills, contact, social links, education, experiences
│   │   ├── services.ts        # 6 service offerings with linked project slugs
│   │   ├── projects.ts        # Projects: slugs, bilingual titles/descriptions, tech, links
│   │   ├── achievements.ts    # Awards, certifications, experiences with media
│   │   └── faq.ts             # FAQ items (EN + AR)
│   ├── i18n/                  # Internationalization
│   │   ├── LanguageContext.tsx # React Context: 'en' | 'ar' language state
│   │   ├── dictionaries/
│   │   │   ├── en.ts          # English UI strings
│   │   │   └── ar.ts          # Arabic UI strings
│   │   ├── types.ts           # Dictionary TypeScript interface
│   │   └── index.ts           # Re-exports
│   ├── hooks/
│   │   └── use-toast.ts       # Toast notification hook
│   ├── lib/
│   │   ├── utils.ts           # cn() — clsx + tailwind-merge helper
│   │   ├── assets.ts          # publicUrl() — handles BASE_URL in dev vs production
│   │   ├── images.ts          # Image path utilities
│   │   └── animations.ts      # Framer Motion animation presets
│   ├── App.tsx                # React Router config with /:lang/* routes
│   ├── main.tsx               # Entry: ReactDOM.render, BrowserRouter, HelmetProvider
│   └── index.css              # Tailwind directives + CSS custom properties + utilities
├── index.html                 # HTML template with JSON-LD schema, Google Fonts
├── vite.config.ts             # Vite config: @ alias, react plugin, base URL
├── tailwind.config.ts         # Tailwind: custom colors (gold, orange), fonts, animations
├── tsconfig.json              # TypeScript: strict, ESNext, @ alias → ./src
├── .eslintrc.json             # ESLint (Next.js preset, minimal config)
├── .github/workflows/
│   └── deploy.yml             # GitHub Actions: build + deploy to GitHub Pages
└── README.md                  # User-facing setup and deployment guide
```

---

## Development Workflow

### Starting Development

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server at http://localhost:5173
```

### Building for Production

```bash
npm run build        # TypeScript check (tsc -b) + Vite production build → dist/
npm run preview      # Preview the production build locally
```

### Deployment

Deployment is **fully automated**:
- Push to `main` → GitHub Actions builds with `VITE_BASE=/ZaidAbuAlshaarPortfolio/` → deploys to GitHub Pages
- The workflow also copies `dist/index.html` → `dist/404.html` for SPA route refresh support
- No manual deployment steps needed

---

## Key Conventions

### Path Aliases

Use `@/` to import from `src/`:
```typescript
import { cn } from "@/lib/utils";
import { Layout } from "@/components/Layout";
```

### Class Merging

Always use `cn()` from `@/lib/utils` to combine Tailwind classes (handles conflicts via tailwind-merge):
```typescript
import { cn } from "@/lib/utils";
<div className={cn("base-class", condition && "conditional-class", className)} />
```

### Public Asset URLs

Use `publicUrl()` from `@/lib/assets` for all paths to `public/`:
```typescript
import { publicUrl } from "@/lib/assets";
<img src={publicUrl("/images/ZaidAbuAlshaar.png")} />
```
This ensures correct base path in both dev (`/`) and GitHub Pages (`/ZaidAbuAlshaarPortfolio/`).

### Bilingual Content

All user-facing text must support both English and Arabic:

1. **UI strings** → Add to both `src/i18n/dictionaries/en.ts` and `ar.ts`, type them in `src/i18n/types.ts`
2. **Content data** → Content objects in `src/content/*.ts` use `{ en: string; ar: string }` for bilingual fields
3. **Using translations in components:**
```typescript
import { useLanguage } from "@/i18n";
const { lang, dict } = useLanguage();
// Access translation
<p>{dict.someKey}</p>
// Access bilingual content field
<h2>{project.title[lang]}</h2>
```
4. **RTL support** — The `dir` attribute is set based on `lang` (`rtl` for `ar`). Use Tailwind RTL variants (`rtl:text-right`) when layout differs.

### Styling Conventions

- **Dark mode first:** The `<html>` element has `class="dark"` by default. Always ensure dark mode looks correct.
- **Custom colors:** Use `gold` and `orange` Tailwind color tokens (defined in `tailwind.config.ts`):
  - `text-gold-DEFAULT` / `bg-gold-DEFAULT` — #D4A843
  - `text-orange-DEFAULT` / `bg-orange-DEFAULT` — #F97316
- **CSS variables:** Theme colors (primary, secondary, accent, etc.) are defined as CSS custom properties in `src/index.css`
- **Animation:** Use Framer Motion for animations; presets are in `src/lib/animations.ts`
- **Custom utilities:** `.hover-lift` and `.glass-border` are defined in `src/index.css`

### Routing

Routes are language-prefixed:
```
/:lang/              → Home
/:lang/about         → About
/:lang/services      → Services
/:lang/projects      → Projects
/:lang/awards        → Awards
/:lang/certifications → Certifications
/:lang/contact       → Contact
```
Where `:lang` is `en` or `ar`. Route definitions are in `src/App.tsx`.

### Forms & Validation

Use **React Hook Form + Zod** for all forms:
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
```

The contact form supports optional Formspree integration via `VITE_FORMSPREE_ENDPOINT` environment variable.

---

## Updating Portfolio Content

All content is data-driven — **never hardcode content in page components**. Edit the files in `src/content/`:

| What to change | File |
|---|---|
| Name, bio, skills, education, contact, social links | `src/content/site.ts` |
| Service offerings | `src/content/services.ts` |
| Portfolio projects | `src/content/projects.ts` |
| Awards, certifications, experience | `src/content/achievements.ts` |
| FAQ items | `src/content/faq.ts` |
| UI strings (buttons, labels, nav) | `src/i18n/dictionaries/en.ts` & `ar.ts` |

**Adding a new project:**
1. Add entry to `src/content/projects.ts` with a unique `slug`
2. Add project images to `public/images/` following the naming convention
3. Optionally reference the project slug in `src/content/services.ts`

**Adding images:**
- Place images in `public/images/`
- Reference via `publicUrl("/images/filename.ext")`

---

## Component Guidelines

### Adding a New Page

1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add nav link in `src/components/Layout.tsx`
4. Add translation keys for the page title/nav in both dictionaries

### Adding a New shadcn/ui Component

shadcn/ui components live in `src/components/ui/`. To add a new one, follow the shadcn/ui pattern using Radix UI primitives + Tailwind. Do not install via the shadcn CLI in this project — add components manually to maintain control.

### SEO

Each page uses the `SEO` component:
```tsx
import SEO from "@/components/SEO";
<SEO title="Page Title" description="Page description" />
```

---

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `VITE_FORMSPREE_ENDPOINT` | Contact form email submissions via Formspree | Optional |
| `VITE_BASE` | Base URL path (set automatically by GitHub Actions) | Auto |

Create a `.env` file (never commit it) for local overrides.

---

## No Test Suite

There is currently **no testing framework** configured. When adding tests:
- Recommended: Vitest (compatible with Vite, minimal config)
- Test files: `src/**/*.test.tsx` or `src/**/*.spec.tsx`
- Add `vitest` + `@testing-library/react` to dev dependencies

---

## Important Files at a Glance

| File | Purpose |
|---|---|
| `src/content/site.ts` | Primary source of truth for personal info |
| `src/i18n/dictionaries/en.ts` | All English UI strings |
| `src/i18n/dictionaries/ar.ts` | All Arabic UI strings |
| `src/lib/assets.ts` | `publicUrl()` — required for all asset paths |
| `src/lib/utils.ts` | `cn()` — required for all className merges |
| `vite.config.ts` | Build config, @ alias |
| `.github/workflows/deploy.yml` | Deployment pipeline |
| `public/sitemap.xml` | Update when adding/removing routes |

---

## Common Pitfalls

1. **Do not hardcode `/images/...` paths** — always use `publicUrl("/images/...")` or the app breaks on GitHub Pages
2. **Do not add content directly in page components** — all content must live in `src/content/`
3. **Always add translations to both `en.ts` and `ar.ts`** — missing keys cause runtime errors
4. **Dark mode is the default** — test all UI changes in dark mode first
5. **The ESLint config uses `next/core-web-vitals`** — this is a legacy leftover. The project does NOT use Next.js; it uses Vite + React Router
6. **No `next-env.d.ts` usage** — the file exists but is irrelevant; this is a Vite project
7. **Arabic text** — use the `font-arabic` Tailwind class or `font-family: 'Noto Sans Arabic'` for Arabic content display
