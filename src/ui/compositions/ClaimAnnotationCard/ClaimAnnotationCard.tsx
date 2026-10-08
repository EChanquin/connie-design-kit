import clsx from "clsx";
import { Button } from "primitives";
import { SOURCE_LOGOS } from "./sourceLogos";
import "./claimAnnotationCard.css";
import {
  CloseIcon,
  SourceArrowIcon,
  SourceLinkIcon,
  VerdictCheckCircle,
  VerdictQuestionCircle,
  VerdictXCircle,
} from "./claimAnnotationIcons";

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
  /** Optional 16px source logo. CR evidence falls back to the CR logo. */
  logoSrc?: string;
};

export type ClaimAnnotationCardProps = {
  /** The marketing claim being evaluated, e.g. "all-day comfort" */
  claim: string;
  status: ClaimAnnotationCardStatus;
  /** Pass CR evidence before community evidence so order matches the spec */
  evidence?: EvidenceItem[];
  onClose?: () => void;
  onAddSources?: () => void;
  className?: string;
};

// Icon shape + title carry the state, never color alone (WCAG 1.4.1)
const STATUS_CONFIG = {
  misleading: {
    Icon: VerdictXCircle,
    tone: "danger",
    title: "Misleading claim",
    subtitle: "Doesn't match what our testers and real users are saying.",
  },
  verified: {
    Icon: VerdictCheckCircle,
    tone: "positive",
    title: "Verified claim",
    subtitle: "Matches what our testers and real users are saying.",
  },
  "verified-community": {
    Icon: VerdictCheckCircle,
    tone: "positive",
    title: "Community verified",
    subtitle:
      "Our testers haven't reviewed this product, but it matches what real users are saying.",
  },
  "unable-to-verify": {
    Icon: VerdictQuestionCircle,
    tone: "neutral",
    title: "Unable to verify claim",
    subtitle:
      "Connie didn't have enough info to confirm or dispute this claim. Add more trusted sources to help verify it.",
  },
} as const;

// One card per source, label above the quote. Never blend CR and community.
function EvidenceCard({ item }: { item: EvidenceItem }) {
  const logo = item.logoSrc ?? (item.sourceType === "cr" ? SOURCE_LOGOS.cr : undefined);
  return (
    <div className="cac-evidence-card">
      <div className="cac-source-group">
        <div className="cac-source-row">
          {logo && (
            <img
              src={logo}
              width={16}
              height={16}
              alt=""
              className="cac-source-logo"
            />
          )}
          <span className="cac-source-name">{item.sourceName}</span>
        </div>
        <p className="cac-quote">"{item.quote}"</p>
      </div>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="cac-source-chip"
      >
        <SourceLinkIcon className="cac-chip-icon" />
        <span>{item.linkLabel}</span>
        <SourceArrowIcon className="cac-chip-icon" />
        <span className="cac-visually-hidden"> (opens in a new tab)</span>
      </a>
    </div>
  );
}

/**
 * Connie's claim check card. Shows whether a marketing claim on a product
 * page holds up, with CR lab evidence and community evidence kept in
 * separate, labeled cards. Matches the Connie Figma (Vision Board, nodes
 * 16:6796 and 16:6860). Usage rules: context/design-system/components/claim-annotation-card.md
 */
export function ClaimAnnotationCard({
  claim,
  status,
  evidence = [],
  onClose,
  onAddSources,
  className,
}: ClaimAnnotationCardProps) {
  const { Icon, tone, title, subtitle } = STATUS_CONFIG[status];
  const showEvidence = status !== "unable-to-verify" && evidence.length > 0;

  return (
    <div
      className={clsx("claim-annotation-card connie-theme", className)}
      role="region"
      aria-label={`Claim check: ${claim}`}
    >
      <div className="cac-heading-group">
        <div className="cac-header">
          <div className="cac-verdict-row">
            <Icon
              className={clsx("cac-verdict-icon", `cac-verdict-icon--${tone}`)}
            />
            <h2 className="cac-verdict-title">{title}</h2>
          </div>
          {onClose && (
            <button
              type="button"
              className="cac-close-btn"
              onClick={onClose}
              aria-label="Close claim check"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        <p className="cac-subtitle">{subtitle}</p>
      </div>

      {showEvidence && (
        <div className="cac-evidence-grid">
          {evidence.map((item, i) => (
            <EvidenceCard key={i} item={item} />
          ))}
        </div>
      )}

      {/* Unable to verify: a calm next step, not an error state */}
      {status === "unable-to-verify" && (
        <Button
          variant="subtle"
          className="cac-add-sources-btn"
          onPress={onAddSources}
        >
          Add more sources
        </Button>
      )}
    </div>
  );
}
