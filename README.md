# Zaid Abu Alshaar — Portfolio

A bilingual (EN / AR RTL) personal portfolio built with React, TypeScript, Vite, and Tailwind CSS. Features SEO, contact form with WhatsApp + Email delivery, gallery system, and framer-motion animations.

## Quick Start

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
```

## Deployment (GitHub Pages)

The site auto-deploys to GitHub Pages on every push to `main` via the workflow in `.github/workflows/deploy.yml`.

**Live URL:** `https://ZaidAbuAlshaar.github.io/ZaidAbuAlshaarPortfolio/`

### First-time setup

1. Go to **Settings > Pages** in your GitHub repo.
2. Under **Source**, select **GitHub Actions**.
3. Push to `main` — the workflow will build and deploy automatically.

### How it works

- The workflow sets `VITE_BASE=/ZaidAbuAlshaarPortfolio/` so all assets load from the correct subpath.
- `dist/index.html` is copied to `dist/404.html` so SPA client-side routing works on refresh.
- Local dev (`npm run dev`) is unaffected — base defaults to `/`.

### Switching to a custom domain

1. In **Settings > Pages > Custom domain**, enter your domain (e.g. `zaidabualshaar.com`).
2. Add a `CNAME` DNS record pointing to `ZaidAbuAlshaar.github.io`.
3. In `.github/workflows/deploy.yml`, remove the `VITE_BASE` env variable (or set it to `/`).
4. Push — the site will now load from your custom domain root.

## Contact Form Setup (Formspree)

The contact form includes a **Preferred Contact Method** selector (WhatsApp or Email, default WhatsApp).

- **WhatsApp selected:** Opens WhatsApp with a pre-filled message.
- **Email selected:** Sends via Formspree (if configured) or opens the user's email client with a `mailto:` link.

To set up Formspree so messages arrive in your inbox:

1. Go to [formspree.io](https://formspree.io) and create a free form
2. Copy your form endpoint (e.g. `https://formspree.io/f/xyzabcde`)
3. Create a `.env` file in the project root:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

## CV File

Place your CV at:

```
public/cv/Zaid_Abu_Alshaar_CV.pdf
```

The "Download CV" button appears in the navbar, home hero, and about page. It links to `/cv/Zaid_Abu_Alshaar_CV.pdf`.

## Images & Gallery

### Naming Convention

**Project images:**
```
public/images/projects/{slug}-1.jpg
public/images/projects/{slug}-2.jpg
...up to {slug}-8.jpg
```

**Achievement images:**
```
public/images/achievements/{id}-1.jpg
public/images/achievements/{id}-2.jpg
...up to {id}-8.jpg
```

The Gallery component auto-loads images 1 through 8 and hides any that don't exist. If no images load, it shows `public/placeholder.svg`. A "View Gallery" button toggles the gallery display.

### Portrait
```
public/images/zaid-portrait.png
```

## Data Files (edit content here)

| File | Controls |
|------|----------|
| `src/content/site.ts` | Name, bio, contact info, skills, experiences, education, social links, SEO defaults |
| `src/content/services.ts` | 4 service cards (Full-Stack, AI, UI/UX, XR) with linked project slugs |
| `src/content/projects.ts` | All projects shown in the Projects page (with real GitHub repo links) |
| `src/content/achievements.ts` | Awards, certifications, and experience highlights |
| `src/content/faq.ts` | FAQ items in EN + AR |

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/:lang` | **Home** | Hero with diagonal portrait, stats, services preview, featured projects, process steps, awards teaser, FAQ, CTA |
| `/:lang/services` | **Services** | 4 service cards with "See related projects" links to Projects page |
| `/:lang/projects` | **Projects** | Search input + filter chips, card grid with expandable details, gallery, GitHub/demo links |
| `/:lang/awards` | **Awards & Certifications** | Awards, certifications, experience highlights with gallery + Coming Soon cards |
| `/:lang/about` | **About** | Bio, education, skills grid, experience cards, involvement, CV download |
| `/:lang/contact` | **Contact** | Form with preferred contact method (WhatsApp/Email), copy message button, quick contact links |

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite 6
- **Styling:** Tailwind CSS 3 + shadcn/ui components
- **Animations:** Framer Motion
- **Routing:** React Router v6 (bilingual: `/en`, `/ar` with RTL)
- **Forms:** React Hook Form + Zod validation
- **SEO:** react-helmet-async + JSON-LD schema + sitemap.xml
- **Contact:** WhatsApp API + Formspree (optional) + mailto fallback

## SEO

- Per-page `<title>` and `<meta>` tags via react-helmet-async
- JSON-LD structured data (Person + WebSite) in `index.html`
- `public/sitemap.xml` with EN + AR routes
- `public/robots.txt` referencing sitemap
- OpenGraph + Twitter Card meta tags on every page
