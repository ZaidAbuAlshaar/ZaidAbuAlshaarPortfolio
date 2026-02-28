-- ============================================================
-- Zaid Abu Alshaar Portfolio — Supabase Schema
-- Run this entire file in: Supabase → SQL Editor → New query
-- ============================================================

-- 1. Achievements (awards, certifications, experience highlights)
create table if not exists achievements (
  id            uuid    default gen_random_uuid() primary key,
  title_en      text    not null,
  title_ar      text    not null,
  issuer_en     text    not null default '',
  issuer_ar     text    not null default '',
  description_en text   not null default '',
  description_ar text   not null default '',
  year          int     not null,
  category      text    not null check (category in ('award', 'certification', 'experience')),
  image_urls    text[]  not null default '{}',
  order_index   int     not null default 0,
  created_at    timestamptz default now()
);

-- 2. Projects
create table if not exists projects (
  id              uuid    default gen_random_uuid() primary key,
  slug            text    unique not null,
  title_en        text    not null,
  title_ar        text    not null,
  description_en  text    not null default '',
  description_ar  text    not null default '',
  summary_en      text    not null default '',
  summary_ar      text    not null default '',
  tags            text[]  not null default '{}',
  tech_stack      text[]  not null default '{}',
  role_en         text    not null default '',
  role_ar         text    not null default '',
  image_urls      text[]  not null default '{}',
  featured        boolean not null default false,
  coming_soon     boolean not null default false,
  contact_for_info boolean not null default false,
  github_url      text    not null default '',
  demo_url        text    not null default '',
  order_index     int     not null default 0,
  created_at      timestamptz default now()
);

-- 3. Site content (bio, tagline, skills — key/value store)
create table if not exists site_content (
  key        text primary key,
  value_en   text not null default '',
  value_ar   text not null default '',
  updated_at timestamptz default now()
);

-- ── Storage ─────────────────────────────────────────────────
-- Create a public bucket manually in Supabase → Storage → New bucket
-- Bucket name: portfolio-images
-- Toggle "Public bucket" ON
-- ────────────────────────────────────────────────────────────

-- ── Optional: enable RLS (only needed if you add auth later)
-- alter table achievements enable row level security;
-- alter table projects enable row level security;
-- alter table site_content enable row level security;
