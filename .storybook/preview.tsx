import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/theme.css";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          "Connie",
          [
            "Introduction",
            "Product Insight Card",
            "Claim Annotation Card",
            "Priority Chips",
            "Decision Support",
            "Check-In Card",
          ],
        ],
      },
    },
    docs: {
      theme: theme,
    },
  },

  tags: [],
};

export default preview;
