/**
 * extract-live-tokens.mjs
 *
 * Captures the real computed design values from https://cherre.com/ so the
 * approximated tokens in ../assets/tokens.json can be trued up.
 *
 * Run this on a machine with open internet access (cherre.com is
 * bot-protected and unreachable from sandboxed CI/agent environments):
 *
 *   npm i playwright && npx playwright install chromium
 *   node extract-live-tokens.mjs > cherre-live-tokens.json
 *
 * Then compare the output against ../assets/tokens.json and update any
 * values that differ meaningfully (colors, font families, radii). Keep
 * Mortava's own naming — only the values change.
 */
import { chromium } from "playwright";

const URL = "https://cherre.com/";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

const data = await page.evaluate(() => {
  const styleOf = (el, props) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    return Object.fromEntries(props.map((p) => [p, cs.getPropertyValue(p)]));
  };
  const pick = (sel) => document.querySelector(sel);

  // Every CSS custom property declared on :root
  const rootVars = {};
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; } // cross-origin
    for (const rule of rules) {
      if (rule.selectorText === ":root" || rule.selectorText === "html") {
        for (const name of rule.style) {
          if (name.startsWith("--")) rootVars[name] = rule.style.getPropertyValue(name).trim();
        }
      }
    }
  }

  // Most-used colors across the page, by area-weighted frequency
  const colorCount = {};
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    for (const prop of ["color", "background-color", "border-top-color"]) {
      const v = cs.getPropertyValue(prop);
      if (v && !v.includes("0, 0, 0, 0")) colorCount[v] = (colorCount[v] || 0) + 1;
    }
  }
  const topColors = Object.entries(colorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const btn = [...document.querySelectorAll("a,button")].find((e) =>
    /demo|contact|get started/i.test(e.textContent || "")
  );

  return {
    title: document.title,
    rootVars,
    topColors,
    body: styleOf(document.body, ["font-family", "font-size", "line-height", "color", "background-color"]),
    h1: styleOf(pick("h1"), ["font-family", "font-size", "font-weight", "line-height", "letter-spacing", "color"]),
    h2: styleOf(pick("h2"), ["font-family", "font-size", "font-weight", "letter-spacing", "color"]),
    primaryButton: btn
      ? {
          text: btn.textContent.trim(),
          ...styleOf(btn, ["background-color", "color", "border-radius", "padding", "font-size", "font-weight", "border"]),
        }
      : null,
    nav: styleOf(pick("header, nav"), ["background-color", "position", "border-bottom"]),
    footer: styleOf(pick("footer"), ["background-color", "color"]),
    fonts: [...new Set([...document.fonts].map((f) => f.family))],
  };
});

await browser.close();
console.log(JSON.stringify(data, null, 2));
