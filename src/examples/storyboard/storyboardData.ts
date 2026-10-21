// Maya's journey through Connie, mapped to the agentic workflow.
// Every frame is a final pick from Figma file seIFNV68pokebhWO9F0OS9, page 16:2.
// See prompts/frame-picks.md for why each frame is in or out.

export type StoryboardFrame = {
  /** Figma node ID, e.g. "16:1161" */
  nodeId: string;
  /** What this screen shows, a few words */
  caption: string;
};

export type StoryboardStage = {
  id: string;
  /** Step in the agentic workflow */
  workflow: string;
  title: string;
  /** Maya's moment, one line */
  maya: string;
  /** What Connie does, one line */
  connie: string;
  /** Route in the live demo, when this stage is built */
  liveHref?: string;
  frames: StoryboardFrame[];
};

export const STORYBOARD_STAGES: StoryboardStage[] = [
  {
    id: "install",
    workflow: "Entry",
    title: "Finds Connie",
    maya: "Maya finds Connie in the Chrome Web Store while she researches strollers.",
    connie: "Connie promises CR's lab results and real owner takes on any product page, with no sponsors.",
    frames: [{ nodeId: "16:6340", caption: "Chrome Web Store listing" }],
  },
  {
    id: "onboarding",
    workflow: "Onboarding",
    title: "Tells Connie what she cares about",
    maya: "Maya picks the communities she trusts and the values she shops by.",
    connie: "Connie asks two questions up front and spells out what it will and won't read.",
    frames: [
      { nodeId: "16:1161", caption: "Welcome" },
      { nodeId: "16:1176", caption: "New or CR member" },
      { nodeId: "16:4500", caption: "Member log in" },
      { nodeId: "16:1194", caption: "Three promises" },
      { nodeId: "16:1233", caption: "Communities, empty" },
      { nodeId: "16:1285", caption: "Communities, picked" },
      { nodeId: "16:1337", caption: "Values, empty" },
      { nodeId: "16:1372", caption: "Values, picked" },
      { nodeId: "16:1422", caption: "Permissions" },
      { nodeId: "16:1405", caption: "All set" },
    ],
  },
  {
    id: "orientation",
    workflow: "Orientation",
    title: "Learns where Connie lives",
    maya: "Maya lands on Amazon and sees Connie on the page for the first time.",
    connie: "Connie gives a short tour of the stars, the side panel and claim highlights, then steps back.",
    frames: [
      { nodeId: "16:1486", caption: "Stars mark her fits" },
      { nodeId: "16:1539", caption: "Tap a star for CR's take" },
      { nodeId: "16:1557", caption: "Tour ends" },
      { nodeId: "16:1572", caption: "Open Connie anytime" },
      { nodeId: "16:1910", caption: "Claim highlights" },
    ],
  },
  {
    id: "insights",
    liveHref: "#insights",
    workflow: "Observe / Understand",
    title: "Sees whether a stroller fits her",
    maya: "Maya taps the star on a stroller she likes.",
    connie: "Connie gives a verdict and keeps CR's tests and community takes in separate, labeled cards.",
    frames: [
      { nodeId: "16:6717", caption: "Reading the page" },
      { nodeId: "16:1589", caption: "Recommended" },
      { nodeId: "16:1650", caption: "Not recommended" },
      { nodeId: "16:1690", caption: "Evidence expanded" },
      { nodeId: "16:1889", caption: "What the verdict is based on" },
    ],
  },
  {
    id: "claims",
    workflow: "Investigate",
    title: "Checks a marketing claim",
    maya: "Maya doubts the listing's claim about a padded, comfortable seat.",
    connie: "Connie checks the claim against CR tests and owner reports, and says so when it can't tell.",
    liveHref: "#claims",
    frames: [
      { nodeId: "16:1880", caption: "Claims highlighted" },
      { nodeId: "16:6702", caption: "Checking" },
      { nodeId: "16:1761", caption: "Verified by CR and owners" },
      { nodeId: "16:1809", caption: "Verified by owners only" },
      { nodeId: "16:1712", caption: "Misleading" },
      { nodeId: "16:1859", caption: "Unable to verify" },
    ],
  },
  {
    id: "priorities",
    liveHref: "#priorities",
    workflow: "Understand",
    title: "Connie learns her priorities",
    maya: "Maya answers two questions about her walk-up apartment and her bus commute.",
    connie: "Connie moves Lightweight and Easy Fold to the top, explains why, and lets her reorder.",
    frames: [
      { nodeId: "16:2401", caption: "Figure it out or top 5" },
      { nodeId: "16:2306", caption: "Starting priorities" },
      { nodeId: "16:2460", caption: "Walk-up apartment" },
      { nodeId: "16:6729", caption: "Thinking" },
      { nodeId: "16:2555", caption: "Lightweight moves up" },
      { nodeId: "16:2653", caption: "How she travels" },
      { nodeId: "16:2747", caption: "Public transit" },
      { nodeId: "16:2841", caption: "Easy Fold moves up" },
      { nodeId: "16:2938", caption: "Matches narrowed to 11" },
    ],
  },
  {
    id: "decide",
    liveHref: "#decide",
    workflow: "Support Decision",
    title: "Compares her shortlist",
    maya: "Maya puts her saved strollers side by side.",
    connie: "Connie ranks them against her priorities, and the choice stays hers.",
    frames: [
      { nodeId: "16:3212", caption: "Ranked cards" },
      { nodeId: "16:3326", caption: "One selected" },
      { nodeId: "16:3512", caption: "All selected" },
      { nodeId: "16:4962", caption: "Expanded cards" },
      { nodeId: "16:4565", caption: "Lab and owner metrics" },
      { nodeId: "16:3032", caption: "Table view" },
      { nodeId: "16:4735", caption: "Expanded table" },
      { nodeId: "16:3632", caption: "Compare retailers" },
      { nodeId: "16:3782", caption: "Full review" },
    ],
  },
  {
    id: "share",
    workflow: "Intervene",
    title: "Brings her partner in",
    maya: "Maya wants Alex to weigh in before she buys.",
    connie: "Connie turns her private list into a shared one, and she picks what Alex can see and do.",
    frames: [
      { nodeId: "16:1929", caption: "Private list" },
      { nodeId: "16:2124", caption: "Share sheet" },
      { nodeId: "16:2176", caption: "Alex added" },
      { nodeId: "16:2232", caption: "Permissions" },
      { nodeId: "16:2025", caption: "Shared list" },
    ],
  },
  {
    id: "check-in",
    workflow: "After purchase",
    title: "Connie checks in",
    maya: "Three weeks later, Maya is shopping for baby bottles.",
    connie: "Connie asks how the stroller is working out, and her answer helps the next parent.",
    frames: [
      { nodeId: "16:4017", caption: "A quiet nudge" },
      { nodeId: "16:3966", caption: "Did you buy it?" },
      { nodeId: "16:4027", caption: "Yes, she did" },
      { nodeId: "16:4081", caption: "How is it?" },
      { nodeId: "16:4146", caption: "What could be better?" },
      { nodeId: "16:4231", caption: "Durability" },
      { nodeId: "16:4307", caption: "Her take helped 3 parents" },
    ],
  },
];
