# ProductInsightCard

Connie's verdict on the product a shopper is looking at, with the insights behind it. Each insight opens to show CR and community evidence in separate, labeled blocks.

**Use this component. Do not rebuild the card from primitives.** If a design needs a variation, add a prop here and a story for it.

```tsx
import { ProductInsightCard } from "compositions";

<ProductInsightCard insights={payload} basis={MAYA_BASIS} onClose={close} />
```

- Source: `src/ui/compositions/ProductInsightCard/ProductInsightCard.tsx`
- Styles: `productInsightCard.css` (tokens only)
- Stories: "Connie/Product Insight Card"
- Example data: `productInsightCard.fixtures.ts` (synthetic, shaped like the agent's JSON)
- Used by: the `#insights` walkthrough stage and Storybook
- Figma: Vision Board, recommended 16:1602, expanded 16:1705, not recommended 16:1664, "Based on" popover 16:6299 (shown in 16:1889)

## Props

| Prop | Type | Notes |
|---|---|---|
| `insights` | `ProductInsightsPayload` | The agent's `product_insights` payload, read as-is |
| `state` | `"ready" \| "loading"` | Loading shows a skeleton while Connie reads the page |
| `basis` | `{ sources, preferences }` | Turns on the info button and its "Based on" popover |
| `expandedIndex` / `defaultExpandedIndex` / `onExpandedChange` | `number \| null` | Which insight is open. One at a time. |
| `defaultBasisOpen` | `boolean` | Opens the popover on first render |
| `onEditBasis` | `(part) => void` | Pencil buttons in the popover |
| `saved` / `defaultSaved` / `onSavedChange` | `boolean` | Save toggle |
| `onFeedback` | `("up" \| "down" \| null) => void` | "Like this rec?" thumbs |
| `onClose` | `() => void` | Shows the close button when set |

## States

| State | Icon and title | Figma |
|---|---|---|
| Recommended | Gradient star, "RECOMMENDED" | 16:1589 |
| Not recommended | Filled X circle, "NOT RECOMMENDED". Rows use drawback icons. | 16:1650 |
| Expanded | One row open, CR and community evidence each with its own label and link | 16:1690 |
| Tooltip open | "Based on" popover above the card | 16:1889 |
| Heads up | A `caution` insight on a recommended product shows as a tinted note under the list | 16:1705 |
| Loading | Skeleton rows in the card shell | Not in Figma, see below |

## Rules

1. **Never blend sources.** Expanded evidence shows each source's label above its own text, with its own link.
2. **State never depends on color alone.** The verdict changes the icon shape and the title.
3. **Say "Recommended", never "Perfect Match".**
4. **CR is always on.** In the "Based on" popover only community sources and preferences get edit buttons.
5. **Escape closes the popover** and returns focus to the info button.

## Known differences from the Figma

- The close X uses foreground-secondary, not #c7c7c7, which is under 3:1.
- The Figma frame clips the card at 536px, which hides the "Like this rec?" footer. The build shows the footer and scrolls the list.
- "Low Rated" uses a raster icon in Figma that couldn't be exported, so drawback categories without a named Phosphor icon use XCircle.
- The contract has no "Top Rated" category. Fixtures use `value`, and `ease_of_use`, `service` and `value` all map to the Top Rated star.
- The not-recommended frame repeats the "Top Rated" and "Ride in Comfort" copy for "Low Rated" and "Bumpy Ride". Fixtures use copy that fits those labels.
- The loading skeleton isn't drawn in Figma (16:6717 only tints the page). It reuses the card shell and the file's highlight gradient. Check it with the team.
- Instagram appears on "City Certified" in Figma, but the contract's `source_type` has no Instagram, so the fixture uses Reddit.
