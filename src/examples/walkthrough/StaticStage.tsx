import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../ui/compositions/connie/phosphorIcons";
import type { StoryboardStage } from "../storyboard/storyboardData";
import { Stage } from "./Stage";

const FRAME_IMAGES = import.meta.glob<string>("../storyboard/frames/*.jpg", { eager: true, import: "default" });
// Sharp 2x exports from Figma, where we have them. Others fall back to the storyboard thumbnails.
const FRAME_IMAGES_2X = import.meta.glob<string>("../storyboard/frames-2x/*.jpg", { eager: true, import: "default" });
const frameSrc = (nodeId: string) => {
  const file = `${nodeId.replace(":", "-")}.jpg`;
  return FRAME_IMAGES_2X[`../storyboard/frames-2x/${file}`] ?? FRAME_IMAGES[`../storyboard/frames/${file}`];
};

/**
 * A stage that isn't built yet. Shows the team's Figma screens as a gallery: the current
 * screen in a browser window and a filmstrip of the rest.
 * Labeled so nobody mistakes the screens for live UI.
 */
export function StaticStage({ stage }: { stage: StoryboardStage }) {
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [stage.id]);
  const frame = stage.frames[i];
  const count = stage.frames.length;

  return (
    <Stage label={`${stage.title}, Figma screen ${i + 1} of ${count}`}>
      <div className="wt-gallery">
        <p className="wt-gallery-head" aria-live="polite">
          <span className="wt-gallery-tag">Figma screen · not built yet</span>
          <span className="wt-gallery-caption">
            {frame.caption}
            {count > 1 && (
              <span className="wt-gallery-count">
                {" "}
                · {i + 1} of {count}
              </span>
            )}
          </span>
        </p>

        <div className="wt-gallery-row">
          {count > 1 && (
            <button
              type="button"
              className="wt-gallery-arrow"
              onClick={() => setI(i - 1)}
              disabled={i === 0}
              aria-label="Previous screen"
            >
              <ArrowLeftIcon size={22} />
            </button>
          )}

          <figure className="wt-window">
            <span className="wt-window-bar" aria-hidden>
              <span />
              <span />
              <span />
            </span>
            <img
              src={frameSrc(frame.nodeId)}
              alt={`Figma screen ${frame.nodeId}, ${frame.caption}`}
              width={1000}
              height={625}
            />
          </figure>

          {count > 1 && (
            <button
              type="button"
              className="wt-gallery-arrow"
              onClick={() => setI(i + 1)}
              disabled={i === count - 1}
              aria-label="Next screen"
            >
              <ArrowRightIcon size={22} />
            </button>
          )}
        </div>

        {count > 1 && (
          <ol className="wt-filmstrip" aria-label="All screens in this step">
            {stage.frames.map((f, j) => (
              <li key={f.nodeId}>
                <button
                  type="button"
                  className="wt-film"
                  aria-current={j === i ? "step" : undefined}
                  aria-label={`Screen ${j + 1}, ${f.caption}`}
                  onClick={() => setI(j)}
                >
                  <img src={frameSrc(f.nodeId)} alt="" width={112} height={70} />
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Stage>
  );
}
