import { DecisionSupportPanel } from "compositions";
import {
  MAYA_SHORTLIST,
  SHORTLIST_IMAGES,
  SHORTLIST_METRICS,
  SHORTLIST_OFFERS,
} from "../../ui/compositions/DecisionSupport/decisionSupport.fixtures";
import bg from "./amazon-results-bg.jpg";
import { Stage } from "./Stage";
import { StageChrome } from "./StageChrome";

/** Support Decision. Maya's saved shortlist, as cards or a table. Figma 16:3212. */
export function DecideStage() {
  return (
    <Stage label="Amazon results page with Maya's ranked shortlist">
      <img className="wt-bg" src={bg} alt="" width={1440} height={900} />
      <div className="wt-scrim" />
      <StageChrome showDot={false} />
      <div className="wt-panel-anchor">
        <DecisionSupportPanel
          className="wt-decision"
          decision={MAYA_SHORTLIST}
          images={SHORTLIST_IMAGES}
          offers={SHORTLIST_OFFERS}
          metrics={SHORTLIST_METRICS}
          onShare={() => (window.location.hash = "#share")}
        />
      </div>
    </Stage>
  );
}
