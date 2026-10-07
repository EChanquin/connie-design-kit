Build Connie's inline claim annotation card as a React component using the SDS design system. Read context/product/overview.md, context/product/users.md, context/design-system/connie-tokens.md, and knowledge/lessons-learned.md first.

The card appears when a shopper hovers a highlighted product claim on a retailer page. Build all four states from overview.md (Misleading, Verified, Verified by community only, Unable to verify) as one component driven by a `status` prop and an `evidence` array. Each evidence item has a source type (cr or community), source name, quote, link label, and href.

Use the stroller example data from overview.md for a demo page that shows all four states side by side. Make it responsive (evidence cards stack on mobile), accessible (WCAG 2.1 AA, state never conveyed by color alone), and true to the design system. When done, hand off to the Critic for review.
