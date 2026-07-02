---
name: mortava-theme
description: >-
  Mortava's visual design system, modeled on the look and feel of cherre.com
  (dark-ink enterprise data-platform aesthetic with a single warm accent).
  Use this skill whenever building, styling, or reviewing ANY Mortava web
  UI — landing pages, marketing sections, dashboards, emails — so the output
  matches the Mortava theme. Covers colors, typography, spacing, components,
  and page blueprints.
---

# Mortava Theme

Mortava's web identity mirrors the feel of **cherre.com** (Cherre, the real
estate data platform): a calm, premium, enterprise-data aesthetic — deep
ink-navy hero and footer bands, generous white sections in between, one warm
"cherry" accent used sparingly for CTAs and highlights, fine connected-node
line art as the signature motif, and confident, plain-spoken copy
(Cherre's own tagline: "Real estate data management made beautifully simple").

## How to use this skill

1. Load the design tokens from `assets/mortava-theme.css` (CSS custom
   properties) or `assets/tokens.json` (for Tailwind/JS config). Never
   hard-code colors or radii — always reference tokens.
2. Follow the component recipes in `references/components.md` for nav,
   buttons, cards, section bands, stat rows, and footer.
3. When composing a full page, follow `references/page-blueprints.md` for
   section order and rhythm.
4. For the complete token rationale (and which values are verified vs.
   approximated), see `references/design-tokens.md`.
5. To see the theme in action, open `assets/preview.html` — a self-contained
   Mortava landing page built entirely from the tokens.

## The five rules that make it feel right

1. **Dark bookends, light middle.** Hero and footer sit on ink-navy
   (`--mx-ink`); the content between alternates white and cool-gray
   (`--mx-surface` / `--mx-surface-alt`) sections. Never stack two dark
   sections mid-page.
2. **One accent, used like punctuation.** Cherry red (`--mx-accent`) appears
   only on primary CTAs, active states, small labels/eyebrows, and data
   highlights. If a screen is more than ~5% accent, pull back.
3. **Big quiet type.** Headlines are large (clamp 40–68px), semibold not
   black, tight leading (~1.1), slight negative tracking. Body is 17–18px at
   1.6–1.7 line-height. Lots of air: sections pad 96–128px vertically.
4. **Rounded but grown-up.** Buttons are full pills (999px). Cards are
   14–16px radius with hairline borders and very soft shadows — depth comes
   from background alternation, not heavy elevation.
5. **Connected-node motif.** Decorative art is thin-line network graphs,
   dotted grids, and subtle radial glows on dark backgrounds — evoking a
   knowledge graph. No stock photography of buildings or handshakes.

## Quick token reference

| Token | Value | Use |
|---|---|---|
| `--mx-ink` | `#0B1023` | Dark section bg, footer, headings-on-light |
| `--mx-ink-soft` | `#151B36` | Cards/elevated surfaces on dark |
| `--mx-surface` | `#FFFFFF` | Default page background |
| `--mx-surface-alt` | `#F5F6FA` | Alternating light sections |
| `--mx-accent` | `#E8404A` | Primary CTA, links, highlights |
| `--mx-accent-strong` | `#C82F3D` | CTA hover/pressed |
| `--mx-text` | `#171C30` | Body text on light |
| `--mx-text-muted` | `#5B6178` | Secondary text on light |
| `--mx-text-inverse` | `#F7F8FC` | Body text on dark |
| `--mx-text-inverse-muted` | `#A7AEC8` | Secondary text on dark |
| `--mx-border` | `#E4E7F0` | Hairline borders, dividers |
| `--mx-radius-card` | `16px` | Cards, media frames |
| `--mx-radius-pill` | `999px` | All buttons, tags |
| Headings font | `Poppins` (600) | Fallback: system-ui geometric sans |
| Body font | `Inter` (400/500) | Fallback: system-ui |

## Fidelity note

cherre.com is bot-protected, so these tokens were reconstructed from
research and memory of the site rather than scraped computed styles. The
*structure* (section order, tagline, positioning, component inventory) is
verified; exact hex/font values are close approximations. To true them up
against the live site, run `scripts/extract-live-tokens.mjs` on a machine
with open internet (see the script header for usage) and paste its output
into `assets/tokens.json` + `assets/mortava-theme.css`. These are Mortava's
tokens — inspired by Cherre's feel, free to drift as the brand matures.
