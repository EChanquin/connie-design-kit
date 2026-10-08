import type { Meta, StoryObj } from "@storybook/react";
import { ClaimAnnotationCard } from "compositions";
import { Flex } from "layout";
import {
  COMMUNITY_ONLY_EVIDENCE,
  MISLEADING_EVIDENCE,
  VERIFIED_EVIDENCE,
} from "../../ui/compositions/ClaimAnnotationCard/claimAnnotationCard.fixtures";

const meta: Meta<typeof ClaimAnnotationCard> = {
  component: ClaimAnnotationCard,
  title: "Connie/Claim Annotation Card",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Opens when a shopper hovers or tabs to a highlighted claim on a product page. " +
          "Shows Connie's verdict and the evidence behind it. CR lab evidence and community " +
          "evidence always sit in separate cards with the source labeled above the quote. " +
          "Each state has its own icon shape and title, so the verdict never depends on color alone. " +
          "All data in these stories is synthetic.",
      },
    },
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["misleading", "verified", "verified-community", "unable-to-verify"],
    },
    onClose: { action: "close" },
    onAddSources: { action: "add sources" },
  },
  args: {
    claim: "all-day comfort",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 520, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ClaimAnnotationCard>;

/** CR lab data and community evidence both contradict the claim. */
export const Misleading: Story = {
  args: { status: "misleading", evidence: MISLEADING_EVIDENCE },
};

/** CR lab data and community evidence both support the claim. */
export const Verified: Story = {
  args: { status: "verified", evidence: VERIFIED_EVIDENCE },
};

/** No CR test yet, but community evidence agrees. Titled differently so it can't pass for a full verification. */
export const CommunityVerified: Story = {
  name: "Community verified",
  args: { status: "verified-community", evidence: COMMUNITY_ONLY_EVIDENCE },
};

/** Not enough evidence. No evidence cards are shown, only a path to add sources. */
export const UnableToVerify: Story = {
  name: "Unable to verify",
  args: { status: "unable-to-verify", evidence: [] },
};

/** All four states stacked, for comparing icon shape and title at a glance. */
export const AllStates: Story = {
  name: "All states",
  decorators: [
    () => (
      <Flex direction="column" gap="600">
        <ClaimAnnotationCard claim="all-day comfort" status="misleading" evidence={MISLEADING_EVIDENCE} onClose={() => {}} />
        <ClaimAnnotationCard claim="all-day comfort" status="verified" evidence={VERIFIED_EVIDENCE} onClose={() => {}} />
        <ClaimAnnotationCard claim="all-day comfort" status="verified-community" evidence={COMMUNITY_ONLY_EVIDENCE} onClose={() => {}} />
        <ClaimAnnotationCard claim="all-day comfort" status="unable-to-verify" onClose={() => {}} />
      </Flex>
    ),
  ],
};
