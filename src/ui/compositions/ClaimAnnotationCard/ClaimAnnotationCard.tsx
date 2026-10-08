import clsx from "clsx";
import {
  IconArrowUpRight,
  IconCheckCircle,
  IconHelpCircle,
  IconX,
  IconXCircle,
} from "icons";
import { Flex, Grid } from "layout";
import {
  Button,
  IconButton,
  TagButton,
  Text,
  TextHeading,
  TextSmallStrong,
} from "primitives";
import "./claimAnnotationCard.css";

export type ClaimAnnotationCardStatus =
  | "misleading"
  | "verified"
  | "verified-community"
  | "unable-to-verify";

export type EvidenceItem = {
  /** "cr" = Consumer Reports lab data; "community" = Reddit / Instagram / owner reviews */
  sourceType: "cr" | "community";
  sourceName: string;
  quote: string;
  linkLabel: string;
  href: string;
};

export type ClaimAnnotationCardProps = {
  /** The marketing claim being evaluated, e.g. "all-day comfort" */
  claim: string;
  status: ClaimAnnotationCardStatus;
  /** Pass CR evidence before community evidence so order matches the spec */
  evidence?: EvidenceItem[];
  onClose?: () => void;
  onAddSources?: () => void;
};

// Verdict row config — icon shape + title ensures state is never conveyed by color alone (WCAG 1.4.1)
// Lessons learned: distinct icon shape per state, not just color
const STATUS_CONFIG = {
  misleading: {
    Icon: IconXCircle,
    iconClass: "cac-icon--danger",
    title: "Misleading claim",
    subtitle: "Doesn't match what our testers and real users are saying.",
  },
  verified: {
    Icon: IconCheckCircle,
    iconClass: "cac-icon--positive",
    title: "Verified claim",
    subtitle: "Matches what our testers and real users are saying.",
  },
  "verified-community": {
    Icon: IconCheckCircle,
    iconClass: "cac-icon--positive",
    title: "Community verified",
    subtitle:
      "Our testers haven't reviewed this product, but it matches what real users are saying.",
  },
  "unable-to-verify": {
    Icon: IconHelpCircle,
    iconClass: "cac-icon--secondary",
    title: "Unable to verify claim",
    subtitle:
      "Connie didn't have enough info to confirm or dispute this claim. Add more trusted sources to help verify it.",
  },
} as const;

// Evidence card: source label always visible above quote — lessons learned: never blend CR and community
function EvidenceCard({ item }: { item: EvidenceItem }) {
  return (
    // Card: background-primary, border-subtle, radius-small
    <div className="cac-evidence-card">
      {/* Source eyebrow — Utility 2 (Semibold 12/16): makes source unmistakable */}
      <TextSmallStrong className="cac-source-eyebrow">
        {item.sourceName}
      </TextSmallStrong>
      {/* Quote — Utility 1 (Regular 14/20) */}
      <Text className="cac-quote">"{item.quote}"</Text>
      {/* Source chip — TagButton neutral/secondary + ArrowUpRight icon, href required */}
      <TagButton
        href={item.href}
        scheme="neutral"
        variant="secondary"
        className="cac-source-chip"
      >
        {item.linkLabel}
        <IconArrowUpRight size="14" aria-hidden />
      </TagButton>
    </div>
  );
}

/**
 * Connie's claim check card. Shows whether a marketing claim on a product
 * page holds up, with CR lab evidence and community evidence kept in
 * separate, labeled cards. Usage rules: context/design-system/claim-annotation-card.md
 */
export function ClaimAnnotationCard({
  claim,
  status,
  evidence = [],
  onClose,
  onAddSources,
}: ClaimAnnotationCardProps) {
  const { Icon: VerdictIcon, iconClass, title, subtitle } =
    STATUS_CONFIG[status];
  const showEvidence =
    status !== "unable-to-verify" && evidence.length > 0;

  return (
    // Outer card: background-secondary, radius-medium, drop shadow — max-width 520px
    <div
      className="claim-annotation-card connie-theme"
      role="region"
      aria-label={`Claim check: ${claim}`}
    >
      {/* Verdict row + close — Flex space-between */}
      <Flex alignPrimary="space-between" alignSecondary="start" gap="300">
        <Flex alignSecondary="center" gap="200">
          {/* Icon shape carries the state (XCircle / CheckCircle / HelpCircle) */}
          <VerdictIcon
            size="20"
            className={clsx("cac-icon", iconClass)}
            aria-hidden
          />
          {/* Title — Title 4 (Semibold 18/22, -0.25) */}
          <TextHeading elementType="h2" className="cac-verdict-title">
            {title}
          </TextHeading>
        </Flex>
        {onClose && (
          <IconButton
            variant="subtle"
            size="medium"
            aria-label="Close"
            onPress={onClose}
            className="cac-close-btn"
          >
            <IconX size="16" aria-hidden />
          </IconButton>
        )}
      </Flex>

      {/* Subtitle — Utility 1 (Regular 14/20) */}
      <Text className="cac-subtitle">{subtitle}</Text>

      {/* Evidence grid — 2 col desktop / 1 col mobile; lessons learned: source label above every quote */}
      {showEvidence && (
        <Grid
          columns="repeat(2, minmax(0, 1fr))"
          gap="400"
          className="cac-evidence-grid"
        >
          {evidence.map((item, i) => (
            <EvidenceCard key={i} item={item} />
          ))}
        </Grid>
      )}

      {/* Unable to verify: calm call-to-action, not an error state */}
      {status === "unable-to-verify" && (
        <Button variant="subtle" className="cac-add-sources-btn" onPress={onAddSources}>
          Add more sources
        </Button>
      )}
    </div>
  );
}
