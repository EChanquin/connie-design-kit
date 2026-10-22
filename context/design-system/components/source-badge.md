# SourceBadge

Source logos, logo stacks and evidence link chips, shared by every Connie card. **Use these. Don't draw a source logo or link chip inside a card.**

```tsx
import { SourceLogo, SourceStack, SourceLink } from "compositions";

<SourceStack sources={["consumer_reports", "reddit"]} extraCount={1} />
<SourceLink source="reddit" label="Best Strollers: Thread" href="https://www.reddit.com/..." />
```

- Source: `src/ui/compositions/SourceBadge/SourceBadge.tsx`
- Used by: ProductInsightCard (row stacks, evidence chips, "Based on" chips), DecisionSupport (evidence chips, metric stacks). The claim card reads its logos from the same `SOURCE_LOGOS`.
- Figma: Product Insights rows and chips (Vision Board, instance 16:1705)

| Part | Props | Notes |
|---|---|---|
| `SourceLogo` | `source`, `size` 16 or 20, `labelled` | Round logo. Sources without a logo show their first letter. Set `labelled` when it stands alone. |
| `SourceStack` | `sources`, `extraCount` | Overlapping logos and "+N". Screen readers hear "Sources: Consumer Reports, Reddit, and 1 more". |
| `SourceLink` | `source`, `label`, `href` | Chip linking evidence to where it came from. `href: null` (e.g. CR database rows) renders a plain chip with no arrow. |

`source` is the agent contract's `SourceType` (`consumer_reports`, `reddit`, `youtube`, `web`) plus `instagram`, which the Figma shows as a source a shopper can connect but the contract doesn't have yet.

## Rules

1. **Every chip is labeled by a human name, never a raw URL.**
2. **CR first.** Pass CR before community sources so the order matches the cards.
