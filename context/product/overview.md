# Product Overview — Connie

## What
Connie is an AI shopping browser extension built for Consumer Reports (CR). It helps shoppers decide, it does not buy for them. Research with 362 people showed 74% would let AI research a purchase but not make it, so Connie supports the decision and leaves the final call to the shopper.

## The screen we're building
**Inline claim annotation card.** When Connie highlights a product claim on a retailer page (for example "all-day comfort"), hovering the highlight opens a card that shows whether the claim holds up against two kinds of evidence:

1. **CR lab results** (tested data)
2. **Community sentiment** (Reddit, Instagram, owner reviews)

The card has four states:

| State | Icon | Title | Subtitle | Evidence shown |
|---|---|---|---|---|
| Misleading | XCircle, attention red | Misleading claim | Doesn't match what our testers and real users are saying. | CR quote + community quote, each with a source link |
| Verified | CheckCircle, brand green | Verified claim | Matches what our testers and real users are saying. | CR quote + community quote, each with a source link |
| Verified by community only | CheckCircle, brand green | Verified claim | Our testers haven't reviewed this product, but it matches what real users are saying. | Two community quotes, no CR card |
| Unable to verify | Question, secondary gray | Unable to verify claim | Connie didn't have enough info to confirm or dispute this claim. Add more trusted sources to help verify it. | No evidence cards; one "Add more sources" button |

Every state has a close (X) button in the top right.

## Goals
- Show where tested data and real-owner experience agree or conflict, at a glance
- Make the source of every piece of evidence unmistakable (CR vs. community)
- Name uncertainty honestly instead of hiding it

## Constraints
- Single component, rendered as an overlay card (~520px wide) on a retailer page
- WCAG 2.1 AA. State must never be conveyed by color alone; the icon and title carry it too
- Use existing design system components and semantic tokens only
- Every source link must have a real destination (href) at creation time
