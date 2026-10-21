import { useEffect, type ReactNode } from "react";
import { ConnieStage } from "../ConnieStage";
import {
  STORYBOARD_STAGES,
  type StoryboardStage,
} from "../storyboard/storyboardData";
import { DecideStage } from "./DecideStage";
import { InsightsStage } from "./InsightsStage";
import { PrioritiesStage } from "./PrioritiesStage";
import { StaticStage } from "./StaticStage";
import "./walkthrough.css";

/** Stages built from live library components. The rest show the team's Figma screens. */
const LIVE: Record<string, () => ReactNode> = {
  insights: () => <InsightsStage />,
  priorities: () => <PrioritiesStage />,
  decide: () => <DecideStage />,
};

/** The walkthrough's routes, in journey order. "#claims" is the existing claim stage. */
export const WALKTHROUGH_HASHES = STORYBOARD_STAGES.map((s) => `#${s.id}`);

import { CAPTION_HEIGHT, STEPPER_HEIGHT } from "./Stage";

function Stepper({ stage, index }: { stage: StoryboardStage; index: number }) {
  const prev = STORYBOARD_STAGES[index - 1];
  const next = STORYBOARD_STAGES[index + 1];
  return (
    <nav className="wt-stepper" aria-label="Journey walkthrough">
      <a
        className="wt-step-btn"
        href={prev ? `#${prev.id}` : "#storyboard"}
        rel="prev"
      >
        <span aria-hidden>←</span> {prev ? "Back" : "Storyboard"}
      </a>
      <p className="wt-step-label" aria-live="polite">
        <span className="wt-step-count">
          Step {index + 1} of {STORYBOARD_STAGES.length} · {stage.workflow}
        </span>
        <span className="wt-step-title">{stage.title}</span>
        {LIVE[stage.id] || stage.id === "claims" ? (
          <span className="wt-tag wt-tag--live">Live build</span>
        ) : (
          <span className="wt-tag">Figma screens</span>
        )}
      </p>
      <a
        className="wt-step-btn wt-step-btn--next"
        href={next ? `#${next.id}` : "#storyboard"}
        rel="next"
      >
        {next ? "Next" : "See the storyboard"} <span aria-hidden>→</span>
      </a>
    </nav>
  );
}

/**
 * Maya's whole journey through Connie, one stage per route. Stages with built components
 * are interactive. The others show the team's Figma screens, labeled as such.
 */
export function Walkthrough({ hash }: { hash: string }) {
  const id = hash.replace("#", "") || "install";
  const index = Math.max(
    0,
    STORYBOARD_STAGES.findIndex((s) => s.id === id),
  );
  const stage = STORYBOARD_STAGES[index];

  useEffect(() => {
    document.title = `${stage.title} · Connie walkthrough`;
    window.scrollTo(0, 0);
  }, [stage]);

  return (
    <div className="connie-theme wt-page">
      <Stepper stage={stage} index={index} />

      {stage.id === "claims" ? (
        // The claim stage is the original #connie demo, reused as-is.
        <ConnieStage topOffset={STEPPER_HEIGHT + CAPTION_HEIGHT} />
      ) : (
        <main className="wt-main">
          {LIVE[stage.id] ? LIVE[stage.id]() : <StaticStage stage={stage} />}
        </main>
      )}

      <footer className="wt-caption">
        <p className="wt-lines">
          <span>
            <strong>Maya</strong> {stage.maya}
          </span>
          <span>
            <strong>Connie</strong> {stage.connie}
          </span>
        </p>
        {stage.id !== "claims" && (
          <p className="wt-disclaimer">
            Prototype with synthetic data. Verdicts and quotes are illustrative
            and do not reflect real test results. Screens designed by the Connie
            team.
          </p>
        )}
      </footer>
    </div>
  );
}
