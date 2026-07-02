# Mortava design tokens — rationale & provenance

The Mortava theme mirrors the design language of [cherre.com](https://cherre.com)
(Cherre — "Real estate data management made beautifully simple"). This file
explains *why* each token group is what it is, and how confident we are in
each value. The machine-readable sources of truth are
`../assets/mortava-theme.css` and `../assets/tokens.json`.

## Provenance legend

- **Verified** — confirmed from Cherre's public copy, page structure, or
  product positioning (search-indexed content).
- **Approximated** — reconstructed from familiarity with the site; the
  *relationship* between values (contrast, hierarchy, warmth of the accent)
  is right, exact hex/px may differ from the live site. Run
  `../scripts/extract-live-tokens.mjs` on an unrestricted machine to true up.

## Color

| Group | Provenance | Rationale |
|---|---|---|
| Ink navy (`#0B1023` family) | Approximated | Cherre frames pages with deep, slightly-blue near-black bands (hero + footer). Navy, not pure black — it reads "data platform," not "fashion brand." |
| White + cool gray surfaces | Verified pattern | Content sections alternate white and a cool very-light gray. The alternation *is* the elevation system — shadows stay whisper-quiet. |
| Cherry accent (`#E8404A`) | Approximated | The brand is literally named after cherries; the accent is a warm confident red, used only for CTAs, links, eyebrows, and data highlights. Discipline here is what makes the theme feel premium. |
| Text pair (light + inverse) | Approximated | Near-ink body text on light; off-white (not pure white) on dark to avoid glare. Muted variants sit ~45% toward the background. |
| Viz palette | Mortava's own | Cherre shows dashboards/graphs constantly; Mortava needs a categorical palette anchored by the accent. Slots 2–5 are cool counterweights so red keeps its "primary signal" role. |

## Typography

- **Display: Poppins 600** (approximated — Cherre uses a geometric/grotesque
  sans of this character). Large, semibold, tight leading (1.1), −2%
  tracking. Never bold-900; the confidence comes from size, not weight.
- **Body: Inter 400/500** at 17px, 1.65 line-height. Comfortable enterprise
  reading size.
- **Eyebrows**: 13px, uppercase, +12% tracking, accent-colored. Every major
  section opens with one (verified pattern — small label above headline).

Scale (verified pattern — few sizes, big jumps):
hero `clamp(40–68px)` → h2 `clamp(28–40px)` → h3 `22px` → body `17px` →
small `14px`.

## Shape & elevation

- Buttons: **full pills** (999px), verified pattern.
- Cards/media: 12–16px radius, 1px hairline border, very soft two-layer
  shadow. Screenshots sit in "media frames" with a floating shadow.
- Dark sections: cards use `ink-soft` + `ink-border`, **no shadows** (they
  don't read on dark).

## Layout & rhythm (verified pattern)

- 1200px container, generous gutters.
- Sections breathe: 96–128px vertical padding.
- **Dark bookends rule**: page = dark hero → alternating light sections →
  dark CTA band → dark footer. Never two adjacent dark sections mid-page.

## Motifs

- Thin-line **connected-node network graphs** (knowledge-graph imagery),
  dotted grids, and soft radial glows on dark backgrounds.
- Product screenshots > illustrations > photography. If photography is
  unavoidable, duotone it toward ink.
- The hero background is a subtle radial gradient (`--mx-gradient-hero`)
  rising from ink toward a bluer glow at the top-right — never a flat fill.

## Voice (verified)

Cherre's copy is short, assured, benefit-led: "made beautifully simple,"
"single source of truth," concrete numbers ("$3.3T AUM"). Mortava copy in
this theme should follow: eyebrow (category) → headline (outcome, ≤9 words)
→ one-sentence subcopy → CTA pair (primary "Book a demo"-style + ghost
secondary).
