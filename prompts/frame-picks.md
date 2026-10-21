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
- `16:6899` is a branch (apartment without elevator moves Lightweight to the top), not a replacement.
- `40:1796` (drag-to-rank list) is out.

## Decision Support
- Cards `16:3212`. Table `16:3032`.
- Editable list, two states. One checked `16:3326`, all checked `16:3512`.
- Expanded cards, two states. Details shown `16:4565`, details hidden `16:4962`.
- Expanded table `16:4735`, compare retailers `16:3632`, detailed `16:3782`.

## Still open (not needed for the fast path)
- Chrome Web Store, `16:4520` or `16:6340`.
- Stray "T2 Step 3" `16:6694`, discard or keep.
- Post-Purchase 6 and 7 don't exist. Gap intentional?
- C3 is named "Add Maya" and C1 says "Strollers for the twins". Both conflict with the persona.
