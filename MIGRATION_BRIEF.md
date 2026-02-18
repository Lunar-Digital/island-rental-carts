# Island Rental Carts — Next.js Migration Brief

> **For the Cursor AI agent:** Read this entire file, then execute the migration plan phase by phase. All context you need is here. Ask the user before proceeding to each new phase.

---

## Project Overview

**What we're building:** A production-ready, SEO-optimized marketing homepage for Island Rental Carts — a golf cart rental business on Daufuskie Island, South Carolina.

**Source code:** The `_figma_make_reference/` directory in this project contains the original Figma Make output (React + Vite + Tailwind CSS v4). This is our visual reference — the Next.js site must match its design with 100% fidelity while adding a full SEO layer.

**Target:** Next.js 14+ App Router site deployed to Vercel.

**GitHub repo:** `https://github.com/Lunar-Digital/island-rental-carts`

---

## Reference Files (in the Obsidian vault — read by absolute path)

| File | Path | What It Contains |
|---|---|---|
| SEO Report | `/Users/edmerino/Nextcloud/Obsidian Vault 1/Projects-work/Island Rental Carts/SEO_KEYWORD_COMPETITION_REPORT.md` | Keyword targets, competitor analysis, schema requirements, content strategy, technical SEO priorities |
| V0 Prompt (full spec) | `/Users/edmerino/Nextcloud/Obsidian Vault 1/Projects-work/Island Rental Carts/V0_PROMPT_CLEAN.md` | Exact copy for all 10 sections, color palette, component mapping, interactions, constraints — this is the definitive content spec |
| Content Extraction | `/Users/edmerino/Nextcloud/Obsidian Vault 1/Projects-work/Island Rental Carts/MOCKUP_CONTENT_EXTRACTION.md` | Extracted content from Figma mockup (supplementary to V0_PROMPT_CLEAN.md) |
| V0 Production Prompt | `/Users/edmerino/Nextcloud/Obsidian Vault 1/Projects-work/Island Rental Carts/V0_PROMPT_PRODUCTION.md` | Contains follow-up iteration prompts (Rounds 1-5) useful for polish phases |

---

## Figma Make Code Assessment

The `_figma_make_reference/` code has been reviewed. Here is the assessment:

**Grade: B+ — worth migrating, not rebuilding from scratch.**

**Strengths (reuse these):**
- Clean Tailwind CSS utility classes for all styling — colors, spacing, typography, responsive breakpoints
- 9 well-named components: Navbar, Hero, RentalOptions, Testimonials, HowItWorks, Credibility, FAQ, EmailSignup, Footer
- Custom `LayeredWave.tsx` SVG component for smooth section transitions (green hills)
- Framer Motion animations for mobile menu and FAQ accordion
- Lucide React icons throughout
- Good responsive design: mobile hamburger menu, responsive grids, `md:` and `lg:` breakpoint utilities
- Real content (not lorem ipsum): pricing data, FAQ Q&As, testimonial quotes
- TypeScript throughout

**Weaknesses (fix during migration):**
- **Framework:** React + Vite, not Next.js — needs App Router, `<Image>`, metadata API
- **Heading hierarchy broken:** Uses `<h3>` for section headings where `<h2>` should be, `<h4>` where `<h3>` should be
- **Missing semantic HTML:** No `<header>` wrapper, no `aria-label` on sections, no `<address>` in footer, no `<nav aria-label="Footer navigation">`
- **Logo says "IR"** — should be "IRC"
- **Phone is placeholder** `(555) 123-4567` — should be `(843) 368-1345`
- **No email** in footer — need `Paul@IslandRentalCarts.com`
- **FAQ has only 4 questions** — need 8 with SEO-optimized answers
- **Credibility section says "monthly rates"** — should say "free island-wide delivery"
- **No JSON-LD schemas** (LocalBusiness, Product, FAQPage)
- **No Next.js metadata** (title, description, Open Graph, canonical)
- **No production files** (robots.ts, sitemap.ts, not-found.tsx, favicon)
- **No skip-to-content link**
- **No back-to-top button**
- **No newsletter form states** (validation, submitting, success)
- **No sticky nav shadow on scroll**
- **Images use `<img>`** with external URLs (Unsplash, filepicker.io) — need Next.js `<Image>` with local placeholders
- **Hero uses `import from 'figma:asset/...'`** — Figma-specific import, won't work in Next.js
- **Peek URLs use `http://`** — should be `https://`, and need `target="_blank"` + `rel="noopener noreferrer"`
- **External texture URLs** (transparenttextures.com) — remove or replace with CSS
- **Price table uses grid divs** — should be semantic `<table>`
- **58 unused shadcn/ui components** in `ui/` directory
- **Massive unused dependencies** in package.json (Material-UI, React Router, React Hook Form, recharts, etc.)
- **Missing `fonts.css`** (imported in index.css but file doesn't exist)

---

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** (`.tsx` files)
- **Tailwind CSS** (v3 or v4, whichever Next.js scaffolds — configure brand tokens either way)
- **shadcn/ui** components: Button, Card, Accordion, Input, Badge, Sheet
- **Lucide React** for icons
- **Framer Motion** for animations (logo entrance, scroll reveals, back-to-top, mobile menu)
- **Font:** Tailwind default `font-sans` system stack — NO Google Font imports
- **Deploy target:** Vercel

---

## Color Palette (define in Tailwind config)

| Token | Hex | Usage |
|---|---|---|
| `brand-950` | `#022c22` | Hero BG, nav bar, footer — darkest green |
| `brand-900` | `#042f2e` | Dark overlay variant, subtle depth |
| `brand-800` | `#064e3b` | Testimonials BG, Why Choose Us BG, newsletter BG, pricing card dark variants |
| `brand-700` | `#065f46` | Borders on dark sections, hover states, divider accents |
| `lime` | `#a3e635` | ALL buttons, badges, checkmarks, step numbers, accent text |
| `lime-50` | `#f3fce3` | Light green-tinted section backgrounds |
| `gray-100` | `#f3f4f6` | Card backgrounds, input fields |
| `gray-200` | `#e5e7eb` | Borders, dividers on light sections |
| `white` | `#ffffff` | Text on dark backgrounds, primary card backgrounds |
| `black` | `#000000` | Minimal use — deep text |

---

## shadcn/ui Component Mapping

| UI Element | shadcn/ui Component | Notes |
|---|---|---|
| All CTA buttons | `<Button>` | `variant="default"` with lime background override |
| Pricing cards | `<Card>`, `<CardHeader>`, `<CardContent>`, `<CardFooter>` | |
| FAQ accordion | `<Accordion>`, `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>` | `type="single"`, `collapsible` |
| Newsletter email input | `<Input>` | |
| Mobile nav menu | `<Sheet>`, `<SheetTrigger>`, `<SheetContent>` | Slide-in from right |
| Price table | Native HTML `<table>` | Semantic `<table>` for SEO — NOT a shadcn component |
| Badges | `<Badge>` | |
| Feature checkmarks | Lucide `<CheckCircle>` | In lime color |

---

## Component Migration Map

| Figma Make File | Next.js File | Key Changes |
|---|---|---|
| `Navbar.tsx` | `components/Header.tsx` | Wrap in `<header>`, add `<nav aria-label="Main navigation">`, logo "IR" → "IRC" with Framer Motion entrance animation, add skip-to-content link, add shadow-md on scroll state, use shadcn Sheet for mobile menu |
| `Hero.tsx` | `components/Hero.tsx` | Fix heading to `<h1>`, replace figma:asset import, add `priority` loading, use Next.js `<Image>` |
| `RentalOptions.tsx` | `components/CartFeatures.tsx` + `components/PricingSection.tsx` | **Split into two components.** Fix heading hierarchy (h3 → h2). Price table uses semantic `<table>`. Add "Best Value" Badge on weekly row |
| `Testimonials.tsx` | `components/Testimonials.tsx` | Keep carousel logic. Replace Unsplash avatar URLs with local placeholders. Keep disclaimer text |
| `HowItWorks.tsx` | `components/HowItWorks.tsx` | Fix heading (h3 → h2, h4 → h3). Expand step descriptions with SEO keywords from spec |
| `Credibility.tsx` | `components/WhyChooseUs.tsx` | Fix "monthly rates" → "free island-wide delivery". Update body copy to exact spec text. Replace external image URL |
| `FAQ.tsx` | `components/FAQ.tsx` | Expand from 4 to 8 questions using SEO-optimized answers from V0_PROMPT_CLEAN.md. Replace custom accordion with shadcn Accordion. Fix heading (h3 → h2) |
| `EmailSignup.tsx` | `components/Newsletter.tsx` | Add form states (validating, submitting, success). Use shadcn Input + Button. Add error message display |
| `Footer.tsx` | `components/Footer.tsx` | Add `<address>` tag, `<nav aria-label="Footer navigation">`, real phone `(843) 368-1345` with tel: link, email `Paul@IslandRentalCarts.com` with mailto: link, logo "IRC" |
| `ui/LayeredWave.tsx` | `components/WaveDivider.tsx` | Direct port, rename for clarity |
| *(new)* | `components/BackToTop.tsx` | Floating button, appears after scrolling past hero, Lucide ArrowUp, lime BG, smooth scroll to top |
| *(new)* | `components/JsonLd.tsx` | LocalBusiness + Product + FAQPage schemas |

---

## Page Composition (`app/page.tsx`)

```tsx
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { CartFeatures } from "@/components/CartFeatures"
import { PricingSection } from "@/components/PricingSection"
import { Testimonials } from "@/components/Testimonials"
import { HowItWorks } from "@/components/HowItWorks"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { FAQ } from "@/components/FAQ"
import { Newsletter } from "@/components/Newsletter"
import { Footer } from "@/components/Footer"
import { BackToTop } from "@/components/BackToTop"
import { JsonLd } from "@/components/JsonLd"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CartFeatures />
        <PricingSection />
        <Testimonials />
        <HowItWorks />
        <WhyChooseUs />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
      <JsonLd />
    </>
  )
}
```

---

## SEO Requirements

**Metadata** (in `app/layout.tsx`):
- Title: `Daufuskie Island Golf Cart Rentals | Island Rental Carts – $65/Day`
- Description: `Rent 4-seater electric golf carts on Daufuskie Island, SC. Starting at $65/day with free island-wide delivery. Book online in 2 minutes via Peek. Locally owned.`
- Keywords: `daufuskie island golf cart rental, golf cart rental daufuskie island, daufuskie island rentals, electric golf cart daufuskie, daufuskie island transportation`
- Canonical: `https://islandrentalcarts.com`
- Robots: index, follow
- Open Graph: title, description, url, siteName, type, locale
- Icons: favicon.ico, apple-touch-icon.png

**JSON-LD Schemas** (in `components/JsonLd.tsx`):
1. **LocalBusiness** — name, description, url, telephone `+1-843-368-1345`, email, address (Daufuskie Island, SC), geo (32.1, -80.87), hours (Mon-Sun 8am-6pm), priceRange `$65–$400`
2. **Product** — 4-Seater Electric Golf Cart Rental, AggregateOffer lowPrice 65, highPrice 400, USD, offerCount 7
3. **FAQPage** — all 8 FAQ questions and full answers

**Heading Hierarchy:**
```
h1: Daufuskie Island Golf Cart Rentals (Hero — ONE per page)
  h2: 4-Seater Electric Carts (Cart Features)
  h2: Choose Your Duration (Pricing)
    h3: Daily Rental
    h3: Weekly Special
    h3: Complete Price List
  h2: How It Works
    h3: Book Online
    h3: Pickup at Ferry
    h3: Explore the Island
  h2: Your Trusted Island Transportation (Why Choose Us)
  h2: Have Questions? (FAQ)
  h2: Get Island Updates (Newsletter)
```

**Semantic HTML:**
- `<header>` for nav, `<main>` wrapping content, `<section>` with `aria-label` for each block, `<footer>`, `<nav aria-label="...">` for both header and footer nav, `<ul>`/`<li>` for lists, `<address>` for contact info

**Image Alt Text:**
- Hero: `alt="Electric golf cart on a sandy road on Daufuskie Island, South Carolina"`
- Cart photo: `alt="4-seater electric golf cart available for daily rental on Daufuskie Island"`
- About photo: `alt="Island Rental Carts golf cart parked on a tree-lined Daufuskie Island road"`
- Step 1: `alt="Book your Daufuskie Island golf cart online"`
- Step 2: `alt="Pick up your golf cart at the Daufuskie Island ferry dock"`
- Step 3: `alt="Explore Daufuskie Island beaches and landmarks by golf cart"`

---

## Production Files to Generate

- `app/not-found.tsx` — branded 404 page (brand-950 BG, IRC logo, "Page Not Found" heading, "Back to Homepage" button in lime)
- `app/robots.ts` — allow all crawlers, sitemap at `https://islandrentalcarts.com/sitemap.xml`
- `app/sitemap.ts` — homepage URL with today's date as lastModified
- `app/icon.tsx` — dynamic favicon using Next.js ImageResponse (IRC monogram, dark green BG, lime text)

---

## Interactions & Behavior

- **Sticky nav:** shadow-md when scrolled past hero, brand-950 background
- **Smooth scroll:** `scroll-behavior: smooth` on `<html>`, `scroll-padding-top: 80px` for sticky header offset
- **FAQ accordion:** shadcn `Accordion` with `type="single"`, `collapsible`, first item expanded by default
- **Newsletter form states:** default → validating (red error) → submitting (spinner, disabled) → success (green message)
- **All Book Now buttons:** Link to `https://book.peek.com/s/294fd13d-ac87-4e1e-a261-2e2f2fce106b/p_3v4x5x--6905892e-9e85-4c20-8fe3-e12fa58b9857?mode=standalone`, open in new tab
- **Hover states:** Buttons `hover:brightness-90`, cards `hover:shadow-lg hover:-translate-y-1 transition-all duration-200`
- **Focus states:** `focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2` on all interactive elements
- **Back to top:** Floating button, bottom-right, appears after scrolling past hero, lime BG, brand-950 ArrowUp icon, smooth scroll to top
- **Section reveal animations:** Framer Motion fade-up on viewport entry, 300ms, subtle
- **Phone:** `<a href="tel:+18433681345">` click-to-call
- **Email:** `<a href="mailto:Paul@IslandRentalCarts.com">`
- **Skip-to-content:** `<a href="#rentals" class="sr-only focus:not-sr-only ...">Skip to main content</a>` as first focusable element

---

## Constraints

**DO:**
- Match `_figma_make_reference/` design exactly for layout, spacing, visual feel
- Use exact hex color values from the palette above
- Prioritize mobile experience (most users on phones)
- Use ALL content verbatim from V0_PROMPT_CLEAN.md — no placeholder text
- Split into modular component files
- Use Next.js `<Image>` for all images
- Use semantic HTML throughout

**DO NOT:**
- Use placeholder or lorem ipsum text
- Skip JSON-LD structured data
- Use `<div>` soup — use semantic elements
- Add dark mode toggle, language switcher, or unspecified features
- Mention "The Sportsman Pub" or any meal discount
- Load Google Fonts
- Reuse Figma Make's component names or ui/ directory structure

---

## Manual Setup (the user must do these — the agent cannot)

### 1. Install VS Code Extensions

In the new Cursor window, press `Cmd+Shift+X` to open Extensions, then search for and install:

- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) — autocomplete for Tailwind classes, hover previews, invalid class linting
- **ESLint** (`dbaeumer.vscode-eslint`) — catches code quality issues in real-time
- **Prettier - Code formatter** (`esbenp.prettier-vscode`) — consistent formatting on save
- **Error Lens** (`usernamehw.errorlens`) — shows errors/warnings inline next to the code

### 2. Add Documentation URLs to Cursor

Go to **Cursor Settings > Features > Docs** and add these URLs so the agent can reference them with `@Docs`:

- `https://nextjs.org/docs`
- `https://ui.shadcn.com`
- `https://tailwindcss.com/docs`
- `https://www.framer.com/motion/`

### 3. Before Launch (not needed for development)

- Replace placeholder images in `/public` with real photos from the client (actual carts, ferry dock, island roads)
- Replace placeholder testimonials with real customer reviews
- Set up Google Analytics 4 + Google Search Console
- Claim and optimize Google Business Profile
- Connect custom domain `islandrentalcarts.com` in Vercel
- Set up Mailchimp/ConvertKit for the newsletter form backend

---

## What the Agent Handles Automatically

These will be created during Phase 1 — no manual action needed:

- `.cursor/rules/nextjs.md` — project-level AI rules (conventions, patterns, constraints)
- `.vscode/settings.json` — format on save, Prettier as default formatter, tab size 2
- ESLint + Prettier config files
- `tsconfig.json` with strict mode (comes with Next.js scaffolding)
- `.gitignore` (comes with Next.js scaffolding)
- All npm dependency installs
- shadcn/ui initialization and component installs
- Git init and remote connection to GitHub

---

## Execution Phases

### Phase 1: Scaffold and Configure
- `npx create-next-app@latest .` with TypeScript, Tailwind, App Router, src/ directory
- Configure `tailwind.config.ts` with brand color palette
- Install deps: `framer-motion`, `lucide-react`
- Init shadcn/ui, add: Button, Card, Accordion, Input, Badge, Sheet
- Create `.cursor/rules/nextjs.md` project rules
- Create `.vscode/settings.json`
- `git init`, connect to `https://github.com/Lunar-Digital/island-rental-carts`

### Phase 2: Migrate Components
- 2a: Header + Hero
- 2b: CartFeatures + PricingSection (split from RentalOptions)
- 2c: Testimonials + HowItWorks
- 2d: WhyChooseUs + FAQ (expand to 8 Qs)
- 2e: Newsletter + Footer
- 2f: WaveDivider + BackToTop + JsonLd
- 2g: Compose in app/page.tsx

### Phase 3: SEO Layer
- Metadata in layout.tsx
- Verify heading hierarchy
- Add aria-labels to all sections

### Phase 4: Production Files
- not-found.tsx, robots.ts, sitemap.ts, icon.tsx

### Phase 5: Verify and Ship
- Run dev server, verify all sections
- Initial commit and push to GitHub

---

## Content Spec

For the **exact verbatim content** for all 10 sections (headings, body text, FAQ answers, pricing, testimonials, footer), read:

```
/Users/edmerino/Nextcloud/Obsidian Vault 1/Projects-work/Island Rental Carts/V0_PROMPT_CLEAN.md
```

This is the definitive content source. Use every word exactly as written. The FAQ section has 8 full questions with expanded SEO-optimized answers. The pricing table has all 7 tiers. All section headings, subheadings, badge labels, button text, and footer copy are specified verbatim.
