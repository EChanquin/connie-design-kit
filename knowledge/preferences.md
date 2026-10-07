# Preferences

Standing decisions about visual style, layout, and tooling. These apply to all design work unless explicitly overridden.

---

## Visual style

**Decision:** Clean, typographic, no decorative illustrations.

**Rationale:** This is a professional workshop for design students. The audience values craft and intentionality. Letting content and typography speak -- rather than relying on decoration -- signals confidence in the material and respects the audience's design literacy.

**Date:** 2026-04-04

---

## Layout approach

**Decision:** Use Section for page sections, Grid for multi-column content, Flex for inline arrangements.

**Rationale:** This is consistent with the SDS layout system and avoids ad hoc CSS. Section provides semantic page structure, Grid handles responsive multi-column layouts, and Flex handles small-scale inline arrangements. Using these three primitives consistently means every layout is predictable and maintainable.

**Date:** 2026-04-04

---

## Agent scope

**Decision:** Do only what the prompt asks. No pixel sampling, extra investigations, or follow-on checks unless explicitly requested. When a task is done, stop and report.

**Rationale:** Unsolicited investigation wastes time and creates noise. The user knows what they want verified; if they need more, they'll ask.

**Date:** 2026-10-07
