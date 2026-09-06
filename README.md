# Kabir Narula — Engineering Ledger

Personal portfolio. Next.js 14 App Router, strict TypeScript, Tailwind with
bespoke OKLCH design tokens (warm alabaster / matte graphite / oxidized
copper), light + dark registers, zero default palette colors.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Contact form email (Resend)

The form works out of the box in **mock mode** (submissions logged server-side,
always succeeds). To deliver real email:

1. Create a free key at [resend.com](https://resend.com).
2. Copy `.env.example` → `.env.local` and paste the key (already done locally;
   only `RESEND_API_KEY` is empty).
3. Redeploy / restart. The provider switches automatically — no code change.

For Vercel: add the same three variables in **Project → Settings →
Environment Variables**.

## Structure

- `app/` — routes, global tokens (`globals.css`), OG image, icon
- `components/` — header/hero/case studies/proof pane/arch circuit/visuals
- `lib/` — resume data, project data, validation, email provider
- `public/shots/` — real app screenshots from each project's own README
- `public/Kabir_Narula_Resume.pdf` — downloadable résumé

## Principles

- No fabricated UI — schematics are labeled as schematics.
- Every claim links to a public repository and a named source file.
- Reduced-motion safe; keyboard accessible; print stylesheet included.
