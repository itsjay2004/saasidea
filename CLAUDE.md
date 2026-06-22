# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

SaaSIdea Pro — Next.js 16 (App Router, React 19) app selling **lifetime access** to a library of 1,200+ validated SaaS ideas. One-time payment via Dodo Payments, data in Supabase (raw client, no ORM), Tailwind CSS. See `PROJECT.md` for product/domain detail (note: its component list under `landing/` is partly stale — see Landing below).

## Commands

```bash
bun dev          # dev server at localhost:3000
bun run build    # production build
bun start        # serve production build
bun run lint     # next lint (eslint: next/core-web-vitals + next/typescript)
```

Package manager is **bun** (`bun.lock`). A `package-lock.json` also exists but bun is current. No test framework configured.

## Environment variables

Required (no `.env.example` exists — these are referenced in code):
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — client + SSR auth
- `SUPABASE_SECRET_KEY` — service-role client (webhook writes, bypasses RLS)
- `NEXT_PUBLIC_DODO_PRODUCT_ID`, `NEXT_PUBLIC_APP_URL` — checkout URL build
- `DODO_PAYMENTS_WEBHOOK_SECRET` — webhook signature verify

## Architecture

**Route groups** under `src/app/`:
- `(marketing)/` — public landing page + legal pages, own layout
- `(app)/` — `dashboard`, `ideas`, `ideas/[id]`; layout adds `<Navbar/>` + `pt-16`
- `api/auth/callback` — Supabase OAuth code exchange
- `api/webhooks/dodo` — Dodo `payment.succeeded` handler

**Supabase — three clients** (`src/lib/supabase/`):
- `client.ts` — browser client (`createBrowserClient`)
- `server.ts` — `createServerSupabaseClient()` for RSC/route handlers (cookie-based auth) AND `createServiceRoleClient()` using `SUPABASE_SECRET_KEY` (bypasses RLS)
- `middleware.ts` — `updateSession()` refreshes auth on every request; redirects unauthenticated `/dashboard` hits to `/?login=true`. Wired via `src/middleware.ts`.

**Access / paywall model** — there is no per-user `is_premium` flag. Access = a row in `purchases` with `status='active'` for that user. `hasAccess(userId)` checks this. Ideas have `is_free`; free ideas render fully, paid ones are gated by `PaywallBlur` (client) for unauthenticated/unpaid users. The Dodo webhook upserts into `purchases` (onConflict `dodo_order_id`) after HMAC-verifying the `webhook-{id,signature,timestamp}` headers.

**Data layer** — all queries live in `src/lib/supabase/queries.ts` (`getIdeas`, `getIdeasSimple`, `getIdeaById`, `getFreeIdeas`, `getPaidPreviewIdeas`, `getRelatedIdeas`, `getIndustries`, `hasAccess`, …). Page size 24.
  - **Quirk:** the `ideas` table uses dotted column names (`"mrr_potential.min"`, `"suggested_price.amount"`, etc.) that must be quoted in `select`/`order`/filters. `mapRawIdea()` reassembles these flat columns into nested objects matching the `Idea` type in `src/types/index.ts`. When adding fields, update both the select string and the mapper.
  - Keyword data joined via `keyword_idea_mapping` → `keywords`; `primary_keyword` is derived by picking the highest `search_volume` keyword.

**Landing page** — `(marketing)/page.tsx` composes the **`components/landing/v3/`** section set (Hero, Strip, Objection, Methodology, SampleIdeas, Pricing, FAQ, etc.). This v3 set is the live one; older flat `components/landing/*` components and `PROJECT.md`'s listing predate it. Edit v3 for the current site.

**Pricing** is centralized in `src/lib/config.ts` (`PRICING`, currently $29 one-time). Checkout URL built in `src/lib/dodo.ts`.

**SEO** — dynamic `sitemap.ts`/`robots.ts`, per-idea metadata in `[id]/page.tsx`, JSON-LD via `components/seo/JsonLd.tsx` + `lib/structured-data.ts`. Note `vercel.json` sets `X-Robots-Tag: noindex, nofollow` site-wide (staging guard — remove before public launch).

**Imports** use `@/*` → `src/*`.
