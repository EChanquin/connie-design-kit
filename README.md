# Connie Design Kit

A design harness for building Connie's inline claim annotation card — a Consumer Reports browser extension feature that checks product claims while you shop.

---

## What Connie Does

Connie is an AI shopping assistant built for Consumer Reports. It highlights product claims on retailer pages (e.g. "all-day comfort") and lets shoppers hover to see whether the claim holds up. The claim check card shows:

- **CR lab results** — tested, verified data from Consumer Reports
- **Community sentiment** — Reddit, Instagram, and owner reviews

The card has four states:

| State | Icon | When |
|---|---|---|
| Verified | Green check circle | CR and community agree the claim is true |
| Misleading | Red X circle | Evidence contradicts the claim |
| Community verified | Green check circle | No CR test yet, but community agrees |
| Unable to verify | Gray question mark | Not enough evidence to call it |

Every state uses a distinct icon shape and title — state is never conveyed by color alone (WCAG 1.4.1).

---

## What I Built

**`#connie`** — A 1440×900 stage that recreates the Figma prototype exactly: an Amazon stroller product page with two highlighted claims. Hovering the green highlight ("Versatile Design") opens the verified card; hovering the red highlight ("Comfortable & Adjustable") opens the misleading card. Cards stay open while the mouse moves from the highlight into the card so links can be clicked, and close on mouse leave, X, or Escape.

**`#connie-states`** — A four-state demo page showing all card variants side by side, built with the SDS component library.

See `case-study/` for before/after screenshots.

---

## How the Design Harness Works

This repo uses a four-layer compound designing system:

### 1. Context (`context/`)
Product and design system knowledge the agent loads before any task. `context/product/overview.md` defines what Connie is and what the four card states must say. `context/design-system/connie-tokens.md` maps Connie's color and typography decisions to SDS semantic tokens.

### 2. Skills (`.agent/skills/`)
Focused agent personas — Prototyper, Critic, Compounder — each loaded on demand. The Prototyper builds components using SDS primitives and Connie tokens. The Critic reviews rendered screenshots against the Figma, not just code. The Compounder writes lessons back into `knowledge/` after each session.

### 3. Figma MCP
Before implementing any design, the agent calls `get_design_context` and `get_screenshot` on the target Figma frame. Assets (icons, logos) are downloaded locally rather than approximated. This prevents the most common failure mode: building from a written spec and inventing copy or getting coordinates wrong.

### 4. Knowledge (`knowledge/`)
Standing decisions and hard-won lessons persist across sessions:
- `preferences.md` — visual style, layout approach, agent scope ("do only what the prompt asks, then stop and report")
- `lessons-learned.md` — source blending bug, weakly-supported flag, color-alone state, build-from-Figma-first rule, screenshot-before-passing-visual-checks rule

---

## Running Locally

```bash
npm install
npm run app:dev
```

Then open:
- `http://localhost:8000/#connie` — the interactive stage
- `http://localhost:8000/#connie-states` — the four-state demo

---

## Synthetic Data Disclaimer

Prototype with synthetic data. Verdicts and quotes are illustrative and do not reflect real Consumer Reports test results or real user reviews.

---

## Credits

- **Bill Guo's design-harnessing-kit** — the compound designing framework, agent skills, and SDS harness this repo is built on. [MIT License](https://opensource.org/licenses/MIT)
- **SDS (Simple Design System)** — Figma: [figma/sds](https://github.com/figma/sds)
- **Compound Engineering concept** — [Kieran Klaassen at Every](https://every.to/source-code/compound-engineering-how-every-codes-with-agents-af3a1bae-cf9b-458e-8048-c6b4ba860e62)
