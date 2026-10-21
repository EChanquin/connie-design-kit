import type { PostPurchasePayload } from "../connie/connieContract";
import vista from "./assets/uppababy-vista.png";
import type { CheckInProduct, CheckInStep } from "./CheckInCard";

/*
 * Synthetic check-in for Maya, three weeks after she saved the UppaBaby Vista.
 * Copy follows the Connie Figma Post-Purchase frames (16:3966 to 16:4307).
 * Answers outside the Figma path get short, plain replies so the flow still ends.
 */

export const CHECK_IN_PRODUCT: CheckInProduct = {
  name: "UppaBaby Vista V2",
  image: vista,
  rankLabel: "#1 Best Match",
  price: "$999.00",
  retailer: "Amazon",
};

/** The agent payload behind 16:3966, read as-is */
export const FIRST_CHECK_IN: PostPurchasePayload = {
  message:
    "Hey! You're browsing baby bottles now - but you saved the UPPAbaby Vista three weeks ago. Did you end up buying it? 20 seconds here helps other parents like you choose.",
  product_name: "UppaBaby Vista V2",
  weeks_since_purchase: 3,
  sentiment_options: [
    "Yes - I bought it",
    "Not yet",
    "Bought a different one",
    "Other",
  ],
  community_stat: null,
  follow_up_question: null,
};

const HOW_IS_IT = ["Love it", "It's fine", "Not what I hoped", "Other"];
const WHAT_BETTER = ["Fold & portability", "Comfort", "Durability", "Other"];

const SECOND_REPLY: Record<string, string> = {
  "Love it": "Love it - worth every penny",
};

const THIRD_MESSAGE: Record<string, string> = {
  "Love it": "Love that. Quick one - what would've made it even better?",
  "It's fine": "Good to know. What would've made it better?",
  "Not what I hoped": "Sorry to hear that. What fell short?",
  Other: "Thanks. What would've made it better?",
};

export const CHECK_IN_THANKS =
  "Thanks! Your take just helped 3 parents deciding right now! Keep up the good work!";

/**
 * The check-in so far, from the answers Maya has given. Pure, so stories can show any
 * step and the walkthrough can play it live.
 */
export function checkInScript(answers: string[]): {
  steps: CheckInStep[];
  thanks?: string;
} {
  const [bought, feeling, better] = answers;
  const steps: CheckInStep[] = [
    {
      message: FIRST_CHECK_IN.message,
      options: FIRST_CHECK_IN.sentiment_options,
      answer: bought,
    },
  ];
  if (!bought) return { steps };

  if (bought !== "Yes - I bought it") {
    const close =
      bought === "Not yet"
        ? "No rush. I'll check back in a few weeks."
        : "Got it, thanks. That still helps other parents.";
    return { steps, thanks: close };
  }

  steps.push({
    message: "How's it treating you?",
    options: HOW_IS_IT,
    answer: feeling,
    reply: feeling && SECOND_REPLY[feeling],
  });
  if (!feeling) return { steps };

  steps.push({
    message: THIRD_MESSAGE[feeling],
    options: WHAT_BETTER,
    answer: better,
    silent: true,
  });
  if (!better) return { steps };

  return { steps, thanks: CHECK_IN_THANKS };
}
