# Lessons Learned — Connie

## 2026-07 — Community data passed as CR data

**What happened:** An early Connie UI showed blended CR lab results and community sentiment as if it were all CR's own data.
**What went wrong:** Shoppers couldn't tell tested evidence from opinion, which undermines the whole reason to trust Connie.
**Solution:** Backend now tags every evidence item with its source type. Each evidence card shows the source name and logo at the top.
**Rule for next time:** Every evidence card must label its source (CR or the specific community) above the quote. Never merge CR and community evidence into one card or one sentence.

## 2026-07 — Weakly supported answers must be flagged

**What happened:** In the client demo, Connie gave confident answers even when retrieval returned thin evidence.
**What went wrong:** Consumer Reports required that Connie flag weakly supported answers rather than present them with the same confidence.
**Solution:** Added the "Unable to verify claim" state with no evidence cards and a path to add sources.
**Rule for next time:** If evidence is missing or weak, use the Unable to verify state. Never fill the card with filler evidence to look complete.

## 2026-10 — State can't depend on color alone

**What happened:** Misleading (red) and Verified (green) states differ mainly by icon color.
**What went wrong:** Red-green color blindness makes the two states hard to tell apart.
**Solution:** Each state uses a different icon shape (XCircle, CheckCircle, Question) and a different title.
**Rule for next time:** Every state needs a distinct icon shape and title text, not just a color change. (WCAG 1.4.1)

## 2026-10 — Building from a text spec alone produces wrong layout and invented copy

**What happened:** The first #connie implementation was built from a written spec without reading the Figma. Coordinates, copy, and icon choices were guessed.
**What went wrong:** The layout didn't match the Figma frame, copy was invented rather than pulled from the actual design, and icons differed (outline vs solid filled).
**Solution:** Read the Figma through the MCP (get_design_context, get_screenshot) before writing any layout code. Download exact assets; don't approximate.
**Rule for next time:** Always call get_design_context on the target frame before implementing a Figma design. The spec is a reference; the Figma is the source of truth.

## 2026-10 — The Critic passed visual checks from code, not from a rendered screenshot

**What happened:** The Critic reviewed the claim annotation card by reading source code and comparing it to the Figma design context output. It listed issues correctly but didn't catch icon shape errors (outline vs solid) because it wasn't looking at actual rendered pixels.
**What went wrong:** Code review alone misses rendering artifacts — icon variants, font fallbacks, opacity blending — that only appear in the browser.
**Solution:** Take a Playwright screenshot of the rendered page in the same state as the Figma frame being compared, then review side by side.
**Rule for next time:** Visual review must compare a screenshot of the rendered page to the Figma screenshot, in the same open/closed state. Don't pass visual checks based on code alone.

## 2026-10 — Verdict icons rendered black on the states page

**What happened:** On `#connie-states`, every verdict icon rendered black instead of red, green, or gray, even though the card CSS set `--icon-color` for each state.
**What went wrong:** `.icon` in `icons.css` also sets `--icon-color` with the same specificity and loads later, so it won. The colors were also hardcoded hex values, so the card wasn't actually reading the Connie tokens.
**Solution:** Moved Connie values into `src/connie-theme.css`, scoped them with `.connie-theme`, and raised the selector to `.claim-annotation-card .icon.cac-icon--*` so the token wins.
**Rule for next time:** When overriding a variable that a primitive also sets, check the rendered color in a screenshot, not the CSS. Component CSS reads tokens, never hex values.

## 2026-10 — Two versions of the same card drifted apart

**What happened:** The live `#connie` stage had its own hand-built claim cards, separate from the library `ClaimAnnotationCard`. The library version had picked up details the Figma never had: uppercase source labels, outline icons, 14px quotes, and evidence boxes stretched to equal height.
**What went wrong:** With two implementations, fixes landed in one and not the other, and the library drifted from the Figma without anyone noticing.
**Solution:** Brought the library card back to the Figma (nodes 16:6796 and 16:6860), then made the stage render it. One component now backs the demo, the states page, and Storybook.
**Rule for next time:** A design gets one implementation. If a demo needs the component, import it. Before changing a library component, compare it to the Figma frame, not to the last version of the code.

