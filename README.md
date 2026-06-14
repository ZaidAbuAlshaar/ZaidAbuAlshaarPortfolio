# Zaid Abu Alshaar — Portfolio

**Live:** https://zaid.zaiddev.com · بورتفوليو شخصي ثنائي اللغة (عربي/إنجليزي) مع لوحة تحكّم لإدارة المسابقات والمشاريع.

A bilingual (English / Arabic-RTL) personal portfolio for Zaid Abu Alshaar — Full-Stack Developer, AI Integration Specialist, and AR/VR creator — with a private, database-backed admin dashboard for managing competitions, awards, and projects without touching code.

## Features

- **Bilingual & RTL** — full English / Arabic experience with correct right-to-left layout per route.
- **SEO-first** — post-build prerendering of every route, canonical + hreflang, OpenGraph/Twitter tags, and rich JSON-LD (`Person` + `WebSite`) for strong name discoverability.
- **Supabase-backed content** — Awards, Certifications, and Projects load live from a database with an instant static fallback and realtime updates (new entries appear without a redeploy).
- **Admin dashboard** (`/admin`) — Supabase-Auth-gated CRUD for competitions/awards and projects, with image/video upload. Writes are protected by Row Level Security (public read, owner-only write).
- **Polished UX** — framer-motion animations, dark theme, responsive down to mobile, contact via form / WhatsApp / email.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript, Vite 6, Tailwind CSS, shadcn/ui, framer-motion |
| Routing / i18n | React Router v6, custom bilingual context |
| Backend / data | Supabase (Postgres + Auth + Storage + Realtime, RLS) |
| SEO | Custom prerender script, react-helmet-async, JSON-LD |
| Hosting | GitHub Pages (GitHub Actions) on a custom domain |

## Getting Started

```bash
npm install
cp .env.example .env.local   # set Supabase URL + anon key (both public; data is protected by RLS)
npm run dev                  # http://localhost:5173
```

Build (type-check + bundle + prerender all routes):

```bash
npm run build
npm run preview
```

### Environment

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Both values are safe to expose in the client bundle — the security boundary is Supabase Row Level Security (public read, writes locked to the owner account).

## Admin

Visit `/admin`, sign in with the owner account, and manage **Competitions & Awards** and **Projects** (bilingual fields, rank, dates, image upload, ordering). Changes appear on the public site in realtime. The admin area is `noindex` and disallowed in `robots.txt`.

## Project Structure

```
src/
  pages/            # public pages (Home, About, Services, Projects, Awards, Certifications, Contact)
  pages/admin/      # Supabase-Auth-gated admin dashboard (achievements, projects)
  hooks/            # Supabase data hooks (static fallback + realtime)
  components/       # UI components, SEO, media gallery
  content/          # static fallback content + site config
  i18n/             # bilingual dictionaries + language context
scripts/prerender.js  # post-build static HTML + SEO injection
```

## Deployment

Push to `main` → GitHub Actions builds and deploys to GitHub Pages on the custom domain (`public/CNAME`).

## License

© Zaid Abu Alshaar. All rights reserved.
