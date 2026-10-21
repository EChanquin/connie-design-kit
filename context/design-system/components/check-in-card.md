# CheckInCard

Connie checks in weeks after a purchase and asks how it went, one tap at a time. Her answers go back to the community so the next parent decides with them.

```tsx
import { CheckInCard } from "compositions";

<CheckInCard product={product} steps={steps} thanks={thanks} onAnswer={answer} onClose={close} />
```

- Source: `src/ui/compositions/CheckInCard/CheckInCard.tsx`
- Stories: "Connie/Check-In Card"
- Example data: `checkInCard.fixtures.ts`. `checkInScript(answers)` returns the conversation for any set of answers, so stories and the walkthrough share one script.
- Used by: the `#check-in` walkthrough stage and Storybook
- Figma: Post-Purchase 1 to 9 (16:3966, 16:4027, 16:4081, 16:4146, 16:4231, 16:4307). There is no 6 or 7, and frame 4 is out (see `prompts/frame-picks.md`).

| Prop | Notes |
|---|---|
| `product` | The product she saved. Shown under the first question. |
| `steps` | Each question, its options, and her answer once given. `reply` sets the bubble text when it differs from the option. `silent` keeps the pick outlined without a bubble, like the last question in Figma. |
| `typing` | Connie is writing the next message |
| `thanks` | Closing note |
| `onAnswer(stepIndex, option)` | Called when she taps an option |
| `onClose` | Shows the close button |

The agent's `post_purchase` payload maps to the first step with `checkInStepFromPayload()`. `thanksFromPayload()` turns its `community_stat` into the closing note.

## Rules

1. **One tap per question.** Answered questions lock, and her pick keeps an outline plus her reply on the right, so state never depends on color.
2. **Give something back.** The check-in ends by telling her how her answer helps other parents.
3. **Every answer ends somewhere.** Answers off the Figma path ("Not yet", "Bought a different one") close the check-in with a short, plain line.

## Sources and gaps

Built after the Figma read limit, so sizes are matched to the Figma screenshots. Recheck spacing against 16:4307 when the limit resets. The free-text field is drawn but not wired.
