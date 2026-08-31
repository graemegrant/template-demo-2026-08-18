# NEW-CLIENT-CHECKLIST.md

Start-to-launch checklist for a new client build. Works alongside
`CLIENT-ONBOARDING-TEMPLATE.md` (fill that in as you go),
`SANITY-SCHEMA.md`, `GIT-WORKFLOW.md`, and `AGENTS.md`.

## 1. Repo setup
- [ ] Create repo from `fable-template` via "Use this template"
- [ ] Add `template-upstream` remote (GIT-WORKFLOW.md §1)
- [ ] Confirm Node version matches `.nvmrc` locally and in Vercel project settings
- [ ] `npm install`, `npm run build` passes clean on the untouched template

## 2. Client identity
- [ ] Rewrite `hotel.config.ts` fully — no leftover demo values
- [ ] **NAP is real**: `location.street` / `locality` / `region` / `postalCode`
      and `contact.phone` / `contact.phoneHref` (E.164) must be the client's
      actual details, identical to what goes on Google Business Profile and
      every citation. Placeholder NAP that ships breaks local SEO and hotel
      rich results.
- [ ] `seo.descriptor` / `seo.locationLabel` set for this client (drive the
      homepage `<title>` and hero eyebrow)
- [ ] Re-skin the seven tokens in `lib/tokens.ts` (not `tailwind.config.ts` —
      it now reads from there, and so does OG-image generation)
- [ ] Copy `CLIENT-ONBOARDING-TEMPLATE.md` to `/docs/clients/[hotel-slug].md`, fill it in

## 3. CMS
- [ ] Create client's Sanity project, set env vars
- [ ] Confirm app still runs in static-fallback mode if Sanity vars are ever blank
- [ ] Populate all six collections (SANITY-SCHEMA.md) with real content
- [ ] Local Experiences content reflects real regional partnerships, not placeholder filler

## 4. Booking + email
- [ ] Set `NEXT_PUBLIC_BOOKING_ENGINE_URL` to the client's real booking engine
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain (canonicals, OG URLs,
      sitemap and JSON-LD all resolve against it — a wrong/blank value ships
      canonicals pointing at the template's fallback domain)
- [ ] Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from Search Console (no longer
      hardcoded in `app/layout.tsx`)
- [ ] Set `RESEND_API_KEY`, `CONTACT_FORM_TO`, `CONTACT_FORM_FROM`
- [ ] Test the contact form end-to-end (real email arrives)
- [ ] Add `SANITY_PROJECT_ID` and a dedicated read-only `SANITY_API_TOKEN`
      as GitHub repo secrets (Settings → Secrets and variables → Actions)
      so `.github/workflows/sanity-backup.yml` can run
- [ ] Fill in "Access & ownership" in `docs/clients/[hotel-slug].md`
      (SECURITY.md §4) — don't leave this implicit

## 5. Guardrails verification
- [ ] `npm run lint` passes — no inline hex, no arbitrary Tailwind values
- [ ] `npm run build` passes with ESLint enabled (not `ignoreDuringBuilds`)
- [ ] `tsc --noEmit` exits 0
- [ ] `.github/workflows/guardrails.yml` CI check is green on the repo's `main` branch
- [ ] Only `package-lock.json` is present — no `pnpm-lock.yaml`, no stray install log files
- [ ] CRO elements untouched: `BookButton`, `BookingModal`, `MobileBookBar`, `TrustStrip`
- [ ] JSON-LD, `sitemap.ts`, `robots.ts` still correct for the new domain

## 6. Real photography
- [ ] All Unsplash/placeholder images swapped for the client's own photography
- [ ] `next.config.ts` `remotePatterns` updated if new image hosts are used
- [ ] `imageAlt` set on rooms / experiences / journal posts in Sanity where the
      auto-generated fallback isn't descriptive enough

## 7. Deploy
- [ ] Vercel project created, env vars set, domain connected
- [ ] Confirm Vercel's GitHub integration is connected (gives free PR preview deployments — see MAINTENANCE.md)
- [ ] Set up free uptime monitoring (UptimeRobot / Better Uptime) against the live domain — MAINTENANCE.md, "Uptime monitoring"
- [ ] Tag `v1.0.0` at launch (GIT-WORKFLOW.md §5)
- [ ] Add a line to `fable-template`'s `CHANGELOG.md` only if this build
      surfaced a template-level fix worth cherry-picking back

## 8. Handoff
- [ ] `docs/clients/[hotel-slug].md` fully filled in (this is the record
      of everything that varies for this client, for whoever touches the
      repo next)

---

**This checklist is designed, not yet validated** — the first real
client build should be treated as a test of this process, and this file
should be corrected afterward based on what actually happened.
