# Mortava component recipes

All classes come from `../assets/mortava-theme.css`. Wrap the page in
`.mx-page`. `../assets/preview.html` renders every recipe below.

## Navigation bar

Sticky, white with blur, hairline bottom border. Logo left, links center,
CTA pill right.

```html
<nav class="mx-nav">
  <div class="mx-container" style="display:flex;align-items:center;gap:2.5rem;height:72px;">
    <a href="/" style="font-family:var(--mx-font-display);font-weight:600;font-size:1.25rem;color:var(--mx-ink);">mortava<span style="color:var(--mx-accent);">.</span></a>
    <div style="display:flex;gap:2rem;margin-left:auto;">
      <a href="#">Products</a> <a href="#">Solutions</a>
      <a href="#">Resources</a> <a href="#">Company</a>
    </div>
    <a class="mx-btn mx-btn--primary" href="#">Book a demo</a>
  </div>
</nav>
```

Rules: nav links get accent color on hover only. On pages with a dark hero,
the nav stays white — the contrast seam is part of the look.

## Hero (dark)

Eyebrow → ≤9-word headline → one-sentence subcopy → CTA pair. Optional
media frame (product screenshot) below or right.

```html
<header class="mx-section mx-section--dark mx-section--hero">
  <div class="mx-container" style="max-width:820px;text-align:center;">
    <p class="mx-eyebrow">Data platform</p>
    <h1 class="mx-h1">Your data, made beautifully simple</h1>
    <p style="font-size:var(--mx-text-body-lg);color:var(--mx-text-inverse-muted);margin:1.25rem 0 2rem;">
      Mortava unifies every source into a single, trusted foundation.
    </p>
    <div style="display:flex;gap:0.75rem;justify-content:center;">
      <a class="mx-btn mx-btn--primary" href="#">Book a demo</a>
      <a class="mx-btn mx-btn--ghost" href="#">Explore the platform</a>
    </div>
  </div>
</header>
```

## Logo strip ("trusted by")

Directly under the hero, on white: a muted uppercase micro-label plus a
single row of grayscale logos at ~60% opacity. Never colored logos.

## Feature section (alternating two-column)

Light section, 2 columns (text 5/12, visual 7/12). Alternate text-left /
text-right down the page. Text column: eyebrow, `mx-h2`, one paragraph,
`mx-link` "Learn more →". Visual column: `.mx-media-frame` screenshot or a
node-graph illustration.

## Stat band

Dark section, 3–4 stats in a row. `mx-stat-value` (accent) over
`mx-stat-label` (muted). Stats must be concrete ("$3.3T style" — real
numbers, units, no vague "many").

```html
<section class="mx-section mx-section--dark">
  <div class="mx-container" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;text-align:center;">
    <div><div class="mx-stat-value">1.2B</div><div class="mx-stat-label">records unified</div></div>
    <div><div class="mx-stat-value">99.98%</div><div class="mx-stat-label">pipeline uptime</div></div>
    <div><div class="mx-stat-value">4 wks</div><div class="mx-stat-label">to full onboarding</div></div>
  </div>
</section>
```

## Cards (features, resources, testimonials)

`.mx-card` in a 3-up grid on `--alt` sections. Structure: small icon or
tag → `mx-h3` → 2-line description → optional `mx-link`. Testimonial cards:
quote, then name/title/company in muted small text. No avatars required.

## CTA band

Second-to-last section, dark, centered: `mx-h2` + one CTA pair. This is the
only dark section other than hero/footer.

## Footer

Dark ink, 4–5 columns of muted links under white column headings, logo +
one-liner left, legal row at the bottom separated by an `--mx-ink-border`
hairline. Social icons monochrome muted, accent on hover.

## Forms & inputs

Inputs: white bg, `--mx-border` 1px, 10px radius (slightly squarer than
cards), 12px×16px padding; focus = accent border + `--mx-focus-ring`
outline. Labels small/muted above the field. Primary submit is always a
pill `mx-btn--primary`.

## Don'ts

- No accent-colored backgrounds for whole sections (accent is punctuation).
- No pure black (`#000`) anywhere; ink navy only.
- No heavy drop shadows or gradients on light sections.
- No more than one primary CTA visible per viewport.
- No stock photos; product UI and line-art motifs carry the visuals.
