# Connie Build-Out: Spec & Context Guide

Paste or attach this file at the start of a new chat. It holds everything that chat needs to continue the work without re-explaining.

---

## 1. Context for the new chat (read first)

**Who I am.** Edward Chanquin, CMU MHCI grad (Aug 2026), applying to **design engineering** roles. I led the 5-person Connie capstone team as PM & AI Strategy and built Connie's tool-calling agent and its JSON response format. I did **not** design Connie's Figma screens. Those are the team designers' work (Isabel Yin, Sarah Koh, Cassidy Ha). Chloe Zhu built the team's original front end. My solo work is the design engineering rebuild in `connie-design-kit`.

**What Connie is.** A Consumer Reports browser extension that helps shoppers decide, not buy. 74% of 362 research participants would let AI research a purchase but not make it. Agentic workflow is Observe, Understand, Investigate, Intervene, Support Decision. Primary persona is Maya, 34, seven months pregnant, buying her first stroller (`context/product/users.md`).

**What already exists (done, don't redo)**

- `ClaimAnnotationCard` is in the component library (`src/ui/compositions/ClaimAnnotationCard/`), on Connie tokens (`src/connie-theme.css`), with a Storybook story per state. All four states match Figma (16:6796, 16:6860, 34:1871).
- `#connie` is the default route. A 1440x900 stage with the listing screenshot, interactive green and red highlights, hover/focus to open, Escape to close.
- `#connie-states` shows all four states.
- Knowledge layer has 7 lessons and the "do only what the prompt asks" rule (`knowledge/`).

**Links**

- Live demo: https://connie-design-kit.vercel.app/
- Storybook: https://connie-design-kit.vercel.app/storybook/
- Repo: https://github.com/EChanquin/connie-design-kit (local copy at `~/connie-design-kit`)
- Team prototype (reference only, not mine): https://connie-prototype.vercel.app/ and github.com/chloezqy/connie-prototype
- Notion case study: https://app.notion.com/p/AI-Design-Engineering-2026-823e3dfd094d824b93400133bc448ffb
- Figma file key: `seIFNV68pokebhWO9F0OS9` (Vision Board), page `16:2`

**Hard rules (from the lessons file, apply to everything below)**

1. Read the Figma frame through the Figma MCP before building any screen. The Figma is the source of truth, not a text spec.
2. Review the rendered page with a Playwright screenshot, comparing the same state as the Figma frame. Never pass a visual check from code alone. Judge by visible differences, not pixel scores.
3. Use library components and Connie tokens only. If a value is missing, add a token to `src/connie-theme.css` first.
4. One component everywhere. Every screen renders the library component, never a local copy.
5. Never blend CR lab data and community data. Each source gets its own card and label.
6. State never depends on color alone.
7. Do only what the prompt asks, then stop and report. No pixel sampling or side investigations.
8. All data is synthetic. Keep the disclaimer on every public page.

---

## 2. Before anything else (setup)

My Mac's copy is behind GitHub. The library card and Storybook work exist only on GitHub. In Claude Code, inside `~/connie-design-kit`, run:

```
git pull origin main
npm install
npm run app:dev        # app on localhost:8000
npm run storybook      # Storybook on localhost:6006
```

Two untracked files (`case-study/design-harness.png`, `case-study/insight-card-before-after.png`) are fine to keep. Commit them in the first commit.

Then make a branch for this work: `git checkout -b connie-full-journey`.

One doc fix to make in the first commit. `context/design-system/components/claim-annotation-card.md` says the card placement exists to avoid covering other claims. The real reason is **visual hierarchy**. Update that line.

---

## 3. Goal

Turn the one rebuilt card into a **coded, clickable walkthrough of Connie's full journey**, built from the team's Figma, so the case study shows design engineering across the whole product, not one component.

Three outputs:

1. **A storyboard** of Maya's journey that maps every Figma screen to a step in the agentic workflow. This is the case study's new centerpiece image.
2. **A component library** for Connie's core UI, each with Storybook stories for every state.
3. **A walkthrough** in the live demo where a viewer steps through the journey screen by screen.

---

## 4. The storyboard (Phase 1, do this first)

The Figma already has the journey laid out. Use it, don't invent steps.

**Journey map** (Figma page 16:2, section-labeled row at negative y is the cleanest source)

| Workflow stage | Maya's moment | Figma frames |
|---|---|---|
| Entry | Finds and installs Connie | N0 Chrome Web Store (16:4520, 16:6340), Onboarding Trigger (40:2603), Entry Point (40:2632) |
| Onboarding | Tells Connie what she cares about | N1 Welcome (16:1161), M1 Member log in (16:4500), N2 Member check (16:1176), N3 Promise (16:1194), N4a Communities empty/selected (16:1233, 16:1285), N4b Priorities empty/selected (16:1337, 16:1372), N5 Permissions (16:1422), N6 Done (16:1405) |
| Orientation | Learns where Connie lives on the page | T1 to T4 tooltip tour (16:1486, 16:1539, 16:1557, 16:1572, 16:1910), Navi bar states (40:2108 default, 40:2196 hover, 40:2130 and siblings selected) |
| Observe / Understand | Sees whether a product fits her | Product Insights recommended / not recommended (16:5909, 16:6454), Expanded (16:1690, 40:2484), Hover tooltip (40:2391), Loading (16:6717), "Separated by CR & Community" (40:2669) |
| Investigate | Checks a marketing claim | Inline annotations, 4 states plus loading (16:1712, 16:1761, 16:1809, 16:1859, 16:6702). **Already built.** |
| Understand | Connie infers her priorities | Priority Inference sequence (16:2401 start, 16:2306, 16:2460, 16:2555, 16:2653, 16:2747, 16:2841, 16:2938, 16:6899), Loading (16:6729) |
| Support Decision | Compares options and narrows down | Decision Support cards / table / expanded / compare retailers / detailed / editable private list (16:3212, 16:3032, 16:4565, 16:4735, 16:3632, 16:3782, 16:3326, 16:3512) |
| Intervene (social) | Shares her shortlist with her partner | Collaboration C1 to C4 (16:1929, 16:2124, 16:2176, 16:2232, 16:2025) |
| After purchase | Connie checks in 3 weeks later | Pre post-purchase (16:4017), Post-Purchase 1 to 9 (16:3966, 16:4027, 16:4081, 16:4222, 16:4146, 16:4231, 16:4307), Chat 4 post-purchase (16:5111) |
| Always available | Asks Connie anything | Connie chat (16:5112) |

**Design system references:** "Connie DS Reference (palette + type)" 16:5174, "Component States (DS)" 16:5292, Popover symbol 16:6299, loading states 16:6663, 16:6680, 16:6687.

**Storyboard deliverable**

- One row per workflow stage. Each panel shows the Figma screenshot, Maya's moment in one line, and what Connie does in one line.
- Build it two ways. A FigJam board (use the `figma-generate-diagram` or `figma-use-figjam` skill), and a coded `#storyboard` route in the app so it's live.
- Export a wide PNG of the storyboard for Notion.
- Credit line on the storyboard: "Screens designed by the Connie team. Storyboard and build by Edward Chanquin."

**Before building the table, confirm with me:** which frames in each group are the final versions (several names repeat, like "Product Insights" and "Priority Inference"), and whether page 28:8869 holds anything newer.

---

## 5. Components to build (Phase 2)

Build in this order. It follows the journey and reuses parts early.

| # | Component | Figma source | States to cover | Notes |
|---|---|---|---|---|
| 1 | `ConnieNavBar` | Navi bar 16:4373, 40:2108 to 40:2269 | default, hover, each item selected | Already drawn as static images in `#connie`. Replace with the real component. |
| 2 | `ProductInsightCard` | 16:5909, 16:6454, 16:5478 | recommended, not recommended, expanded, loading, tooltip open | Badges must show their source. "Recommended", never "Perfect Match". |
| 3 | `SourceBadge` / evidence chip | inside 2 and the claim card | CR, community | Shared with the claim card. Extract it rather than duplicate. |
| 4 | `Tooltip` / `Popover` | 16:6299, T1 to T4 | each step, with step count | Keyboard reachable, Escape to close. |
| 5 | `PriorityChip` set | Priority Inference frames | inferred, confirmed, removed, loading | Maya can correct what Connie inferred. That's the "she stays in control" rule. |
| 6 | `DecisionTable` and `DecisionCard` | 16:3032, 16:3212, 16:4565, 16:4735 | cards, table, expanded, compare retailers | Toggle between views (GridNine / Rows / CardsThree icons, 16:3442 to 16:3446). |
| 7 | `ShareSheet` | C1 to C4 | default, add person, toggle permissions, shared | Permissions toggle needs a visible label, not color only. |
| 8 | `CheckInCard` | Post-Purchase 1 to 9 | each step | |
| 9 | `ConnieChat` | 16:5112, 16:5111 | empty, conversation, post-purchase | |
| 10 | Onboarding screens | N0 to N6 | empty and selected states | Compose from primitives plus the components above. |

**For each component**

- Read the Figma node through the MCP first.
- Build it in `src/ui/compositions/<Name>/` on Connie tokens, with a doc in `context/design-system/components/<name>.md` (same format as `claim-annotation-card.md`).
- Add a Storybook story per state, under "Connie/".
- Fixture data goes in a `.fixtures.ts` file, shaped like the agent's JSON response types from the team repo (`src/types/connie-contract.ts` in chloezqy/connie-prototype, six response types including `inline_annotations`). I designed that format, so the UI should read it as-is. That shows the UI and the agent share one contract.
- Run the Critic with a screenshot against the Figma, fix highs and mediums, capture any new lesson.

---

## 6. The walkthrough (Phase 3)

- Add one route per workflow stage. Suggested hashes are `#install`, `#onboarding`, `#insights`, `#claims` (alias for the current `#connie`), `#priorities`, `#decide`, `#share`, `#check-in`, plus `#storyboard`.
- Reuse the stage pattern from `ConnieStage`. A 1440x900 frame with the Figma background exported as an image, and interactive library components layered on top at Figma coordinates.
- Add a small persistent stepper ("Step 3 of 9 · Investigate") with next and back, keyboard accessible. A viewer should be able to watch the whole journey in about two minutes.
- Keep the synthetic-data disclaimer below every stage.
- Keep `/` landing on the claim check, since it's the strongest single moment, and link to the walkthrough from there.

---

## 7. QA (Phase 4, per screen)

- Playwright screenshot of each state, side by side with the Figma frame. List visible differences in plain words.
- Accessibility pass covering keyboard path through the whole walkthrough, focus visible, Escape closes overlays, contrast at least 4.5:1 for text and 3:1 for icons, and state never color-only.
- Build passes (`npm run build`, which runs both app and Storybook), then push. Vercel redeploys on push.

---

## 8. Case study assets (Phase 5)

What to bring back to Notion when it's done:

- **Storyboard PNG.** New section between 01 Challenge and 02 Research, or a new "Journey" section.
- **A 60 to 90 second screen recording or GIF** of the walkthrough. Best hero asset for a design engineer reader.
- **Storybook link** to the full Connie library, not just the claim card.
- **Numbers to report, only once counted from the repo.** Components built, stories, states covered, Critic issues found and fixed, lessons added.
- **One new decision for section 07**, picked from whatever surprised me during the build.

Copy rules for anything going into Notion: first person, plain and direct, no em dashes, no colons in prose, no "showcasing / enhance / fostering / pivotal / delve", no three-item lists for rhythm. Every screen's design credit stays with the team.

---

## 9. How to run this

- **Building (Phases 1 to 4):** Claude Code on my Mac in `~/connie-design-kit`. It has the Figma MCP, Playwright, and the harness.
- **Writing (Phase 5):** a regular Claude chat with Notion connected, so it can edit the case study page directly.
- Work one phase at a time. End each with a commit and a short report, then I review before the next.

**Kickoff prompt for Claude Code**

> Read `prompts/connie-buildout-spec.md`, then `.agent/AGENT.md` and everything in `knowledge/`. Do section 2 (setup) only. Then use the Figma MCP to list the frames in each journey group from section 4, and ask me which frame in each group is final before building anything. Stop after that.

---

## 10. Open questions for me (answer before Phase 2)

1. Which repeated frames are final ("Product Insights", "Priority Inference", "Decision Support" all have several)?
2. Does Figma page 28:8869 have newer versions of any screen?
3. Should the walkthrough include onboarding, or start on the product page (shorter for reviewers)?
4. Which three components matter most if I run out of time? My default is Product Insight Card, Decision Table/Card, and Priority Chips.
