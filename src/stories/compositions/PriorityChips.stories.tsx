import type { Meta, StoryObj } from "@storybook/react";
import { PriorityChips, type Priority } from "compositions";
import { useState } from "react";
import {
  AFTER_APARTMENT,
  AFTER_COMMUTE,
  STARTING_PAYLOAD,
  WITH_REMOVED,
  prioritiesFromPayload,
} from "../../ui/compositions/PriorityChips/priorityChips.fixtures";

const meta: Meta<typeof PriorityChips> = {
  component: PriorityChips,
  title: "Connie/Priority Chips",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Connie's read on what matters to the shopper, ranked. Connie suggests a starting set, raises " +
          "priorities when the shopper's answers point to them, and says why. With `editable`, the shopper " +
          "can move, remove and restore every chip, so she stays in control of what Connie inferred. " +
          "Rank, outline, sparkle and reason text carry each state, never color alone. All data is synthetic.",
      },
    },
  },
  argTypes: {
    onReorder: { action: "reorder" },
    onRemove: { action: "remove" },
    onRestore: { action: "restore" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 402,
          padding: 24,
          background: "var(--connie-color-background-secondary)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PriorityChips>;

/** Figma 16:2306. Connie's starting point, built from the agent payload as-is. */
export const Suggested: Story = {
  args: { priorities: prioritiesFromPayload(STARTING_PAYLOAD) },
};

/** Figma 16:2555. Lightweight moves up after "Apartment without elevator". */
export const OneBoosted: Story = {
  name: "Inferred, one raised",
  args: { priorities: AFTER_APARTMENT },
};

/** Figma 16:2841. Easy Fold moves up after "Mostly public transit". */
export const Confirmed: Story = {
  name: "Inferred and confirmed",
  args: { priorities: AFTER_COMMUTE },
};

/** Maya took Durability off. It keeps its place so she can bring it back. */
export const Removed: Story = {
  args: { priorities: WITH_REMOVED, editable: true },
};

/** Connie is still working them out. */
export const Loading: Story = { args: { priorities: [], state: "loading" } };

/** Fully interactive. Move, remove and undo. */
export const Editable: Story = {
  render: () => {
    const [items, setItems] = useState<Priority[]>(AFTER_COMMUTE);
    return (
      <PriorityChips
        priorities={items}
        editable
        onReorder={(labels) =>
          setItems([
            ...labels.map((l) => items.find((p) => p.label === l)!),
            ...items.filter((p) => p.status === "removed"),
          ])
        }
        onRemove={(label) =>
          setItems(
            items.map((p) =>
              p.label === label ? { ...p, status: "removed" } : p,
            ),
          )
        }
        onRestore={(label) =>
          setItems(
            items.map((p) =>
              p.label === label ? { ...p, status: "confirmed" } : p,
            ),
          )
        }
      />
    );
  },
};
