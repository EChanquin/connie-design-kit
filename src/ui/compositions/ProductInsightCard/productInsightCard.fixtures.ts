import type { ProductInsightsPayload } from "../connie/connieContract";
import type { InsightBasis } from "./ProductInsightCard";

/*
 * Synthetic `product_insights` payloads, shaped exactly like the agent's JSON
 * (src/ui/compositions/connie/connieContract.ts). Copy follows the Connie Figma
 * (instances 16:1602, 16:1705, 16:1664). Verdicts and quotes are illustrative,
 * not real CR test results.
 *
 * Two quotes run past the contract's 20-word cap because the Figma copy does.
 * The card wraps them fine; the agent will send shorter ones.
 */

export const RECOMMENDED_INSIGHTS: ProductInsightsPayload = {
  product_name: "Baby Trend Passport Switch 6-in-1",
  verdict: "recommended",
  trivia: null,
  insights: [
    {
      label: "Top Rated",
      category: "value",
      sentiment: "positive",
      summary:
        "No bumps in the road here. CR and parents agree: this one earns its reputation.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "Baby Trend Stroller Review",
          source_url: "https://www.consumerreports.org/babies-kids/strollers/",
          quote:
            "Our lab testers scored this 91/100, with top marks across maneuverability, ease of use, and safety. Lab testers found it outperforms most competing strollers in these areas.",
        },
        {
          source_type: "reddit",
          source_name: "Best Strollers: Thread",
          source_url: "https://www.reddit.com/r/BeyondTheBump/",
          quote:
            "Users in r/BeyondtheBump and r/Parenting highly recommend this stroller as a long-term investment. Of 719 Reddit mentions surveyed, 567 were positive, with praise centered on ride smoothness, durability, and resale value.",
        },
      ],
    },
    {
      label: "City Certified",
      category: "maneuverability",
      sentiment: "positive",
      summary:
        "Built for the urban jungle. Handles sidewalks and curbs effortlessly and folds compactly.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR 2024 Lab Results",
          source_url: null,
          quote:
            "Turned tightly through our indoor course and climbed a standard curb without tipping.",
        },
        {
          source_type: "reddit",
          source_name: "City Strollers: Thread",
          source_url: "https://www.reddit.com/r/NewParents/",
          quote:
            "Takes our cracked Brooklyn sidewalks without a fight, and it fits on the bus.",
        },
      ],
    },
    {
      label: "Built to Last",
      category: "durability",
      sentiment: "positive",
      summary:
        "High-quality fabrics and wheels that make resale easy and hand-me-downs an option.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR 2024 Lab Results",
          source_url: null,
          quote:
            "Frame and wheels showed no wear after our 100-mile durability run.",
        },
        {
          source_type: "reddit",
          source_name: "Resale Value: Thread",
          source_url: "https://www.reddit.com/r/Parenting/",
          quote: "Sold ours after two kids and it still looked new.",
        },
      ],
    },
    {
      label: "Ride in Comfort",
      category: "comfort",
      sentiment: "positive",
      summary:
        "Plush seat, smooth suspension, happy kid. Fewer complaints from the passenger seat.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR 2024 Lab Results",
          source_url: null,
          quote:
            "All-wheel suspension absorbed bumps well on our gravel and grass tests.",
        },
        {
          source_type: "reddit",
          source_name: "Best Strollers: Thread",
          source_url: "https://www.reddit.com/r/BeyondTheBump/",
          quote: "My son naps through the whole walk now.",
        },
      ],
    },
    {
      label: "No-Fuss Fold",
      category: "fold",
      sentiment: "positive",
      summary: "Snaps open and folds shut in seconds — one hand, no wrestling.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR 2024 Lab Results",
          source_url: null,
          quote:
            "Folded with one hand in under five seconds in our ease-of-use test.",
        },
        {
          source_type: "reddit",
          source_name: "Fold Fails: Thread",
          source_url: "https://www.reddit.com/r/NewParents/",
          quote: "I can fold it while holding the baby, which is all I ask.",
        },
      ],
    },
    {
      label: "Heads up on comfort",
      category: "comfort",
      sentiment: "caution",
      summary:
        "Great pick overall — just note a few users noted that the seat was less comfortable than expected.",
      source_count: 0,
      evidence: [
        {
          source_type: "reddit",
          source_name: "Stroller Discussion: Thread",
          source_url: "https://www.reddit.com/r/Strollers/",
          quote: "The seat padding flattens out after a few months.",
        },
      ],
    },
  ],
};

export const NOT_RECOMMENDED_INSIGHTS: ProductInsightsPayload = {
  product_name: "Graco Ready2Grow 2.0 Double Stroller",
  verdict: "not_recommended",
  trivia: null,
  insights: [
    {
      label: "Low Rated",
      category: "value",
      sentiment: "caution",
      // The Figma frame repeats the "Top Rated" copy here. This line fits the label.
      summary: "CR and parents agree: this one falls short of its price.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR Stroller Ratings 2024",
          source_url: null,
          quote:
            "Scored 58/100, with low marks for maneuverability and ease of folding.",
        },
        {
          source_type: "reddit",
          source_name: "Double Strollers: Thread",
          source_url: "https://www.reddit.com/r/Parenting/",
          quote: "Returned it after a week. Too heavy for daily use.",
        },
      ],
    },
    {
      label: "Poor Maneuverability",
      category: "maneuverability",
      sentiment: "caution",
      summary:
        "Not built for the urban jungle. Struggles with sidewalks and curbs, and doesn't fold well.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR 2024 Lab Results",
          source_url: null,
          quote: "Wide turning radius made our indoor course slow and awkward.",
        },
        {
          source_type: "reddit",
          source_name: "City Strollers: Thread",
          source_url: "https://www.reddit.com/r/NewParents/",
          quote: "Doesn't fit through half the doors in my building.",
        },
      ],
    },
    {
      label: "Falls Apart Fast",
      category: "durability",
      sentiment: "caution",
      summary:
        "Cheap fabrics and wobbly wheels that make resale and hand-me-downs difficult.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR 2024 Lab Results",
          source_url: null,
          quote: "Front wheel developed a wobble during our durability run.",
        },
        {
          source_type: "reddit",
          source_name: "Resale Value: Thread",
          source_url: "https://www.reddit.com/r/Parenting/",
          quote: "Canopy fabric ripped within three months.",
        },
      ],
    },
    {
      label: "Bumpy Ride",
      category: "comfort",
      sentiment: "caution",
      // The Figma frame repeats the "Ride in Comfort" copy here. This line fits the label.
      summary:
        "Stiff wheels and thin padding. Expect complaints from the passenger seat.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR 2024 Lab Results",
          source_url: null,
          quote:
            "Little suspension; bumps carried straight through to the seat.",
        },
        {
          source_type: "reddit",
          source_name: "Stroller Discussion: Thread",
          source_url: "https://www.reddit.com/r/Strollers/",
          quote: "Every sidewalk crack wakes the baby.",
        },
      ],
    },
    {
      label: "Difficult to Fold",
      category: "fold",
      sentiment: "caution",
      summary: "Takes both hands and a few extra steps to close properly.",
      source_count: 1,
      evidence: [
        {
          source_type: "consumer_reports",
          source_name: "CR 2024 Lab Results",
          source_url: null,
          quote: "Three-step fold needed both hands in our ease-of-use test.",
        },
        {
          source_type: "reddit",
          source_name: "Fold Fails: Thread",
          source_url: "https://www.reddit.com/r/NewParents/",
          quote: "I need my partner's help to fold it every time.",
        },
      ],
    },
  ],
};

/** What Maya connected in onboarding (Figma 16:1889, popover 16:6299) */
export const MAYA_BASIS: InsightBasis = {
  sources: ["instagram", "reddit", "consumer_reports"],
  preferences: ["Long-term reliability", "Ease of use"],
};
