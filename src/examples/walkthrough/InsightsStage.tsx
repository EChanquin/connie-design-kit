import { ProductInsightCard } from "compositions";
import { useState } from "react";
import { StarIcon } from "../../ui/compositions/connie/phosphorIcons";
import {
  MAYA_BASIS,
  RECOMMENDED_INSIGHTS,
} from "../../ui/compositions/ProductInsightCard/productInsightCard.fixtures";
import bg from "./amazon-results-bg.jpg";
import { Stage } from "./Stage";
import { StageChrome } from "./StageChrome";

/**
 * Observe / Understand. Maya taps the star on the Baby Trend stroller and Connie's verdict
 * opens beside it. Figma 16:1589 (card at 737, 288; star at 797, 102).
 */
export function InsightsStage() {
  const [open, setOpen] = useState(true);
  return (
    <Stage label="Amazon results page with Connie's verdict on a stroller">
      <img className="wt-bg" src={bg} alt="" width={1440} height={900} />
      <div className="wt-scrim" />
      <div
        className="wt-spotlight"
        style={{ left: 471, top: 125, width: 349, height: 706 }}
      />

      <button
        type="button"
        className="wt-star"
        style={{ left: 797, top: 102 }}
        aria-expanded={open}
        aria-label={
          open
            ? "Hide Connie's take on the Baby Trend stroller"
            : "Show Connie's take on the Baby Trend stroller"
        }
        onClick={() => setOpen(!open)}
      >
        <StarIcon size={18} />
      </button>

      <StageChrome />

      {open && (
        <div className="wt-anchor" style={{ left: 737, top: 288 }}>
          <ProductInsightCard
            insights={RECOMMENDED_INSIGHTS}
            basis={MAYA_BASIS}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </Stage>
  );
}
