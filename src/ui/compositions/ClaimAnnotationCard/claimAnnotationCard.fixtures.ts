import type { EvidenceItem } from "./ClaimAnnotationCard";

/*
 * Synthetic example evidence for the claim "all-day comfort" on a stroller
 * listing. Shared by the #connie-states demo page and the Storybook stories.
 * Verdicts and quotes are illustrative and are not real CR test results.
 */

// Maya is 7 months pregnant, researching strollers. The claim: "all-day comfort"

export const MISLEADING_EVIDENCE: EvidenceItem[] = [
  {
    sourceType: "cr",
    sourceName: "Consumer Reports",
    quote:
      "In 200 hours of lab testing, testers reported significant discomfort after 3-hour walks. Handlebar padding scored in the bottom quartile.",
    linkLabel: "CR Lab Results",
    href: "https://www.consumerreports.org",
  },
  {
    sourceType: "community",
    sourceName: "Reddit r/BabyBumps",
    quote:
      "The seat gets really firm after about an hour. My back was aching by the end of our walk. Wish I'd tested it longer in the store.",
    linkLabel: "See thread",
    href: "https://www.reddit.com/r/BabyBumps",
  },
];

export const VERIFIED_EVIDENCE: EvidenceItem[] = [
  {
    sourceType: "cr",
    sourceName: "Consumer Reports",
    quote:
      "Testers rated the handlebar cushioning and push-force score in the top 10% of strollers we've tested. Shoulder strain minimal at 4 hours.",
    linkLabel: "CR Lab Results",
    href: "https://www.consumerreports.org",
  },
  {
    sourceType: "community",
    sourceName: "Instagram @mamaofthree",
    quote:
      "Honestly the most comfortable stroller I've ever pushed. We've done 5-mile hikes with this thing and I never feel it the next day.",
    linkLabel: "See post",
    href: "https://www.instagram.com",
  },
];

export const COMMUNITY_ONLY_EVIDENCE: EvidenceItem[] = [
  {
    sourceType: "community",
    sourceName: "Reddit r/Strollers",
    quote:
      "We live in NYC and walk 6+ miles a day. Never had a complaint — it glides and the handle height is perfect for my 5'10\" husband too.",
    linkLabel: "See thread",
    href: "https://www.reddit.com/r/Strollers",
  },
  {
    sourceType: "community",
    sourceName: "Amazon Review",
    quote:
      "My toddler falls asleep on every single walk. Must be comfortable for them too! The ride is smooth even on our bumpy sidewalk.",
    linkLabel: "See review",
    href: "https://www.amazon.com",
  },
];
