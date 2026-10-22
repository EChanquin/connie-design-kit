import clsx from "clsx";
import { useCallback, useId, useRef, useState } from "react";
import type {
  Evidence,
  Insight,
  ProductInsightsPayload,
} from "../connie/connieContract";
import {
  CloseGlyph,
  HeadsUpGlyph,
  InfoGlyph,
  LinkGlyph,
  NotRecommendedGlyph,
  PencilGlyph,
  SaveGlyph,
  SlidersGlyph,
  ThumbDownGlyph,
  ThumbUpGlyph,
} from "../connie/figmaIcons";
import { INSIGHT_ICON_SIZE, insightIcon } from "../connie/insightIcons";
import { CaretDownIcon } from "../connie/phosphorIcons";
import { RecommendedStar } from "../connie/RecommendedStar";
import { useEscape } from "../connie/useEscape";
import {
  SourceLink,
  SourceLogo,
  SourceStack,
  sourceLabel,
  type ConnieSource,
} from "../SourceBadge/SourceBadge";
import "./productInsightCard.css";

/** What Connie based the verdict on. Shown in the popover behind the info button. */
export type InsightBasis = {
  /** Sources the shopper connected in onboarding */
  sources: ConnieSource[];
  /** Values the shopper picked in onboarding */
  preferences: string[];
};

export type ProductInsightCardProps = {
  /** The agent's `product_insights` payload, read as-is */
  insights: ProductInsightsPayload;
  /** "loading" while Connie reads the page */
  state?: "ready" | "loading";
  /** Enables the info button and its "Based on" popover */
  basis?: InsightBasis;
  /** Index of the open insight row. Leave unset to let the card manage it. */
  expandedIndex?: number | null;
  defaultExpandedIndex?: number | null;
  onExpandedChange?: (index: number | null) => void;
  /** Open the "Based on" popover on first render (stories, walkthrough) */
  defaultBasisOpen?: boolean;
  /** Called by the pencil buttons in the "Based on" popover */
  onEditBasis?: (part: "sources" | "preferences") => void;
  saved?: boolean;
  defaultSaved?: boolean;
  onSavedChange?: (saved: boolean) => void;
  onFeedback?: (vote: "up" | "down" | null) => void;
  onClose?: () => void;
  className?: string;
};

const sourceOf = (e: Evidence): ConnieSource => e.source_type;

function EvidenceBlock({ evidence }: { evidence: Evidence }) {
  return (
    <div className="pic-evidence">
      <div className="pic-evidence-text">
        {/* One label per source, above its own text. Never blend CR and community. */}
        <p className="pic-evidence-source">{sourceLabel(sourceOf(evidence))}</p>
        <p className="pic-evidence-quote">{evidence.quote}</p>
      </div>
      <SourceLink
        source={sourceOf(evidence)}
        label={evidence.source_name}
        href={evidence.source_url}
      />
    </div>
  );
}

function InsightRow({
  insight,
  open,
  onToggle,
  drawback,
  panelId,
}: {
  insight: Insight;
  open: boolean;
  onToggle: () => void;
  drawback: boolean;
  panelId: string;
}) {
  const Icon = insightIcon(insight.category, drawback);
  const size = drawback ? 20 : (INSIGHT_ICON_SIZE[insight.category] ?? 20);
  return (
    <li className={clsx("pic-row", open && "pic-row--open")}>
      <button
        type="button"
        className="pic-row-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="pic-row-main">
          <span className="pic-row-icon">
            <Icon size={size} />
          </span>
          <span className="pic-row-text">
            <span className="pic-row-title-line">
              <span className="pic-row-title">{insight.label}</span>
              <SourceStack
                sources={insight.evidence.map(sourceOf)}
                extraCount={insight.source_count}
              />
            </span>
            <span className="pic-row-summary">{insight.summary}</span>
          </span>
        </span>
        <span className="pic-caret" aria-hidden>
          <CaretDownIcon size={14} />
        </span>
        <span className="pic-visually-hidden">
          {open ? "Hide evidence" : "Show evidence"}
        </span>
      </button>
      <div id={panelId} className="pic-row-panel" hidden={!open}>
        {insight.evidence.map((e, i) => (
          <EvidenceBlock key={i} evidence={e} />
        ))}
      </div>
    </li>
  );
}

function BasisPopover({
  basis,
  id,
  onClose,
  onEdit,
}: {
  basis: InsightBasis;
  id: string;
  onClose: () => void;
  onEdit?: (part: "sources" | "preferences") => void;
}) {
  useEscape(onClose);
  return (
    <div
      className="pic-basis"
      id={id}
      role="dialog"
      aria-label="What this verdict is based on"
    >
      <div className="pic-basis-header">
        <p className="pic-basis-title">Based on:</p>
        <button
          type="button"
          className="pic-icon-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseGlyph size={20} />
        </button>
      </div>
      <div className="pic-basis-row">
        <span className="pic-basis-label">
          <LinkGlyph size={18} />
          Sources:
        </span>
        <ul className="pic-basis-chips">
          {basis.sources.map((s) => (
            <li key={s} className="pic-basis-chip">
              <SourceLogo source={s} size={20} />
              {sourceLabel(s)}
              {/* CR is always on. Only the community sources Maya added can be changed. */}
              {s !== "consumer_reports" && (
                <button
                  type="button"
                  className="pic-basis-edit"
                  aria-label={`Edit sources, ${sourceLabel(s)}`}
                  onClick={() => onEdit?.("sources")}
                >
                  <PencilGlyph size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="pic-basis-row">
        <span className="pic-basis-label">
          <SlidersGlyph size={20} />
          Preferences:
        </span>
        <ul className="pic-basis-chips">
          {basis.preferences.map((p) => (
            <li key={p} className="pic-basis-chip">
              {p}
              <button
                type="button"
                className="pic-basis-edit"
                aria-label={`Edit preferences, ${p}`}
                onClick={() => onEdit?.("preferences")}
              >
                <PencilGlyph size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Connie's verdict on the product a shopper is looking at, with the insights behind it.
 * Each insight opens to show CR and community evidence in separate, labeled blocks.
 * Matches the Connie Figma (Vision Board, instances 16:1602, 16:1705, 16:1664).
 * Usage rules: context/design-system/components/product-insight-card.md
 */
export function ProductInsightCard({
  insights,
  state = "ready",
  basis,
  expandedIndex,
  defaultExpandedIndex = null,
  onExpandedChange,
  defaultBasisOpen = false,
  onEditBasis,
  saved,
  defaultSaved = false,
  onSavedChange,
  onFeedback,
  onClose,
  className,
}: ProductInsightCardProps) {
  const uid = useId();
  const [innerExpanded, setInnerExpanded] = useState<number | null>(
    defaultExpandedIndex,
  );
  const [innerSaved, setInnerSaved] = useState(defaultSaved);
  const [basisOpen, setBasisOpen] = useState(defaultBasisOpen && !!basis);
  const infoRef = useRef<HTMLButtonElement>(null);
  const closeBasis = useCallback(() => {
    setBasisOpen(false);
    infoRef.current?.focus();
  }, []);
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  const openIndex = expandedIndex !== undefined ? expandedIndex : innerExpanded;
  const isSaved = saved ?? innerSaved;
  const recommended = insights.verdict === "recommended";
  const verdictText = recommended ? "Recommended" : "Not recommended";

  // On a recommended product, drawbacks are called out separately as "heads up" notes.
  // On a not-recommended product, the drawbacks are the verdict, so they stay in the list.
  const listed = recommended
    ? insights.insights.filter((i) => i.sentiment === "positive")
    : insights.insights;
  const headsUp = recommended
    ? insights.insights.filter((i) => i.sentiment === "caution")
    : [];

  const toggleRow = (i: number) => {
    const next = openIndex === i ? null : i;
    setInnerExpanded(next);
    onExpandedChange?.(next);
  };
  const toggleSaved = () => {
    setInnerSaved(!isSaved);
    onSavedChange?.(!isSaved);
  };
  const castVote = (v: "up" | "down") => {
    const next = vote === v ? null : v;
    setVote(next);
    onFeedback?.(next);
  };

  if (state === "loading") {
    return (
      <div
        className={clsx(
          "product-insight-card connie-theme pic--loading",
          className,
        )}
        role="region"
        aria-label={`Connie is checking ${insights.product_name}`}
        aria-busy="true"
      >
        <div className="pic-main">
          <div className="pic-header">
            <p className="pic-loading-title">
              Checking CR tests and owner reviews…
            </p>
          </div>
          <ul className="pic-list" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="pic-row pic-row--skeleton">
                <span className="pic-skeleton pic-skeleton--icon" />
                <span className="pic-skeleton-lines">
                  <span className="pic-skeleton pic-skeleton--title" />
                  <span className="pic-skeleton pic-skeleton--line" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "product-insight-card connie-theme",
        recommended ? "pic--recommended" : "pic--not-recommended",
        className,
      )}
      role="region"
      aria-label={`Connie's verdict on ${insights.product_name}: ${verdictText}`}
    >
      {basis && basisOpen && (
        <BasisPopover
          basis={basis}
          id={`${uid}-basis`}
          onClose={closeBasis}
          onEdit={onEditBasis}
        />
      )}

      <div className="pic-main">
        <div className="pic-header">
          <div className="pic-verdict">
            <div className="pic-verdict-label">
              {/* Icon shape and title both change with the verdict, never color alone */}
              {recommended ? (
                <RecommendedStar size={20} />
              ) : (
                <NotRecommendedGlyph size={24} />
              )}
              <h2 className="pic-verdict-title">{verdictText}</h2>
            </div>
            {basis && (
              <button
                ref={infoRef}
                type="button"
                className="pic-icon-btn pic-info-btn"
                aria-label="What this verdict is based on"
                aria-expanded={basisOpen}
                aria-controls={`${uid}-basis`}
                onClick={() => setBasisOpen(!basisOpen)}
              >
                <InfoGlyph size={24} />
              </button>
            )}
          </div>
          <button
            type="button"
            className="pic-save"
            aria-pressed={isSaved}
            onClick={toggleSaved}
          >
            {isSaved ? "Saved" : "Save"}
            <SaveGlyph width={14} height={12} />
          </button>
        </div>

        <div
          className="pic-scroll"
          tabIndex={0}
          aria-label={`Insights for ${insights.product_name}`}
        >
          <ul className="pic-list">
            {listed.map((insight, i) => (
              <InsightRow
                key={insight.label}
                insight={insight}
                open={openIndex === i}
                onToggle={() => toggleRow(i)}
                drawback={!recommended}
                panelId={`${uid}-panel-${i}`}
              />
            ))}
          </ul>

          {headsUp.map((insight) => (
            <div key={insight.label} className="pic-heads-up">
              <HeadsUpGlyph
                width={20}
                height={23.6}
                className="pic-heads-up-icon"
              />
              <div className="pic-heads-up-text">
                <p className="pic-heads-up-title">{insight.label}</p>
                <p className="pic-heads-up-summary">{insight.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pic-feedback" role="group" aria-label="Like this rec?">
        <p className="pic-feedback-label" aria-hidden>
          Like this rec?
        </p>
        <button
          type="button"
          className="pic-vote"
          aria-label="Helpful"
          aria-pressed={vote === "up"}
          onClick={() => castVote("up")}
        >
          <ThumbUpGlyph width={17.5} height={16.67} />
        </button>
        <button
          type="button"
          className="pic-vote"
          aria-label="Not helpful"
          aria-pressed={vote === "down"}
          onClick={() => castVote("down")}
        >
          <ThumbDownGlyph width={17.5} height={16.67} />
        </button>
      </div>

      {onClose && (
        <button
          type="button"
          className="pic-icon-btn pic-close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseGlyph size={20} />
        </button>
      )}
    </div>
  );
}
