# Connie frame picks (confirmed 2026-10-21)

Figma file `seIFNV68pokebhWO9F0OS9`, page `16:2`.

**Rule.** The color frames in the main grid (`16:` IDs) are final. The grayscale row at negative y (`40:` IDs) is an earlier pass and is out, except the Navi bar states (`40:2108` to `40:2269`), which only exist there. Page `28:8869` has no Connie screens.

## Product Insights
- Base, recommended `16:1589`. Not recommended `16:1650`.
- Expanded `16:1690`.
- Tooltip, click version `16:1889` (sources and preferences popover). Hover version `40:2391` is out under the rule.
- Loading `16:6717`.

## Priority Inference
- Start `16:2401`, loading `16:6729`.
- Main path `16:2306`, `16:2460`, `16:2555`, `16:2653`, `16:2747`, `16:2841`, ending on `16:2938`.
- `16:6899` is an exact duplicate of `16:2555`, so it's out. The main path already is the walk-up apartment story.
- `16:6729` (named Loading) is the "Thinking" step between `16:2460` and `16:2555`.
- `40:1796` (drag-to-rank list) is out.

## Decision Support
- Cards `16:3212`. Table `16:3032`.
- Editable list, two states. One checked `16:3326`, all checked `16:3512`.
- Expanded cards, two states. Details shown `16:4565`, details hidden `16:4962`.
- Expanded table `16:4735`, compare retailers `16:3632`, detailed `16:3782`.

## Entry and tour
- Chrome Web Store `16:6340` (the polished one). `16:4520` is out.
- Tour `16:1486`, `16:1539`, `16:1557`, `16:1572`, then T4 `16:1910`. The stray `16:6694` (plain Amazon page, no Connie UI) is out.

## Collaboration
- C1 `16:1929`, C2 `16:2124`, C3 add person `16:2176`, C3 permissions `16:2232`, C4 `16:2025`.
- The frame named "Add Maya" adds Alex on screen, so only the layer name is stale.
- Copy change in the build. "Strollers for the twins" becomes "Strollers for Maya".

## Post-purchase
- Pre `16:4017`, then 1 `16:3966`, 2 `16:4027`, 3 `16:4081`, 5 `16:4146`, 8 `16:4231`, 9 `16:4307`. Frame 9 is the end state.
- There is no 6 or 7. Frames 5, 8 and 9 are one continuous conversation.
- Frame 4 `16:4222` is out. It sits mid-conversation with the panel closed, so it doesn't work as an end state. Left in Figma, only dropped from the build.
- Chat 4 post-purchase `16:5111` is an empty frame, so it's out.
- Connie chat `16:5112` is a 520x800 crop of the same check-in conversation, so the storyboard skips it.

## Storyboard notes
- Navi bar frames (`40:2108` to `40:2269`) are grayscale wireframes. They stay as the source for `ConnieNavBar` but aren't storyboard panels.
- 57 frames in 9 stages. Data lives in `src/examples/storyboard/storyboardData.ts`.

## Sharp exports
- 2x PNGs exported by hand from Figma live in `figma-exports/` (not committed). Converted copies are in `src/examples/storyboard/frames-2x/`.
- Still missing a 2x export: "T3 — Tooltip · Step 4" (16:1572). It falls back to the storyboard thumbnail.
