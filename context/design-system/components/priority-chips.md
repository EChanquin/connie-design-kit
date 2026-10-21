# PriorityChips

Connie's read on what matters to the shopper, as ranked chips in a 2-column grid. Connie infers them and the shopper stays in control: with `editable`, every chip can be moved, removed and restored.

```tsx
import { PriorityChips } from "compositions";

<PriorityChips priorities={priorities} editable onReorder={setOrder} onRemove={remove} onRestore={restore} />
```

- Source: `src/ui/compositions/PriorityChips/PriorityChips.tsx`
- Stories: "Connie/Priority Chips"
- Example data: `priorityChips.fixtures.ts`. `prioritiesFromPayload()` turns the agent's `priority_inference` payload into chips.
- Used by: the `#priorities` walkthrough stage and Storybook
- Figma: Priority Cards Bento Grid 16:2325 (in 16:2306), raised chips in 16:2555 and 16:2841

## States

| Status | Look | Figma |
|---|---|---|
| `suggested` | Thin border. Connie's starting point. | 16:2306 |
| `confirmed` | Firm black outline, kept after tailoring | 16:2841 |
| `boosted` | Green fill, filled icon disc, sparkle, and the reason in words | 16:2555, 16:2841 |
| `removed` | Dashed border, struck-through label, "Removed", Undo when editable | Not in Figma |
| loading (`state="loading"`) | Four shimmer chips | Not in Figma, the frame shows "Thinking." text |

## Rules

1. **Maya stays in control.** Anything Connie inferred can be moved or removed. A removed chip keeps its place so it can come back.
2. **Say why.** A boosted chip always carries its reason, e.g. "Recommended based on your commute".
3. **State never depends on color alone.** Rank number, outline, sparkle and reason text carry the state. Each chip's accessible name reads its rank and status.

## Sources and gaps

The Figma read limit was hit before this component's design context could be pulled. Sizes come from Figma metadata read earlier (grid 402 wide, chips 195 by 90, 12 gap, 40px icon disc, 20px rank badge). Icons are the Figma exports. Colors and the reason line's size were matched to the Figma screenshot. Recheck padding and the reason line's type size against 16:2841 once the limit resets.
