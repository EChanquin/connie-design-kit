import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  DecisionProduct,
  DecisionSupportPayload,
  Insight,
} from "../connie/connieContract";
import {
  ExpandGlyph,
  FilterGlyph,
  InfoGlyph,
  PanelCloseGlyph,
  ShareGlyph,
  TrashGlyph,
  ViewCardsGlyph,
  ViewTableGlyph,
  WhyFitsCheckGlyph,
} from "../connie/figmaIcons";
import { INSIGHT_ICON_SIZE, insightIcon } from "../connie/insightIcons";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  CornersInIcon,
  XIcon,
} from "../connie/phosphorIcons";
import { useEscape } from "../connie/useEscape";
import {
  SourceLogo,
  SourceStack,
  type ConnieSource,
} from "../SourceBadge/SourceBadge";
import "./decisionSupport.css";

/* ─── Types ─────────────────────────────────────────────────── */

/** One retailer's price for a product. Not in the agent contract yet; supplied by the page. */
export type RetailerOffer = {
  retailer: string;
  price: string;
  /** Short deal line, e.g. "PRIME DEAL: 10% OFF" */
  deal: string;
  dealTone?: "brand" | "attention" | "neutral";
  /** The lowest price. Gets the filled button, like the Figma. */
  best?: boolean;
  href?: string;
};

export type DecisionView = "cards" | "table";

/* ─── Helpers ───────────────────────────────────────────────── */

/** Evidence badges are plain strings in the contract. CR badges start with "CR". */
export const badgeSource = (badge: string): ConnieSource =>
  /^CR\b/.test(badge)
    ? "consumer_reports"
    : /reddit|^r\//i.test(badge)
      ? "reddit"
      : "web";

const tableBadge = (
  p: DecisionProduct,
): { text: string; tone: "best" | "runner" | "not" } | null => {
  if (p.rank_label === "NOT RECOMMENDED")
    return { text: "NOT REC", tone: "not" };
  if (p.rank === 1) return { text: "BEST", tone: "best" };
  if (p.rank === 2) return { text: "RUNNER", tone: "runner" };
  return null;
};

/** Bold the priorities the agent says this product matched. */
function Rationale({ text, matches }: { text: string; matches: string[] }) {
  if (!matches.length) return <>{text}</>;
  const pattern = new RegExp(
    `(${matches.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  return (
    <>
      {text
        .split(pattern)
        .map((part, i) =>
          matches.some((m) => m.toLowerCase() === part.toLowerCase()) ? (
            <strong key={i}>{part}</strong>
          ) : (
            part
          ),
        )}
    </>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="ds-check">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="ds-check-box" aria-hidden>
        {checked && <CheckIcon size={12} />}
      </span>
      <span className="ds-visually-hidden">{label}</span>
    </label>
  );
}

/* ─── Compare prices ────────────────────────────────────────── */

function ComparePrices({
  offers,
  onClose,
  id,
}: {
  offers: RetailerOffer[];
  onClose: () => void;
  id: string;
}) {
  useEscape(onClose);
  return (
    <div
      className="ds-compare"
      id={id}
      role="dialog"
      aria-label="Compare prices"
    >
      <div className="ds-compare-header">
        <p className="ds-compare-title">Compare Prices</p>
        <button
          type="button"
          className="ds-icon-btn"
          onClick={onClose}
          aria-label="Close compare prices"
        >
          <XIcon size={14} />
        </button>
      </div>
      <ul className="ds-compare-list">
        {offers.map((o) => (
          <li key={o.retailer} className="ds-offer">
            <div className="ds-offer-line">
              <span className="ds-offer-retailer">{o.retailer}</span>
              <span className="ds-offer-price">{o.price}</span>
            </div>
            <div className="ds-offer-line">
              <span
                className={clsx(
                  "ds-offer-deal",
                  `ds-offer-deal--${o.dealTone ?? "neutral"}`,
                )}
              >
                {o.deal}
              </span>
              <a
                className={clsx("ds-offer-btn", o.best && "ds-offer-btn--best")}
                href={o.href ?? "#"}
                target={o.href ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                View Deal
                <span className="ds-visually-hidden"> at {o.retailer}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Card ──────────────────────────────────────────────────── */

export type DecisionCardProps = {
  product: DecisionProduct;
  image?: string;
  /** "compact" in the side panel (Figma 16:3212), "wide" in the expanded panel (16:4962) */
  layout?: "compact" | "wide";
  selectable?: boolean;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Retailer prices behind the retailer tag. Enables "Compare prices". */
  offers?: RetailerOffer[];
  defaultCompareOpen?: boolean;
  /** Lab and owner metrics shown by "Show details" in the wide layout (Figma 16:4565) */
  metrics?: Insight[];
  defaultDetailsOpen?: boolean;
  onViewReview?: () => void;
};

/**
 * One ranked product in Maya's shortlist: rank, price, why it fits her priorities,
 * and the evidence behind it. Matches the Connie Figma (Vision Board, 16:3212, 16:4962, 16:4565).
 */
export function DecisionCard({
  product,
  image,
  layout = "compact",
  selectable = true,
  selected = false,
  onSelectedChange,
  offers,
  defaultCompareOpen = false,
  metrics,
  defaultDetailsOpen = false,
  onViewReview,
}: DecisionCardProps) {
  const uid = useId();
  const [compareOpen, setCompareOpen] = useState(
    defaultCompareOpen && !!offers,
  );
  const retailerRef = useRef<HTMLButtonElement>(null);
  const closeCompare = useCallback(() => {
    setCompareOpen(false);
    retailerRef.current?.focus();
  }, []);
  const [detailsOpen, setDetailsOpen] = useState(defaultDetailsOpen);
  const top = product.rank === 1;
  const wide = layout === "wide";

  return (
    <article
      className={clsx("ds-card-row", wide && "ds-card-row--wide")}
      aria-labelledby={`${uid}-name`}
    >
      {selectable && (
        <Checkbox
          checked={selected}
          onChange={() => onSelectedChange?.(!selected)}
          label={`Select ${product.product_name}`}
        />
      )}
      <div className="ds-card">
        <div className="ds-card-top">
          <div className={clsx("ds-card-image", wide && "ds-card-image--wide")}>
            {image && <img src={image} alt="" />}
            {wide && (
              <>
                <button
                  type="button"
                  className="ds-carousel ds-carousel--prev"
                  aria-label="Previous photo"
                >
                  <CaretLeftIcon size={14} />
                </button>
                <button
                  type="button"
                  className="ds-carousel ds-carousel--next"
                  aria-label="Next photo"
                >
                  <CaretRightIcon size={14} />
                </button>
              </>
            )}
          </div>

          <div className="ds-card-info">
            <div className="ds-card-heading">
              <span className={clsx("ds-rank", top && "ds-rank--top")}>
                {product.rank_label}
              </span>
              <h3 className="ds-card-name" id={`${uid}-name`}>
                {product.product_name}
              </h3>
              <div className="ds-card-price">
                <span>{product.price}</span>
                {product.retailer &&
                  (offers ? (
                    <button
                      ref={retailerRef}
                      type="button"
                      className="ds-retailer ds-retailer--button"
                      aria-expanded={compareOpen}
                      aria-controls={`${uid}-compare`}
                      onClick={() => setCompareOpen(!compareOpen)}
                    >
                      At {product.retailer}
                      <span className="ds-visually-hidden">
                        , compare prices
                      </span>
                    </button>
                  ) : (
                    <span className="ds-retailer">At {product.retailer}</span>
                  ))}
              </div>
            </div>

            {wide && <WhyThisFits product={product} />}
            {wide && <EvidenceChips badges={product.evidence_badges} />}
          </div>

          {compareOpen && offers && (
            <ComparePrices
              offers={offers}
              id={`${uid}-compare`}
              onClose={closeCompare}
            />
          )}
        </div>

        {!wide && <WhyThisFits product={product} />}
        {!wide && <EvidenceChips badges={product.evidence_badges} />}

        {!wide && (
          <button
            type="button"
            className={clsx("ds-review-btn", top && "ds-review-btn--top")}
            onClick={onViewReview}
          >
            View Full Review
            <span className="ds-visually-hidden">, {product.product_name}</span>
          </button>
        )}

        {wide && metrics && (
          <>
            <div className="ds-metrics-bar">
              <p className="ds-metrics-title">Lab &amp; user metrics</p>
              <button
                type="button"
                className="ds-details-btn"
                aria-expanded={detailsOpen}
                aria-controls={`${uid}-metrics`}
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                {detailsOpen ? "Hide Details" : "Show Details"}
                <CaretDownIcon
                  size={12}
                  className={clsx(
                    "ds-details-caret",
                    detailsOpen && "ds-details-caret--open",
                  )}
                />
              </button>
            </div>
            <ul
              className="ds-metrics"
              id={`${uid}-metrics`}
              hidden={!detailsOpen}
            >
              {metrics.map((m) => {
                const Icon = insightIcon(m.category, m.sentiment === "caution");
                return (
                  <li key={m.label} className="ds-metric">
                    <span className="ds-metric-icon" aria-hidden>
                      <Icon size={INSIGHT_ICON_SIZE[m.category] ?? 20} />
                    </span>
                    <span className="ds-metric-text">
                      <span className="ds-metric-title-line">
                        <span className="ds-metric-title">{m.label}</span>
                        <SourceStack
                          sources={m.evidence.map((e) => e.source_type)}
                          extraCount={m.source_count}
                        />
                      </span>
                      <span className="ds-metric-summary">{m.summary}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}

function WhyThisFits({ product }: { product: DecisionProduct }) {
  if (!product.recommendation_rationale) return null;
  return (
    <div className="ds-why">
      <p className="ds-why-title">
        <WhyFitsCheckGlyph width={14.67} height={14} />
        Why this fits you
      </p>
      <p className="ds-why-text">
        <Rationale
          text={product.recommendation_rationale}
          matches={product.priority_matches}
        />
      </p>
    </div>
  );
}

function EvidenceChips({ badges }: { badges: string[] }) {
  if (!badges.length) return null;
  return (
    <ul className="ds-chips" aria-label="Evidence">
      {badges.map((b) => (
        <li key={b} className="ds-chip">
          <SourceLogo source={badgeSource(b)} size={20} />
          {b}
        </li>
      ))}
    </ul>
  );
}

/* ─── Table ─────────────────────────────────────────────────── */

function TerrainMark({
  terrain,
}: {
  terrain: DecisionProduct["specs"]["terrain"];
}) {
  const ok = terrain !== "Pavement only";
  // Check and X are different shapes, so the mark never relies on green and red alone.
  return (
    <span
      className={clsx("ds-terrain", ok ? "ds-terrain--ok" : "ds-terrain--no")}
      title={terrain}
    >
      {ok ? <CheckIcon size={11} /> : <XIcon size={10} />}
      <span className="ds-visually-hidden">{terrain}</span>
    </span>
  );
}

export type DecisionTableProps = {
  products: DecisionProduct[];
  /** "compact" in the side panel (Figma 16:3032), "wide" in the expanded panel (16:4735) */
  layout?: "compact" | "wide";
  images?: Record<string, string>;
  selected?: string[];
  onToggle?: (productName: string) => void;
};

/** Every product in one table, so Maya can scan the specs side by side. */
export function DecisionTable({
  products,
  layout = "compact",
  images = {},
  selected = [],
  onToggle,
}: DecisionTableProps) {
  const wide = layout === "wide";
  return (
    <div className={clsx("ds-table-wrap", wide && "ds-table-wrap--wide")}>
      <table className="ds-table">
        <thead>
          <tr>
            <th scope="col" className="ds-col-check">
              <span className="ds-visually-hidden">Select</span>
            </th>
            <th scope="col" className="ds-col-product">
              Product
            </th>
            <th scope="col">Fold</th>
            <th scope="col">Weight</th>
            <th scope="col">Terrain</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const badge = tableBadge(p);
            return (
              <tr key={p.product_name}>
                <td className="ds-col-check">
                  <Checkbox
                    checked={selected.includes(p.product_name)}
                    onChange={() => onToggle?.(p.product_name)}
                    label={`Select ${p.product_name}`}
                  />
                </td>
                <th scope="row" className="ds-col-product">
                  <span className="ds-product-cell">
                    {wide && (
                      <span className="ds-thumb">
                        {images[p.product_name] && (
                          <img src={images[p.product_name]} alt="" />
                        )}
                      </span>
                    )}
                    <span className="ds-product-name">
                      {p.product_name}
                      {badge && (
                        <span
                          className={clsx(
                            "ds-badge",
                            `ds-badge--${badge.tone}`,
                          )}
                        >
                          {badge.text}
                        </span>
                      )}
                    </span>
                  </span>
                </th>
                <td>{p.specs.fold}</td>
                <td>{p.specs.weight}</td>
                <td>
                  <TerrainMark terrain={p.specs.terrain} />
                </td>
                <td>{p.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Panel ─────────────────────────────────────────────────── */

export type DecisionSupportPanelProps = {
  /** The agent's `decision_support` payload, read as-is */
  decision: DecisionSupportPayload;
  /** Product photos by product name */
  images?: Record<string, string>;
  /** Retailer prices by product name */
  offers?: Record<string, RetailerOffer[]>;
  /** Lab and owner metrics by product name, for the expanded cards */
  metrics?: Record<string, Insight[]>;
  defaultView?: DecisionView;
  defaultExpanded?: boolean;
  defaultSelected?: string[];
  /** Opens "Compare prices" on this product (stories, walkthrough) */
  defaultCompareFor?: string;
  /** Opens "Show details" on the top product in the expanded cards */
  defaultDetailsOpen?: boolean;
  /** Called with the selected product names */
  onShare?: (productNames: string[]) => void;
  onDelete?: (productNames: string[]) => void;
  onViewReview?: (productName: string) => void;
  onClose?: () => void;
  /** How many cards to show in the cards view. The table always shows every product. */
  cardLimit?: number;
  className?: string;
  children?: ReactNode;
};

/**
 * Maya's saved shortlist, ranked against her priorities, as cards or a table.
 * Composes DecisionCard and DecisionTable. Matches the Connie Figma (Vision Board,
 * 16:3212 cards, 16:3032 table, 16:4962 and 16:4565 expanded, 16:3632 compare prices).
 * Usage rules: context/design-system/components/decision-support.md
 */
export function DecisionSupportPanel({
  decision,
  images = {},
  offers = {},
  metrics = {},
  defaultView = "cards",
  defaultExpanded = false,
  defaultSelected = [],
  defaultCompareFor,
  defaultDetailsOpen = false,
  onShare,
  onDelete,
  onViewReview,
  onClose,
  cardLimit = 2,
  className,
}: DecisionSupportPanelProps) {
  const [view, setView] = useState<DecisionView>(defaultView);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const names = decision.products.map((p) => p.product_name);
  const allSelected =
    names.length > 0 && names.every((n) => selected.includes(n));
  const someSelected = selected.length > 0 && !allSelected;
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected;
  }, [someSelected]);

  const toggle = (name: string) =>
    setSelected(
      selected.includes(name)
        ? selected.filter((n) => n !== name)
        : [...selected, name],
    );
  const cards = decision.products.slice(0, cardLimit);
  const layout = expanded ? "wide" : "compact";

  return (
    <section
      className={clsx(
        "decision-support connie-theme",
        expanded && "decision-support--expanded",
        className,
      )}
      aria-label="Your shortlist"
    >
      <div className="ds-toolbar">
        <div className="ds-views" role="group" aria-label="View">
          <button
            type="button"
            className="ds-view-btn"
            aria-pressed={view === "cards"}
            onClick={() => setView("cards")}
            aria-label="Cards view"
          >
            <ViewCardsGlyph size={18} />
          </button>
          <button
            type="button"
            className="ds-view-btn"
            aria-pressed={view === "table"}
            onClick={() => setView("table")}
            aria-label="Table view"
          >
            <ViewTableGlyph width={15} height={16.67} />
          </button>
        </div>
        <div className="ds-tools">
          <button type="button" className="ds-icon-btn" aria-label="Filter">
            <FilterGlyph width={18} height={12} />
          </button>
          <button
            type="button"
            className="ds-icon-btn"
            aria-label={expanded ? "Collapse panel" : "Expand panel"}
            aria-pressed={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <CornersInIcon size={18} /> : <ExpandGlyph size={18} />}
          </button>
          {onClose && (
            <button
              type="button"
              className="ds-icon-btn"
              aria-label="Close"
              onClick={onClose}
            >
              <PanelCloseGlyph size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="ds-body">
        {view === "table" && decision.cr_verdict && (
          <div className="ds-verdict">
            <InfoGlyph size={20} />
            <p>CR Verdict: {decision.cr_verdict}</p>
          </div>
        )}

        <div className="ds-select-bar">
          <label className="ds-check">
            <input
              ref={selectAllRef}
              type="checkbox"
              checked={allSelected}
              onChange={() => setSelected(allSelected ? [] : names)}
            />
            <span className="ds-check-box" aria-hidden>
              {allSelected && <CheckIcon size={12} />}
              {someSelected && <span className="ds-check-dash" />}
            </span>
            <span className="ds-select-label">Select All</span>
          </label>
          <span className="ds-select-actions">
            <button
              type="button"
              className="ds-icon-btn ds-select-action"
              disabled={!selected.length}
              onClick={() => onShare?.(selected)}
            >
              <ShareGlyph size={18} />
              <span className={clsx(!expanded && "ds-visually-hidden")}>
                Share
              </span>
            </button>
            <button
              type="button"
              className="ds-icon-btn ds-select-action"
              disabled={!selected.length}
              onClick={() => onDelete?.(selected)}
            >
              <TrashGlyph width={14} height={13.5} />
              <span className={clsx(!expanded && "ds-visually-hidden")}>
                Delete
              </span>
            </button>
          </span>
        </div>

        {view === "cards" ? (
          <div className="ds-cards">
            {cards.map((p, i) => (
              <DecisionCard
                key={p.product_name}
                product={p}
                layout={layout}
                image={images[p.product_name]}
                selected={selected.includes(p.product_name)}
                onSelectedChange={() => toggle(p.product_name)}
                offers={offers[p.product_name]}
                defaultCompareOpen={defaultCompareFor === p.product_name}
                metrics={metrics[p.product_name]}
                defaultDetailsOpen={defaultDetailsOpen && i === 0}
                onViewReview={() => onViewReview?.(p.product_name)}
              />
            ))}
          </div>
        ) : (
          <DecisionTable
            products={decision.products}
            layout={layout}
            images={images}
            selected={selected}
            onToggle={toggle}
          />
        )}
      </div>
    </section>
  );
}
