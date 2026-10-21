import type { DecisionSupportPayload, Insight } from "../connie/connieContract";
import { RECOMMENDED_INSIGHTS } from "../ProductInsightCard/productInsightCard.fixtures";
import cityMini from "./assets/baby-jogger-city-mini-gt2.png";
import vista from "./assets/uppababy-vista-v2.png";
import type { RetailerOffer } from "./DecisionSupport";

/*
 * Synthetic `decision_support` payload, shaped exactly like the agent's JSON.
 * Products, specs and copy follow the Connie Figma (16:3212 cards, 16:3032 table).
 * Not real CR results.
 *
 * Two things in the Figma copy don't match Maya's story. The verdict mentions a
 * "Rural/Active" profile and the #1 pick is the heavier, 2-step stroller, while her
 * priorities say Easy Fold and Lightweight. The copy is kept as designed and flagged
 * for the team. The Figma also lists the City Mini GT2 at $399.99 on the card and
 * $449 in the table. One price is used here so the views agree.
 */

export const MAYA_SHORTLIST: DecisionSupportPayload = {
  cr_verdict:
    'The Vista V2 is heavier but offers superior durability and all-terrain performance which matches your "Rural/Active" preference profile.',
  products: [
    {
      rank: 1,
      rank_label: "#1 BEST MATCH",
      product_name: "UppaBaby Vista V2",
      price: "$999.00",
      retailer: "Amazon",
      recommendation_rationale:
        "Matches your high-priority for all-terrain stability. The dual-action suspension system is rated top-tier for gravel and uneven paths.",
      priority_matches: [],
      evidence_badges: ["CR 2024 Lab Results", "Reddit Community"],
      specs: { fold: "2-Step", weight: "27lb", terrain: "All terrain" },
    },
    {
      rank: 2,
      rank_label: "#2 RUNNER UP",
      product_name: "Baby Jogger City Mini GT2",
      price: "$399.99",
      retailer: "Walmart",
      recommendation_rationale:
        "Excellent for your secondary need for compact storage. One-hand quick fold outperforms competitors in tight trunks.",
      priority_matches: [],
      evidence_badges: ["CR Safety Certification"],
      specs: { fold: "1-Hand", weight: "21lb", terrain: "All terrain" },
    },
    {
      rank: 3,
      rank_label: "NOT RECOMMENDED",
      product_name: "Lite 3",
      price: "$199",
      retailer: null,
      recommendation_rationale: null,
      priority_matches: [],
      evidence_badges: [],
      specs: { fold: "3-Step", weight: "15lb", terrain: "Pavement only" },
    },
    {
      rank: 4,
      rank_label: "#4",
      product_name: "Mockingbird",
      price: "$650",
      retailer: null,
      recommendation_rationale: null,
      priority_matches: [],
      evidence_badges: [],
      specs: { fold: "2-Step", weight: "26lb", terrain: "All terrain" },
    },
    {
      rank: 5,
      rank_label: "#5",
      product_name: "Cruz V2",
      price: "$699",
      retailer: null,
      recommendation_rationale: null,
      priority_matches: [],
      evidence_badges: [],
      specs: { fold: "2-Step", weight: "25lb", terrain: "All terrain" },
    },
    {
      rank: 6,
      rank_label: "#6",
      product_name: "Urban Glide 2",
      price: "$649",
      retailer: null,
      recommendation_rationale: null,
      priority_matches: [],
      evidence_badges: [],
      specs: { fold: "1-Hand", weight: "25lb", terrain: "All terrain" },
    },
    {
      rank: 7,
      rank_label: "#7",
      product_name: "Minu V2",
      price: "$449",
      retailer: null,
      recommendation_rationale: null,
      priority_matches: [],
      evidence_badges: [],
      specs: { fold: "1-Hand", weight: "17lb", terrain: "Pavement only" },
    },
    {
      rank: 8,
      rank_label: "#8",
      product_name: "G-Luxe",
      price: "$199",
      retailer: null,
      recommendation_rationale: null,
      priority_matches: [],
      evidence_badges: [],
      specs: { fold: "3-Step", weight: "16lb", terrain: "Pavement only" },
    },
    {
      rank: 9,
      rank_label: "#9",
      product_name: "Mixx Next",
      price: "$800",
      retailer: null,
      recommendation_rationale: null,
      priority_matches: [],
      evidence_badges: [],
      specs: { fold: "2-Step", weight: "28lb", terrain: "All terrain" },
    },
  ],
};

/** Product photos exported from the Figma, by product name */
export const SHORTLIST_IMAGES: Record<string, string> = {
  "UppaBaby Vista V2": vista,
  "Baby Jogger City Mini GT2": cityMini,
};

/** Figma 16:3632 */
export const SHORTLIST_OFFERS: Record<string, RetailerOffer[]> = {
  "UppaBaby Vista V2": [
    {
      retailer: "Amazon",
      price: "$899.99",
      deal: "PRIME DEAL: 10% OFF",
      dealTone: "brand",
      best: true,
    },
    {
      retailer: "Target",
      price: "$949.99",
      deal: "REDCARD: 5% OFF",
      dealTone: "attention",
    },
    {
      retailer: "BuyBuy Baby",
      price: "$999.00",
      deal: "FREE SHIPPING",
      dealTone: "neutral",
    },
  ],
};

/** Figma 16:4565 reuses the Product Insights rows as "Lab & user metrics" */
export const SHORTLIST_METRICS: Record<string, Insight[]> = {
  "UppaBaby Vista V2": RECOMMENDED_INSIGHTS.insights
    .filter((i) => i.sentiment === "positive")
    .slice(0, 3),
};
