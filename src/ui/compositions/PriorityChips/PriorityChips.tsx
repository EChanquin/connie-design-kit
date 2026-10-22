import clsx from "clsx";
import type { ComponentType } from "react";
import type { PriorityLabel } from "../connie/connieContract";
import {
  PriorityDurabilityGlyph,
  PriorityEasyFoldGlyph,
  PriorityLightweightGlyph,
  PrioritySafetyGlyph,
  SoftStarGlyph,
  TopRatedGlyph,
} from "../connie/figmaIcons";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "../connie/phosphorIcons";
import "./priorityChips.css";

/**
 * suggested  Connie's starting point, before it knows Maya (Figma 16:2306)
 * confirmed  kept after Connie tailored the list (16:2841, black outline)
 * boosted    moved up because of something Maya said, with the reason (16:2841, green)
 * removed    Maya took it off the list. She can bring it back.
 */
export type PriorityStatus = "suggested" | "confirmed" | "boosted" | "removed";

export type Priority = {
  /** The agent's priority labels, from `priority_inference.suggested_priorities` */
  label: PriorityLabel;
  status: PriorityStatus;
  /** Why Connie raised it. Shown on boosted chips. */
  reason?: string;
};

export type PriorityChipsProps = {
  /** In rank order. Removed priorities keep their place but aren't ranked. */
  priorities: Priority[];
  /** "loading" while Connie works out the priorities */
  state?: "ready" | "loading";
  /** Shows controls so Maya can reorder, remove and restore priorities */
  editable?: boolean;
  /** Called with the new order of labels */
  onReorder?: (labels: PriorityLabel[]) => void;
  onRemove?: (label: PriorityLabel) => void;
  onRestore?: (label: PriorityLabel) => void;
  className?: string;
};

type Glyph = ComponentType<{
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}>;

// Icon sizes are the Figma glyph sizes (Priority Cards Bento Grid, 16:2325)
const ICONS: Record<PriorityLabel, { Icon: Glyph; w: number; h: number }> = {
  Safety: { Icon: PrioritySafetyGlyph, w: 16, h: 20 },
  Durability: { Icon: PriorityDurabilityGlyph, w: 19.95, h: 21 },
  "Easy Fold": { Icon: PriorityEasyFoldGlyph, w: 21.95, h: 21.95 },
  Lightweight: { Icon: PriorityLightweightGlyph, w: 19.8, h: 19.8 },
};

const STATUS_TEXT: Record<PriorityStatus, string> = {
  suggested: "suggested by Connie",
  confirmed: "kept",
  boosted: "moved up",
  removed: "removed",
};

/**
 * Connie's read on what matters to the shopper, as ranked chips in a 2-column grid.
 * Connie infers them, and the shopper stays in control: with `editable`, every chip can be
 * moved, removed and restored. Matches the Connie Figma (Vision Board, Priority Inference
 * frames 16:2306 to 16:2938). Usage rules: context/design-system/components/priority-chips.md
 */
export function PriorityChips({
  priorities,
  state = "ready",
  editable = false,
  onReorder,
  onRemove,
  onRestore,
  className,
}: PriorityChipsProps) {
  if (state === "loading") {
    return (
      <div
        className={clsx("priority-chips connie-theme", className)}
        role="status"
        aria-busy="true"
        aria-label="Working out your priorities"
      >
        <ul className="pc-grid" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="pc-chip pc-chip--skeleton">
              <span className="pc-skeleton pc-skeleton--icon" />
              <span className="pc-skeleton pc-skeleton--label" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const active = priorities.filter((p) => p.status !== "removed");
  const move = (label: PriorityLabel, delta: number) => {
    const order = active.map((p) => p.label);
    const i = order.indexOf(label);
    const j = i + delta;
    if (j < 0 || j >= order.length) return;
    [order[i], order[j]] = [order[j], order[i]];
    onReorder?.(order);
  };

  return (
    <ol
      className={clsx("priority-chips connie-theme pc-grid", className)}
      aria-label="Your priorities, most important first"
    >
      {priorities.map((p) => {
        const removed = p.status === "removed";
        const rank = removed ? null : active.indexOf(p) + 1;
        const { Icon, w, h } = ICONS[p.label] ?? {
          Icon: TopRatedGlyph,
          w: 20,
          h: 20,
        };
        const description = `${p.label}, ${rank ? `priority ${rank}, ` : ""}${STATUS_TEXT[p.status]}${
          p.reason ? `. ${p.reason}` : ""
        }`;
        return (
          <li
            key={p.label}
            className={clsx("pc-chip", `pc-chip--${p.status}`)}
            aria-label={description}
          >
            {rank && (
              <span className="pc-rank" aria-hidden>
                {rank}
              </span>
            )}
            {p.status === "boosted" && (
              <SoftStarGlyph className="pc-sparkle" width={26} height={27.8} />
            )}
            <span className="pc-icon" aria-hidden>
              <Icon width={w} height={h} />
            </span>
            <span className="pc-label" aria-hidden>
              {p.label}
            </span>
            {p.status === "boosted" && p.reason && (
              <span className="pc-reason" aria-hidden>
                {p.reason}
              </span>
            )}
            {removed && (
              <span className="pc-reason pc-reason--removed" aria-hidden>
                Removed
              </span>
            )}

            {editable && (
              <span className="pc-controls">
                {removed ? (
                  <button
                    type="button"
                    className="pc-control pc-control--text"
                    onClick={() => onRestore?.(p.label)}
                  >
                    Undo
                    <span className="pc-visually-hidden">
                      {" "}
                      remove {p.label}
                    </span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="pc-control"
                      onClick={() => move(p.label, -1)}
                      disabled={rank === 1}
                      aria-label={`Move ${p.label} up`}
                    >
                      <ArrowLeftIcon size={14} />
                    </button>
                    <button
                      type="button"
                      className="pc-control"
                      onClick={() => move(p.label, 1)}
                      disabled={rank === active.length}
                      aria-label={`Move ${p.label} down`}
                    >
                      <ArrowRightIcon size={14} />
                    </button>
                    <button
                      type="button"
                      className="pc-control"
                      onClick={() => onRemove?.(p.label)}
                      aria-label={`Remove ${p.label}`}
                    >
                      <XIcon size={14} />
                    </button>
                  </>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
