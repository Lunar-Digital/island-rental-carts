# Island Rental Carts — Cursor AI Rules

## Project

Single-page marketing site for Island Rental Carts (Daufuskie Island, SC golf cart rentals). Next.js 14+ App Router, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide React. Deploy target: Vercel.

## Architecture

- App Router in `src/app/`
- Components in `src/components/` (flat — no nested folders)
- shadcn/ui primitives in `src/components/ui/`
- Utilities in `src/lib/`
- Static assets in `public/`
- Reference code (read-only) in `_figma_make_reference/`

## Conventions

- All components are `.tsx` files with named exports
- Use `"use client"` only when the component uses hooks, event handlers, or browser APIs
- Server Components by default
- Tailwind utility classes for all styling — no CSS modules, no styled-components
- Brand colors: `brand-950`, `brand-900`, `brand-800`, `brand-700`, `lime` (accent), `lime-50` (light BG)
- System font stack only — NO Google Font imports
- shadcn/ui components for: Button, Card, Accordion, Input, Badge, Sheet
- Lucide React for all icons
- Framer Motion for animations (logo entrance, scroll reveals, mobile menu, back-to-top)
- Next.js `<Image>` for all images (not `<img>`)
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<address>`, `<ul>/<li>`
- One `<h1>` per page, strict heading hierarchy (h1 → h2 → h3)
- All sections get `aria-label` attributes
- All interactive elements get `focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2`

## Content

- ALL copy comes from V0_PROMPT_CLEAN.md — use verbatim, no placeholders
- Phone: (843) 368-1345
- Email: Paul@IslandRentalCarts.com
- Peek booking URL: `https://book.peek.com/s/294fd13d-ac87-4e1e-a261-2e2f2fce106b/p_3v4x5x--6905892e-9e85-4c20-8fe3-e12fa58b9857?mode=standalone`
- Logo text: "IRC" (not "IR")

## Do NOT

- Add dark mode, language switcher, or unspecified features
- Use placeholder/lorem ipsum text
- Mention "The Sportsman Pub" or meal discounts
- Load Google Fonts
- Use `<div>` where semantic elements apply
- Skip JSON-LD structured data
