import type { Meta, StoryObj } from "@storybook/react";
import { ProductInsightCard } from "compositions";
import {
  MAYA_BASIS,
  NOT_RECOMMENDED_INSIGHTS,
  RECOMMENDED_INSIGHTS,
} from "../../ui/compositions/ProductInsightCard/productInsightCard.fixtures";

const meta: Meta<typeof ProductInsightCard> = {
  component: ProductInsightCard,
  title: "Connie/Product Insight Card",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Connie's verdict on the product a shopper is viewing. Reads the agent's `product_insights` " +
          "payload as-is. Each insight opens to show CR and community evidence in separate, labeled " +
          "blocks, each with a link to its source. The verdict changes both the icon and the title, " +
          "never color alone. All data in these stories is synthetic.",
      },
    },
  },
  argTypes: {
    onClose: { action: "close" },
    onSavedChange: { action: "saved" },
    onFeedback: { action: "feedback" },
    onEditBasis: { action: "edit basis" },
  },
  args: { insights: RECOMMENDED_INSIGHTS, basis: MAYA_BASIS },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 220 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProductInsightCard>;

/** Figma 16:1589. The product fits Maya's priorities. */
export const Recommended: Story = {};

/** Figma 16:1650. The drawbacks are the verdict, so they stay in the list with drawback icons. */
export const NotRecommended: Story = {
  name: "Not recommended",
  args: { insights: NOT_RECOMMENDED_INSIGHTS },
};

/** Figma 16:1690. One insight open, CR and Reddit evidence each with its own label and link. */
export const Expanded: Story = {
  args: { defaultExpandedIndex: 0 },
};

/** Figma 16:1889. The info button opens what the verdict is based on. */
export const BasisOpen: Story = {
  name: "Tooltip open",
  args: { defaultBasisOpen: true },
};

/** A drawback on a recommended product shows as a "heads up" note under the list (Figma 16:1705). */
export const HeadsUp: Story = {
  name: "Heads up note",
  render: (args) => <ProductInsightCard {...args} />,
  play: async ({ canvasElement }) => {
    canvasElement.querySelector(".pic-scroll")?.scrollTo({ top: 1000 });
  },
};

/** Connie is still reading the page. Not drawn in Figma, see the component doc. */
export const Loading: Story = {
  args: { state: "loading" },
};
