import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../ui/compositions/connie/phosphorIcons";
import type { StoryboardStage } from "../storyboard/storyboardData";
import { Stage } from "./Stage";

const FRAME_IMAGES = import.meta.glob<string>("../storyboard/frames/*.jpg", {
  eager: true,
  import: "default",
});
const frameSrc = (nodeId: string) =>
  FRAME_IMAGES[`../storyboard/frames/${nodeId.replace(":", "-")}.jpg`];

/**
 * A stage that isn't built yet. Shows the team's Figma screens in order, labeled so
 * nobody mistakes them for live UI.
 */
export function StaticStage({ stage }: { stage: StoryboardStage }) {
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [stage.id]);
  const frame = stage.frames[i];
  const count = stage.frames.length;

  return (
    <Stage label={`${stage.title}, Figma screen ${i + 1} of ${count}`}>
      <img
        className="wt-static-img"
        src={frameSrc(frame.nodeId)}
        alt={`Figma screen ${frame.nodeId}, ${frame.caption}`}
        width={1440}
        height={900}
      />
      <div className="wt-static-label" aria-hidden>
        Figma screen · not built yet
      </div>
      {count > 1 && (
        <div className="wt-frame-nav">
          <button
            type="button"
            onClick={() => setI(i - 1)}
            disabled={i === 0}
            aria-label="Previous screen"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <span aria-live="polite">
            {frame.caption} · {i + 1} of {count}
          </span>
          <button
            type="button"
            onClick={() => setI(i + 1)}
            disabled={i === count - 1}
            aria-label="Next screen"
          >
            <ArrowRightIcon size={20} />
          </button>
        </div>
      )}
    </Stage>
  );
}
