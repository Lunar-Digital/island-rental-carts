# AGENTS.md

## Cursor Cloud specific instructions

**Product**: Island Rental Carts — a static Next.js 16 (App Router) marketing site for a golf cart rental business on Daufuskie Island, SC. No backend, no database, no API. All booking CTAs link to an external Peek.com widget.

### Running the app

- **Dev server**: `npm run dev` (port 3000)
- **Build**: `npm run build`
- **Lint**: `npm run lint` (ESLint 9 with `eslint-config-next`)
- See `package.json` scripts and `README.md` for standard commands.

### Environment variables

- Copy `.env.example` to `.env.local` before first run. The only variable is `NEXT_PUBLIC_SITE_URL` (controls metadata/sitemap; defaults safely).

### Notes

- There are no automated tests in this project (no test script or test framework configured).
- The newsletter signup form is client-side only (no backend integration yet); it shows a success message without making a network request.
- Node.js 22+ and npm 10+ are compatible with the project's Next.js 16 / React 19 stack.
