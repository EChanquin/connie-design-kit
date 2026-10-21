import type { Meta, StoryObj } from "@storybook/react";
import {
  DecisionCard,
  DecisionSupportPanel,
  DecisionTable,
} from "compositions";
import {
  MAYA_SHORTLIST,
  SHORTLIST_IMAGES,
  SHORTLIST_METRICS,
  SHORTLIST_OFFERS,
} from "../../ui/compositions/DecisionSupport/decisionSupport.fixtures";

const meta: Meta<typeof DecisionSupportPanel> = {
  component: DecisionSupportPanel,
  title: "Connie/Decision Support",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Maya's saved shortlist, ranked against her priorities. Reads the agent's `decision_support` " +
          "payload as-is and shows it as cards or a table, in the side panel or expanded. Rank text, " +
          "check and X marks, and badges carry every state, never color alone. All data is synthetic.",
      },
    },
  },
  args: {
    decision: MAYA_SHORTLIST,
    images: SHORTLIST_IMAGES,
    offers: SHORTLIST_OFFERS,
    metrics: SHORTLIST_METRICS,
  },
  argTypes: {
    onShare: { action: "share" },
    onDelete: { action: "delete" },
    onViewReview: { action: "view review" },
    onClose: { action: "close" },
  },
};
export default meta;

type Story = StoryObj<typeof DecisionSupportPanel>;

/** Figma 16:3212 */
export const Cards: Story = {};

/** Figma 16:3326. Selecting enables Share and Delete. */
export const OneSelected: Story = {
  name: "Cards, one selected",
  args: { defaultSelected: ["UppaBaby Vista V2"] },
};

/** Figma 16:3032 */
export const Table: Story = { args: { defaultView: "table" } };

/** Figma 16:3632. The retailer tag opens every price Connie found. */
export const ComparePrices: Story = {
  name: "Compare retailers",
  args: { defaultCompareFor: "UppaBaby Vista V2" },
};

/** Figma 16:4962 */
export const Expanded: Story = {
  name: "Expanded cards",
  args: {
    defaultExpanded: true,
    defaultSelected: ["UppaBaby Vista V2", "Baby Jogger City Mini GT2"],
  },
};

/** Figma 16:4565. "Show details" opens the lab and owner metrics. */
export const ExpandedDetails: Story = {
  name: "Expanded cards, details open",
  args: { defaultExpanded: true, defaultDetailsOpen: true, cardLimit: 1 },
};

/** Figma 16:4735 */
export const ExpandedTable: Story = {
  name: "Expanded table",
  args: { defaultExpanded: true, defaultView: "table" },
};

/** The card on its own, for other screens such as the shared list. */
export const SingleCard: StoryObj<typeof DecisionCard> = {
  name: "Decision Card",
  render: () => (
    <div style={{ width: 472 }}>
      <DecisionCard
        product={MAYA_SHORTLIST.products[0]}
        image={SHORTLIST_IMAGES["UppaBaby Vista V2"]}
        offers={SHORTLIST_OFFERS["UppaBaby Vista V2"]}
      />
    </div>
  ),
};

/** The table on its own. */
export const SingleTable: StoryObj<typeof DecisionTable> = {
  name: "Decision Table",
  render: () => (
    <div style={{ width: 472 }}>
      <DecisionTable products={MAYA_SHORTLIST.products} />
    </div>
  ),
};
