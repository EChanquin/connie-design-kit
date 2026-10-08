# ClaimAnnotationCard

Connie's claim check card. It opens when a shopper hovers or tabs to a highlighted claim on a product page and shows whether the claim holds up.

**Use this component. Do not rebuild the card from primitives.** If a design needs a variation, add a prop here and a story for it.

```tsx
import { ClaimAnnotationCard } from "compositions";

<ClaimAnnotationCard
  claim="all-day comfort"
  status="misleading"
  evidence={evidence}
  onClose={close}
/>
```

- Source: `src/ui/compositions/ClaimAnnotationCard/ClaimAnnotationCard.tsx`
- Styles: `src/ui/compositions/ClaimAnnotationCard/claimAnnotationCard.css` (tokens only, no hex values)
- Stories: Storybook, "Connie/Claim Annotation Card" (`npm run storybook`)
- Example data: `claimAnnotationCard.fixtures.ts` (synthetic)
- Used by: the `#connie` stage (live demo), the `#connie-states` page, and Storybook. All three render this one component.
- Matches the Connie Figma: Vision Board, nodes 16:6796 (misleading), 16:6860 (verified), and 34:1871 (unable to verify)

## Props

| Prop | Type | Notes |
|---|---|---|
| `claim` | `string` | The marketing claim being checked. Used in the card's accessible name. |
| `status` | `"misleading" \| "verified" \| "verified-community" \| "unable-to-verify"` | Picks the icon, title, and subtitle. Copy is fixed per state, don't override it. |
| `evidence` | `EvidenceItem[]` | Pass CR evidence before community evidence. Ignored for `unable-to-verify`. |
| `onClose` | `() => void` | Shows the close button when set. |
| `onAddSources` | `() => void` | Called by "Add more sources" in the `unable-to-verify` state. |
| `className` | `string` | Optional, for placement only. Don't restyle the card from outside. |

`EvidenceItem` is `{ sourceType: "cr" | "community", sourceName, quote, linkLabel, href, logoSrc? }`. `href` is required, every quote links to its source. CR evidence shows the CR logo automatically. For community sources, pass a logo from `SOURCE_LOGOS` (currently `cr` and `reddit`) or leave it out.

## States

| Status | Icon | Title | When |
|---|---|---|---|
| `misleading` | Filled X circle, attention red | Misleading claim | Evidence contradicts the claim |
| `verified` | Filled check circle, brand green | Verified claim | CR testing and community both support it |
| `verified-community` | Filled check circle, brand green | Community verified | No CR test yet, community agrees |
| `unable-to-verify` | Filled question circle, secondary gray | Unable to verify claim | Not enough evidence. No evidence cards, only a centered dark "Add more sources" button |

Figma frames: misleading 16:6796, verified 16:6860, unable to verify 34:1871.

## Rules

1. **Never blend sources.** Each evidence item gets its own card with the source name above the quote. Never put CR and community evidence in one card or one sentence.
2. **Never fill a thin card.** If evidence is missing or weak, use `unable-to-verify`. Don't add filler evidence to make a verdict look complete.
3. **State never depends on color alone.** Each state has its own icon shape and title (WCAG 1.4.1). Keep both when adding states.
4. **It's a region, not a dialog.** The card has `role="region"` and doesn't trap focus. Open it on hover and keyboard focus, close it on mouse leave, Escape, or the X.
5. **The Figma is the source of truth.** Layout, spacing, and type follow nodes 16:6796, 16:6860, and 34:1871. Two deliberate differences: the close X uses foreground-secondary instead of the Figma's #c7c7c7, which is under 3:1 contrast, and the font falls back to the system sans because CR-Averta is licensed.
6. **Tokens only.** Colors, radius, shadow, and type come from `src/connie-theme.css` through the `.connie-theme` class on the card root. If you need a new value, add a token there first.

## Placement

The card anchors to the highlighted claim. Follow the Figma frame for where each card opens. Don't force all cards into one position, the placement keeps an open card from covering other highlighted claims.
