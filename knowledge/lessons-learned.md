# Lessons Learned — Connie

## 2026-07 — Community data passed as CR data

**What happened:** An early Connie UI showed blended CR lab results and community sentiment as if it were all CR's own data.
**What went wrong:** Shoppers couldn't tell tested evidence from opinion, which undermines the whole reason to trust Connie.
**Solution:** Backend now tags every evidence item with its source type. Each evidence card shows the source name and logo at the top.
**Rule for next time:** Every evidence card must label its source (CR or the specific community) above the quote. Never merge CR and community evidence into one card or one sentence.

## 2026-07 — Weakly supported answers must be flagged

**What happened:** In the client demo, Connie gave confident answers even when retrieval returned thin evidence.
**What went wrong:** Consumer Reports required that Connie flag weakly supported answers rather than present them with the same confidence.
**Solution:** Added the "Unable to verify claim" state with no evidence cards and a path to add sources.
**Rule for next time:** If evidence is missing or weak, use the Unable to verify state. Never fill the card with filler evidence to look complete.

## 2026-10 — State can't depend on color alone

**What happened:** Misleading (red) and Verified (green) states differ mainly by icon color.
**What went wrong:** Red-green color blindness makes the two states hard to tell apart.
**Solution:** Each state uses a different icon shape (XCircle, CheckCircle, Question) and a different title.
**Rule for next time:** Every state needs a distinct icon shape and title text, not just a color change. (WCAG 1.4.1)
