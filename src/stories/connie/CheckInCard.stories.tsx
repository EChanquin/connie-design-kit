import type { Meta, StoryObj } from "@storybook/react";
import { CheckInCard } from "compositions";
import { useState } from "react";
import {
  CHECK_IN_PRODUCT,
  checkInScript,
} from "../../ui/compositions/CheckInCard/checkInCard.fixtures";

const meta: Meta<typeof CheckInCard> = {
  component: CheckInCard,
  title: "Connie/Check-In Card",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Connie checks in weeks after a purchase and asks how it went, one tap at a time. Her answers go " +
          "back to the community so the next parent decides with them. Her pick keeps an outline and her " +
          "reply shows on the right, so the state reads without color. All data is synthetic.",
      },
    },
  },
  args: { product: CHECK_IN_PRODUCT },
  argTypes: { onAnswer: { action: "answer" }, onClose: { action: "close" } },
};
export default meta;

type Story = StoryObj<typeof CheckInCard>;

/** Figma 16:3966 */
export const Asking: Story = { args: { ...checkInScript([]) } };

/** Figma 16:4027 */
export const Answered: Story = {
  args: { ...checkInScript(["Yes - I bought it"]), typing: true },
};

/** Figma 16:4081 */
export const SecondQuestion: Story = {
  name: "Second question",
  args: { ...checkInScript(["Yes - I bought it"]) },
};

/** Figma 16:4146 */
export const ThirdQuestion: Story = {
  name: "Third question",
  args: { ...checkInScript(["Yes - I bought it", "Love it"]) },
};

/** Figma 16:4307 */
export const Thanks: Story = {
  name: "Thank-you",
  args: { ...checkInScript(["Yes - I bought it", "Love it", "Durability"]) },
};

/** Not yet bought. The check-in ends early and comes back later. */
export const NotYet: Story = {
  name: "Not yet",
  args: { ...checkInScript(["Not yet"]) },
};

/** Fully interactive. */
export const Playable: Story = {
  render: () => {
    const [answers, setAnswers] = useState<string[]>([]);
    return (
      <CheckInCard
        product={CHECK_IN_PRODUCT}
        {...checkInScript(answers)}
        onAnswer={(i, o) => setAnswers([...answers.slice(0, i), o])}
      />
    );
  },
};
