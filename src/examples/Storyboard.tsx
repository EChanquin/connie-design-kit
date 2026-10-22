import { STORYBOARD_STAGES } from "./storyboard/storyboardData";
import "./storyboard.css";

// Frame thumbnails exported from Figma at half size (720×450), named by node ID.
const FRAME_IMAGES = import.meta.glob<string>("./storyboard/frames/*.jpg", {
  eager: true,
  import: "default",
});

const frameSrc = (nodeId: string) =>
  FRAME_IMAGES[`./storyboard/frames/${nodeId.replace(":", "-")}.jpg`];

const TOTAL_FRAMES = STORYBOARD_STAGES.reduce((n, s) => n + s.frames.length, 0);

export function Storyboard() {
  return (
    <div className="connie-theme sb-page">
      <header className="sb-header">
        <p className="sb-eyebrow">Connie · Full journey</p>
        <h1 className="sb-title">Maya buys her first stroller</h1>
        <p className="sb-intro">
          {STORYBOARD_STAGES.length} steps of Connie's agentic workflow, told through {TOTAL_FRAMES}{" "}
          screens from the team's Figma. Maya is 34, seven months pregnant, and lives in a walk-up
          apartment.
        </p>
        <p className="sb-credit">Screens designed by the Connie team. Storyboard and build by Edward Chanquin.</p>
        <a className="sb-walk" href="#install">
          Step through it in the live walkthrough
        </a>
      </header>

      <ol className="sb-stages">
        {STORYBOARD_STAGES.map((stage, i) => (
          <li key={stage.id} className="sb-stage" aria-labelledby={`sb-${stage.id}-title`}>
            <div className="sb-meta">
              <p className="sb-step">
                <span className="sb-step-number">Step {i + 1}</span>
                <span className="sb-workflow">{stage.workflow}</span>
              </p>
              <h2 id={`sb-${stage.id}-title`} className="sb-stage-title">
                {stage.title}
              </h2>
              <dl className="sb-lines">
                <div>
                  <dt>Maya</dt>
                  <dd>{stage.maya}</dd>
                </div>
                <div>
                  <dt>Connie</dt>
                  <dd>{stage.connie}</dd>
                </div>
              </dl>
              {stage.liveHref && (
                <a className="sb-live" href={stage.liveHref}>
                  Built and live in the demo
                </a>
              )}
            </div>

            <div
              className="sb-strip"
              role="region"
              aria-label={`${stage.title} screens`}
              tabIndex={0}
            >
              <ol className="sb-frames">
                {stage.frames.map((frame, j) => (
                  <li key={frame.nodeId} className="sb-frame">
                    <img
                      className="sb-frame-img"
                      src={frameSrc(frame.nodeId)}
                      alt={`Figma frame ${frame.nodeId}, ${frame.caption}`}
                      width={240}
                      height={150}
                      loading="lazy"
                    />
                    <p className="sb-frame-caption">
                      <span className="sb-frame-index">{j + 1}</span>
                      {frame.caption}
                    </p>
                    <p className="sb-frame-node">{frame.nodeId}</p>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ol>

      <p className="sb-disclaimer">
        Prototype with synthetic data. Verdicts and quotes are illustrative and do not reflect real test results.
      </p>
    </div>
  );
}
