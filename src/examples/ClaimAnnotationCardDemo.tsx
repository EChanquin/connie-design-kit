import { Flex, Grid, Section } from "layout";
import {
  Text,
  TextHeading,
  TextSmall,
  TextSubheading,
  TextTitlePage,
} from "primitives";
import { ClaimAnnotationCard, EvidenceItem } from "./ClaimAnnotationCard";

// ─── Stroller example data ────────────────────────────────────────────────────
// Maya is 7 months pregnant, researching strollers. The claim: "all-day comfort"

const MISLEADING_EVIDENCE: EvidenceItem[] = [
  {
    sourceType: "cr",
    sourceName: "Consumer Reports",
    quote:
      "In 200 hours of lab testing, testers reported significant discomfort after 3-hour walks. Handlebar padding scored in the bottom quartile.",
    linkLabel: "CR Lab Results",
    href: "https://www.consumerreports.org",
  },
  {
    sourceType: "community",
    sourceName: "Reddit r/BabyBumps",
    quote:
      "The seat gets really firm after about an hour. My back was aching by the end of our walk. Wish I'd tested it longer in the store.",
    linkLabel: "See thread",
    href: "https://www.reddit.com/r/BabyBumps",
  },
];

const VERIFIED_EVIDENCE: EvidenceItem[] = [
  {
    sourceType: "cr",
    sourceName: "Consumer Reports",
    quote:
      "Testers rated the handlebar cushioning and push-force score in the top 10% of strollers we've tested. Shoulder strain minimal at 4 hours.",
    linkLabel: "CR Lab Results",
    href: "https://www.consumerreports.org",
  },
  {
    sourceType: "community",
    sourceName: "Instagram @mamaofthree",
    quote:
      "Honestly the most comfortable stroller I've ever pushed. We've done 5-mile hikes with this thing and I never feel it the next day.",
    linkLabel: "See post",
    href: "https://www.instagram.com",
  },
];

const COMMUNITY_ONLY_EVIDENCE: EvidenceItem[] = [
  {
    sourceType: "community",
    sourceName: "Reddit r/Strollers",
    quote:
      "We live in NYC and walk 6+ miles a day. Never had a complaint — it glides and the handle height is perfect for my 5'10\" husband too.",
    linkLabel: "See thread",
    href: "https://www.reddit.com/r/Strollers",
  },
  {
    sourceType: "community",
    sourceName: "Amazon Review",
    quote:
      "My toddler falls asleep on every single walk. Must be comfortable for them too! The ride is smooth even on our bumpy sidewalk.",
    linkLabel: "See review",
    href: "https://www.amazon.com",
  },
];

// ─── State labels for the demo page ──────────────────────────────────────────
const STATES = [
  {
    status: "misleading" as const,
    label: "Misleading",
    description: "CR data and community sentiment both contradict the claim.",
    evidence: MISLEADING_EVIDENCE,
  },
  {
    status: "verified" as const,
    label: "Verified",
    description: "CR lab results and community experience both support it.",
    evidence: VERIFIED_EVIDENCE,
  },
  {
    status: "verified-community" as const,
    label: "Verified by community only",
    description: "No CR lab data yet, but community experience is consistent.",
    evidence: COMMUNITY_ONLY_EVIDENCE,
  },
  {
    status: "unable-to-verify" as const,
    label: "Unable to verify",
    description: "Not enough evidence to confirm or dispute the claim.",
    evidence: [],
  },
];

export function ClaimAnnotationCardDemo() {
  return (
    <main aria-labelledby="demo-heading">
      {/* Hero */}
      <Section padding="1600" variant="subtle">
        <Flex container direction="column" gap="400" alignSecondary="center">
          <TextSmall className="text-align-center" style={{ color: "var(--sds-color-text-default-secondary)" }}>
            Connie · Claim Annotation Card
          </TextSmall>
          <TextTitlePage
            elementType="h1"
            id="demo-heading"
            className="text-align-center"
          >
            All four states
          </TextTitlePage>
          <Text className="text-align-center" style={{ maxWidth: 560, margin: "0 auto" }}>
            When Maya hovers a highlighted claim on an Instagram-famous stroller
            listing, Connie opens this card. The claim under review:{" "}
            <strong>"all-day comfort."</strong>
          </Text>
        </Flex>
      </Section>

      {/* State gallery */}
      <Section padding="1600" variant="stroke">
        <Flex container direction="column" gap="1200">
          {STATES.map(({ status, label, description, evidence }) => (
            <Flex key={status} direction="column" gap="400">
              {/* State label */}
              <Flex direction="column" gap="100">
                <TextHeading elementType="h2">{label}</TextHeading>
                <TextSubheading>{description}</TextSubheading>
              </Flex>
              {/* Card — max-width 520px per spec */}
              <ClaimAnnotationCard
                claim="all-day comfort"
                status={status}
                evidence={evidence}
                onClose={() => {}}
              />
            </Flex>
          ))}
        </Flex>
      </Section>

      {/* Side-by-side comparison (desktop) */}
      <Section padding="1600" variant="subtle">
        <Flex container direction="column" gap="800">
          <Flex direction="column" gap="200">
            <TextHeading elementType="h2">All states, side by side</TextHeading>
            <TextSubheading>
              Each state uses a distinct icon shape and title — state is never
              conveyed by color alone. (WCAG 1.4.1)
            </TextSubheading>
          </Flex>
          <Grid
            columns="repeat(auto-fit, minmax(min(100%, 480px), 1fr))"
            gap="600"
          >
            {STATES.map(({ status, label, evidence }) => (
              <Flex key={status} direction="column" gap="200">
                <TextSmall
                  style={{ color: "var(--sds-color-text-default-secondary)" }}
                >
                  {label}
                </TextSmall>
                <ClaimAnnotationCard
                  claim="all-day comfort"
                  status={status}
                  evidence={evidence}
                  onClose={() => {}}
                />
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Section>
    </main>
  );
}
