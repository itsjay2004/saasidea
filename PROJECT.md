# SaaSIdea Pro — Project Reference

> A Next.js web app that sells lifetime access to a library of 1,200+ validated SaaS ideas. One-time payment via Dodo Payments, data in Supabase, Tailwind CSS for styling.

---

## Tech Stack

| Layer        | Technology                                       |
|--------------|--------------------------------------------------|
| Framework    | Next.js 16.2 (App Router, React 19)              |
| Styling      | Tailwind CSS 3.4, custom CSS variables in `globals.css` |
| Database     | Supabase (PostgreSQL) — no ORM, raw Supabase client |
| Auth         | Supabase Auth (email/password, Google OAuth, magic link) |
| Payments     | Dodo Payments (one-time checkout, webhook)        |
| Icons        | lucide-react                                      |
| Charts       | Recharts (keyword trend charts)                   |
| Fonts        | Newsreader (heading), DM Sans (body)              |
| Theme        | Dark/light toggle via `dark` class on `<html>`, stored in localStorage |

---

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (fonts, metadata, theme init script)
│   ├── globals.css                 # Tailwind + CSS custom properties (colors, shadows, etc.)
│   ├── not-found.tsx               # 404 page
│   ├── robots.ts                   # robots.txt — allows all crawlers
│   ├── sitemap.ts                  # Dynamic sitemap — all /ideas/{id} pages from DB
│   │
│   ├── (marketing)/                # Route group — landing page
│   │   ├── layout.tsx              # Wraps children with <Navbar /> + <main>
│   │   └── page.tsx                # Home page — assembles all landing sections
│   │
│   ├── (app)/                      # Route group — authenticated/app pages
│   │   ├── layout.tsx              # Wraps children with <Navbar /> + <main class="pt-16">
│   │   ├── dashboard/
│   │   │   └── page.tsx            # User dashboard (requires auth, shows access status)
│   │   └── ideas/
│   │       ├── page.tsx            # Ideas library (paginated, filterable, server component)
│   │       ├── loading.tsx         # Skeleton loader
│   │       ├── error.tsx           # Error boundary
│   │       └── [id]/
│   │           ├── page.tsx        # Individual idea detail page (SEO metadata per idea)
│   │           └── loading.tsx     # Skeleton loader
│   │
│   └── api/
│       ├── auth/callback/route.ts  # Supabase OAuth callback handler
│       └── webhooks/dodo/route.ts  # Dodo Payments webhook (payment.succeeded → upsert purchase)
│
├── components/
│   ├── auth/
│   │   └── AuthModal.tsx           # Login/signup modal (email+pw, Google, magic link)
│   ├── ideas/
│   │   ├── IdeaCard.tsx            # Idea card — full version (unlocked) or teaser (locked)
│   │   ├── IdeaGrid.tsx            # Grid wrapper for IdeaCard list
│   │   ├── FilterBar.tsx           # Sidebar filters (industry, difficulty, competition, etc.)
│   │   ├── SearchBar.tsx           # Text search input
│   │   ├── SortDropdown.tsx        # Sort by MRR, build time, etc.
│   │   ├── Pagination.tsx          # Page navigation
│   │   ├── PaywallBlur.tsx         # Client component — blurs content + shows unlock CTA
│   │   ├── KeywordTable.tsx        # Table of keyword data on idea detail page
│   │   └── TrendChart.tsx          # Recharts line chart for keyword monthly searches
│   ├── landing/
│   │   ├── Hero.tsx                # Hero section with floating preview cards
│   │   ├── Stats.tsx               # Key metrics banner
│   │   ├── HowItWorks.tsx          # 3-step explainer
│   │   ├── FeaturesGrid.tsx        # Feature cards
│   │   ├── PreviewSection.tsx      # Free idea cards + 3 locked cards (server component)
│   │   ├── NicheGrid.tsx           # 15 industry cards (server component)
│   │   ├── CrawlableLink.tsx       # SEO link — visible href goes to /#pricing, hidden sr-only link has real URL for crawlers
│   │   ├── Pricing.tsx             # Pricing card with Dodo checkout (client component)
│   │   ├── FAQ.tsx                 # Accordion FAQ
│   │   └── Footer.tsx              # Footer with subtle /ideas link for crawlers
│   └── ui/
│       ├── Navbar.tsx              # Fixed top navbar (client component — auth state, scroll detection)
│       ├── Button.tsx              # Reusable button (primary/secondary/ghost/outline, sm/md/lg)
│       ├── Badge.tsx               # Small colored badge
│       └── ThemeSwitcher.tsx       # Dark/light toggle
│
├── lib/
│   ├── utils.ts                    # Formatters (currency, MRR, build time), industry color maps, difficulty styles
│   ├── dodo.ts                     # getCheckoutUrl(), verifyWebhookSignature()
│   └── supabase/
│       ├── client.ts               # Browser Supabase client (createBrowserClient)
│       ├── server.ts               # Server Supabase client (createServerSupabaseClient) + service role client
│       ├── middleware.ts            # Session refresh + /dashboard auth guard
│       └── queries.ts              # All data access functions (see "Data Access" below)
│
├── types/
│   └── index.ts                    # TypeScript types: Idea, Keyword, IdeaWithKeywords, Filters, Purchase
│
└── middleware.ts                    # Root middleware — delegates to supabase/middleware.ts
```

---

## Database Tables (Supabase)

There is no schema file in the repo. Tables are inferred from query code and types:

### `ideas`
The main table. Each row is a SaaS idea.

| Column                    | Type       | Notes                                          |
|---------------------------|------------|-------------------------------------------------|
| `id`                      | uuid/text  | Primary key                                     |
| `title`                   | text       |                                                 |
| `tagline`                 | text       |                                                 |
| `pain_point`              | text       | Problem description                             |
| `industry`                | text       | One of 15 industries                            |
| `niche`                   | text       |                                                 |
| `sub_niche`               | text       | Nullable                                        |
| `tags`                    | text[]     | Array of tag strings                            |
| `target_audience`         | text       |                                                 |
| `mrr_potential.min`       | numeric    | Supabase JSON column accessed with quoted keys  |
| `mrr_potential.max`       | numeric    |                                                 |
| `mrr_potential.currency`  | text       | Defaults to "USD"                               |
| `build_time_weeks.min`    | numeric    |                                                 |
| `build_time_weeks.max`    | numeric    |                                                 |
| `pricing_model`           | text       | e.g. "Subscription", "Freemium"                 |
| `suggested_price.amount`  | numeric    |                                                 |
| `suggested_price.interval`| text       | e.g. "mo"                                       |
| `suggested_price.currency`| text       |                                                 |
| `complexity`              | int        | 1–5 scale                                       |
| `difficulty_label`        | text       | "Easy", "Medium", or "Hard"                     |
| `competition_level`       | text       | "low", "medium", or "high"                      |
| `validation_note`         | text       | Why the idea works                              |
| `is_free`                 | boolean    | If true, idea is visible without purchase        |
| `keywords`                | text[]     | Raw keyword strings (fallback if no volume data)|
| `created_at`              | timestamptz|                                                 |

**Important:** Supabase stores nested JSON fields but queries access them with quoted dot notation: `"mrr_potential.min"`, `"suggested_price.amount"`, etc. The `mapRawIdea()` function in `queries.ts` transforms these flat keys into nested objects for the `Idea` TypeScript type.

### `keywords`
Keyword research data.

| Column              | Type    |
|---------------------|---------|
| `id`                | int     |
| `keyword`           | text    |
| `search_volume`     | int     |
| `competition`       | text    |
| `competition_index` | numeric |
| `cpc`               | numeric |
| `low_top_of_page_bid` | numeric |
| `high_top_of_page_bid` | numeric |
| `monthly_searches`  | jsonb   | Array of `{year, month, search_volume}` |
| `search_trend`      | text    | "growing", "stable", or "declining"     |

### `keyword_idea_mapping`
Join table between ideas and keywords.

| Column       | Type    |
|--------------|---------|
| `idea_id`    | uuid    |
| `keyword_id` | int     |
| `is_primary` | boolean |

### `purchases`
Payment records created by the Dodo webhook.

| Column          | Type        |
|-----------------|-------------|
| `id`            | uuid        |
| `user_id`       | uuid        | References Supabase auth user |
| `email`         | text        |
| `dodo_order_id` | text        | Unique, used for upsert       |
| `amount`        | int         | In cents (e.g. 4900 = $49)    |
| `currency`      | text        |
| `status`        | text        | "active" = paid               |
| `created_at`    | timestamptz |

---

## Data Access (`src/lib/supabase/queries.ts`)

All DB reads happen in server components via these functions:

| Function                | Returns                      | Used By                        |
|-------------------------|------------------------------|--------------------------------|
| `getIdeasSimple(filters)` | `{ ideas, total, hasMore }` | `/ideas` page (paginated, filtered, sorted) |
| `getIdeaById(id)`       | `IdeaWithKeywords \| null`   | `/ideas/[id]` detail page      |
| `getFreeIdeas(limit)`   | `Idea[]`                     | Landing page PreviewSection    |
| `getPaidPreviewIdeas(limit)` | `Idea[]`                | Landing page PreviewSection (locked cards) |
| `getRelatedIdeas(niche, excludeId, limit)` | `Idea[]`  | Idea detail page sidebar       |
| `getIndustries()`       | `{ industry, count }[]`      | FilterBar + NicheGrid          |
| `hasAccess(userId)`     | `boolean`                    | Paywall checks everywhere      |
| `getTotalIdeasCount()`  | `number`                     | Stats section                  |

There is also a `getIdeas(filters)` function that uses an inner join on `keyword_idea_mapping` (only returns ideas WITH keywords). `getIdeasSimple` uses a left join and is the one actually used by the ideas page.

---

## Authentication Flow

1. **Supabase Auth** handles all auth: email/password, Google OAuth, magic link
2. **AuthModal** (`components/auth/AuthModal.tsx`) is the shared login/signup UI
3. **OAuth callback**: `GET /api/auth/callback` exchanges code for session, redirects to `/dashboard`
4. **Middleware** (`src/middleware.ts` → `lib/supabase/middleware.ts`):
   - Runs on every request (except static assets)
   - Refreshes the Supabase session cookie
   - Redirects unauthenticated users from `/dashboard` to `/?login=true`
   - Does NOT block `/ideas` or `/ideas/[id]` — those are public for SEO

---

## Payment Flow

1. User clicks "Get Instant Access" on the Pricing section
2. If not logged in → AuthModal opens first
3. If logged in → `getCheckoutUrl(email, userId)` builds a Dodo Payments checkout URL with `metadata[user_id]`
4. User completes payment on Dodo's hosted checkout
5. Dodo sends `POST /api/webhooks/dodo` with `payment.succeeded` event
6. Webhook verifies HMAC-SHA256 signature, extracts `user_id` from metadata
7. Upserts into `purchases` table with `status: 'active'`
8. User is redirected to `/dashboard?payment=success`
9. `hasAccess(userId)` now returns `true` → all ideas are unlocked

---

## Paywall Strategy

The `/ideas` route is **publicly accessible** (no auth redirect) for SEO. The paywall is enforced at the **content level**:

### On `/ideas` (list page):
- `is_free = true` ideas → full IdeaCard (all metrics, keywords, "View Idea" link)
- `is_free = false` ideas (without purchase) → **LockedIdeaCard**: shows first 4 words of title, first 5 words of tagline, 2-line truncated validation note with gradient fade, then a lock icon + "Get Access" CTA pointing to `/#pricing`. No metrics, no keywords.

### On `/ideas/[id]` (detail page):
- Title, tagline, breadcrumbs are always visible in the header
- Everything below (problem, validation note, keywords, metrics sidebar) is wrapped in `<PaywallBlur locked={!unlocked}>` which blurs content and overlays an unlock CTA

### On landing page:
- **PreviewSection**: Shows all `is_free=true` ideas as full cards + 3 `is_free=false` ideas as fully blurred locked cards
- Card links use `CrawlableLink` — visible `href` goes to `/#pricing`, a hidden `sr-only` link has the real `/ideas/{id}` URL for crawlers

---

## SEO Architecture

The app is designed so search engines can discover and index all idea pages:

1. **Server-rendered pages**: `/ideas` and `/ideas/[id]` are React Server Components — full HTML is in the initial response
2. **`robots.ts`**: Allows all crawlers on `/`
3. **`sitemap.ts`**: Dynamically generates entries for every idea in the database (`/ideas/{id}`)
4. **`generateMetadata`** on `/ideas/[id]`: Per-idea `<title>` and `<meta description>` from DB
5. **Crawl paths from landing page**:
   - `PreviewSection` — `sr-only` links to each free idea's detail page
   - `NicheGrid` — `sr-only` links to `/ideas?industry=X` for each industry
   - `Footer` — subtle "Library" link to `/ideas` (tiny text, near-invisible to humans)
6. **`CrawlableLink` pattern**: Visible `<a href="/#pricing">` for user interaction + hidden `<a href="/ideas/..." class="sr-only">` for crawlers. This keeps parent components as server components (better SEO) while preventing user navigation to paywalled pages

---

## Environment Variables

| Variable                              | Purpose                              |
|---------------------------------------|--------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`            | Supabase project URL                 |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`| Supabase anon/public key             |
| `SUPABASE_SECRET_KEY`                 | Supabase service role key (server only) |
| `NEXT_PUBLIC_DODO_PRODUCT_ID`         | Dodo Payments product ID             |
| `NEXT_PUBLIC_APP_URL`                 | App base URL (for redirect URLs)     |
| `DODO_PAYMENTS_WEBHOOK_SECRET`        | HMAC secret for webhook verification |

---

## Styling Conventions

- **Design tokens** are CSS custom properties defined in `globals.css` (e.g. `--color-background`, `--color-accent`, `--color-text-primary`)
- Dark mode toggles the `dark` class on `<html>` which swaps CSS variable values
- **Font usage**: `font-heading` = Newsreader (serif), default body = DM Sans
- **Color maps**: `INDUSTRY_COLORS`, `DIFFICULTY_STYLES`, `COMPETITION_COLORS` in `lib/utils.ts` map database enum values to Tailwind classes
- **Card design**: Rounded corners (`rounded-2xl`), subtle shadows (`shadow-card`), hover lift (`hover:-translate-y-0.5`), top accent bar on hover
- **Custom shadows**: `shadow-card`, `shadow-card-md`, `shadow-card-lg`, `shadow-accent` defined in Tailwind config

---

## Key Patterns

### Server vs Client Components
Most components are server components. Client components (`'use client'`) are used only for:
- **Navbar** — auth state, scroll detection, mobile menu toggle
- **Pricing** — checkout flow (needs Supabase client + window.location)
- **PaywallBlur** — checkout redirect on idea detail page
- **AuthModal** — form state, Supabase client auth
- **ThemeSwitcher** — localStorage access
- **CrawlableLink** — no longer a client component (pure server component now)

### Data fetching
All DB queries run in server components (via `createServerSupabaseClient`). No client-side data fetching. No API routes for data — the webhook is the only POST endpoint.

### `mapRawIdea()`
Supabase returns flat rows with quoted nested keys (`"mrr_potential.min"`). The `mapRawIdea()` function in `queries.ts` transforms every raw row into the nested `Idea` TypeScript type used by all components.

---

## Route Map

| URL                      | File                                    | Auth Required | Notes                                |
|--------------------------|-----------------------------------------|---------------|--------------------------------------|
| `/`                      | `(marketing)/page.tsx`                  | No            | Landing page                         |
| `/ideas`                 | `(app)/ideas/page.tsx`                  | No            | Public, paywall at card level        |
| `/ideas/[id]`            | `(app)/ideas/[id]/page.tsx`             | No            | Public, paywall on detail content    |
| `/dashboard`             | `(app)/dashboard/page.tsx`              | Yes           | Redirects to `/?login=true` if no user |
| `/api/auth/callback`     | `api/auth/callback/route.ts`            | —             | OAuth code exchange                  |
| `/api/webhooks/dodo`     | `api/webhooks/dodo/route.ts`            | —             | Payment webhook (HMAC verified)      |
