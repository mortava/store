# Mortava page blueprints

Section orders mirror cherre.com's marketing-site rhythm. Components are
defined in `components.md`.

## Landing / home

1. **Nav** — sticky white.
2. **Hero** — dark gradient, centered copy, CTA pair, product screenshot in
   a floating media frame overlapping the section boundary below.
3. **Logo strip** — white, grayscale customer logos.
4. **Value pillars** — alt-gray, 3-up cards (eyebrow above the grid:
   "Why Mortava").
5. **Feature deep-dives** — 2–3 alternating two-column sections, white.
6. **Stat band** — dark.
7. **Testimonial / case-study** — white, single large quote or 3-up cards.
8. **Resources** — alt-gray, 3-up cards (blog/guides), "View all →" link.
9. **CTA band** — dark, centered.
10. **Footer** — dark.

## Product page

Nav → dark hero (left-aligned copy + right media frame) → logo strip →
"how it works" 3-step row (numbered, accent numerals) → alternating feature
sections → integration/logo grid on alt-gray → CTA band → footer.

## About page

Nav → **light** hero (white bg — the one page allowed a light hero; keeps
its dark bookend via the footer) → mission statement as an oversized
`mx-h2` paragraph → stat band (dark) → team grid (cards, duotone-ink
portraits) → values 3-up on alt-gray → CTA band → footer.

## Blog / resource index

Nav → compact dark band (h2-scale title + one-line description, ~50% hero
padding) → filter tags as ghost pills (active = accent) → 3-up card grid,
paginated → newsletter CTA band → footer.

## Dashboard / app shell (product UI)

- Light chrome: white top bar, `--alt` left rail, content on white.
- Accent only for: active nav item, primary action button, selected states,
  and viz series 1.
- Cards for every panel (`mx-card`, tighter 1.25rem padding).
- Charts use the `viz` palette in order; gridlines `--mx-border`; axis text
  `--mx-text-muted` at `--mx-text-small`.
- Dark mode = invert to ink surfaces using the `ink`/`ink-soft`/`ink-border`
  and inverse-text tokens; accent unchanged.

## Email

Single 600px column, white on `--alt` background, logo top-left, pill CTA,
ink footer block with muted legal text. System font fallbacks only.
