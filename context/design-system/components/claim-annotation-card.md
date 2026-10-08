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

## Props

| Prop | Type | Notes |
|---|---|---|
| `claim` | `string` | The marketing claim being checked. Used in the card's accessible name. |
| `status` | `"misleading" \| "verified" \| "verified-community" \| "unable-to-verify"` | Picks the icon, title, and subtitle. Copy is fixed per state, don't override it. |
| `evidence` | `EvidenceItem[]` | Pass CR evidence before community evidence. Ignored for `unable-to-verify`. |
| `onClose` | `() => void` | Shows the close button when set. |
| `onAddSources` | `() => void` | Called by "Add more sources" in the `unable-to-verify` state. |

`EvidenceItem` is `{ sourceType: "cr" | "community", sourceName, quote, linkLabel, href }`. `href` is required, every quote links to its source.

## States

| Status | Icon | Title | When |
|---|---|---|---|
| `misleading` | XCircle, attention red | Misleading claim | Evidence contradicts the claim |
| `verified` | CheckCircle, brand green | Verified claim | CR testing and community both support it |
| `verified-community` | CheckCircle, brand green | Community verified | No CR test yet, community agrees |
| `unable-to-verify` | HelpCircle, secondary gray | Unable to verify claim | Not enough evidence. No evidence cards, only "Add more sources" |

## Rules

1. **Never blend sources.** Each evidence item gets its own card with the source name above the quote. Never put CR and community evidence in one card or one sentence.
2. **Never fill a thin card.** If evidence is missing or weak, use `unable-to-verify`. Don't add filler evidence to make a verdict look complete.
3. **State never depends on color alone.** Each state has its own icon shape and title (WCAG 1.4.1). Keep both when adding states.
4. **It's a region, not a dialog.** The card has `role="region"` and doesn't trap focus. Open it on hover and keyboard focus, close it on mouse leave, Escape, or the X.
5. **Tokens only.** Colors, radius, shadow, and type come from `src/connie-theme.css` through the `.connie-theme` class on the card root. If you need a new value, add a token there first.

## Placement

The card anchors to the highlighted claim. Follow the Figma frame for where each card opens. Don't force all cards into one position, the placement keeps an open card from covering other highlighted claims.
