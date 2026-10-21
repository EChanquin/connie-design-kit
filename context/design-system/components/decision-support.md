# Decision Support

Maya's saved shortlist, ranked against her priorities, as cards or a table, in the side panel or expanded.

```tsx
import { DecisionSupportPanel, DecisionCard, DecisionTable } from "compositions";

<DecisionSupportPanel decision={payload} images={images} offers={offers} metrics={metrics} />
```

- Source: `src/ui/compositions/DecisionSupport/DecisionSupport.tsx`
- Stories: "Connie/Decision Support"
- Example data: `decisionSupport.fixtures.ts` (synthetic `decision_support` payload)
- Used by: the `#decide` walkthrough stage and Storybook
- Figma: cards 16:3212, selection 16:3326 and 16:3512, table 16:3032, expanded cards 16:4962 and 16:4565, expanded table 16:4735, compare retailers 16:3632

| Part | What it is |
|---|---|
| `DecisionSupportPanel` | View toggle, expand, select all with Share and Delete, and either cards or the table. Shows the CR verdict above the table. |
| `DecisionCard` | One ranked product. `layout="compact"` or `"wide"`. Retailer tag opens Compare Prices when `offers` are set. Wide cards show "Lab & user metrics" behind Show Details. |
| `DecisionTable` | Every product's fold, weight, terrain and price. `layout="wide"` adds thumbnails. |

Products come straight from the agent contract (`DecisionProduct`). Photos, retailer offers and metrics aren't in the contract, so the page passes them in by product name.

## Rules

1. **Rank is text.** "#1 BEST MATCH", "BEST", "NOT REC" carry rank. Color only reinforces it.
2. **Terrain marks differ in shape.** Check for all terrain, X for pavement only, plus hidden text for screen readers.
3. **Priorities that matched are bold** in the rationale (`priority_matches`).
4. **Share and Delete need a selection.** They stay disabled until something is selected.
5. **Escape closes Compare Prices** and returns focus to the retailer tag.

## Sources and gaps

The Figma read limit was hit before this component's design context could be pulled. The visual target is the Figma screenshots. Spacing and type sizes the screenshots couldn't settle come from the team prototype, which was built from the same Figma. Recheck against 16:3212 and 16:3032 when the limit resets.

- Text on tinted fills uses `foreground-brand-on-tint` and `foreground-secondary-on-tint`. The Figma's green on light green and gray on gray fall under 4.5:1.
- The expanded metrics in Figma use round illustrations that couldn't be exported. The build uses the Product Insights icon tiles.
- The Figma copy doesn't fit Maya. The CR verdict mentions a "Rural/Active" profile, and the #1 pick is the heavier 2-step stroller while her top priorities are Easy Fold and Lightweight. Kept as designed and flagged for the team.
- Figma lists the City Mini GT2 at $399.99 on the card and $449 in the table. The fixture uses one price.
