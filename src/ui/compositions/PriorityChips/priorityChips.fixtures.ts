import type { PriorityInferencePayload } from "../connie/connieContract";
import type { Priority } from "./PriorityChips";

/*
 * Synthetic priority_inference data for Maya (walk-up apartment, takes the bus).
 * Copy follows the Connie Figma Priority Inference frames (16:2306 to 16:2938).
 */

/** Figma 16:2306. Connie's starting point for any stroller shopper. */
export const STARTING_PRIORITIES: Priority[] = [
  { label: "Safety", status: "suggested" },
  { label: "Durability", status: "suggested" },
  { label: "Easy Fold", status: "suggested" },
  { label: "Lightweight", status: "suggested" },
];

/** Figma 16:2555. After "Apartment without elevator". */
export const AFTER_APARTMENT: Priority[] = [
  {
    label: "Lightweight",
    status: "boosted",
    reason: "More important for your lifestyle",
  },
  { label: "Safety", status: "confirmed" },
  { label: "Easy Fold", status: "confirmed" },
  { label: "Durability", status: "confirmed" },
];

/** Figma 16:2841. After "Mostly public transit". */
export const AFTER_COMMUTE: Priority[] = [
  {
    label: "Easy Fold",
    status: "boosted",
    reason: "Recommended based on your commute",
  },
  {
    label: "Lightweight",
    status: "boosted",
    reason: "More important for your lifestyle",
  },
  { label: "Safety", status: "confirmed" },
  { label: "Durability", status: "confirmed" },
];

/** Maya decided Durability doesn't matter for her. */
export const WITH_REMOVED: Priority[] = [
  {
    label: "Easy Fold",
    status: "boosted",
    reason: "Recommended based on your commute",
  },
  {
    label: "Lightweight",
    status: "boosted",
    reason: "More important for your lifestyle",
  },
  { label: "Safety", status: "confirmed" },
  { label: "Durability", status: "removed" },
];

/** The agent payload behind 16:2306, read as-is. */
export const STARTING_PAYLOAD: PriorityInferencePayload = {
  message:
    "Since you're shopping for a stroller, I've started with the priorities most parents care about. These are just a starting point — I'll tailor them to your situation.",
  suggested_priorities: ["Safety", "Durability", "Easy Fold", "Lightweight"],
  follow_up_question:
    "To help narrow the best options, do you live in an apartment or a house?",
  answer_options: [
    "Apartment with elevator",
    "Apartment without elevator",
    "House",
  ],
};

/** Turns the agent's suggested_priorities into chips Connie hasn't tailored yet. */
export const prioritiesFromPayload = (
  payload: PriorityInferencePayload,
): Priority[] =>
  payload.suggested_priorities.map((label) => ({ label, status: "suggested" }));
