import { CheckInCard } from "compositions";
import { useState } from "react";
import {
  CHECK_IN_PRODUCT,
  checkInScript,
} from "../../ui/compositions/CheckInCard/checkInCard.fixtures";
import bg from "./baby-bottles-bg.jpg";
import { Stage } from "./Stage";
import { StageChrome } from "./StageChrome";

/**
 * After purchase. Three weeks later Maya is shopping for bottles and Connie asks how the
 * stroller is working out. Figma 16:3966 to 16:4307.
 */
export function CheckInStage() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [open, setOpen] = useState(true);

  const answer = (step: number, option: string) => {
    setAnswers([...answers.slice(0, step), option]);
    setTyping(true);
    window.setTimeout(() => setTyping(false), 700);
  };

  // While Connie is "typing", hold back the next question
  const shown = typing
    ? checkInScript(answers.slice(0, -1))
    : checkInScript(answers);
  const steps = typing
    ? shown.steps.map((s, i) =>
        i === answers.length - 1 ? { ...s, answer: answers[i] } : s,
      )
    : shown.steps;

  return (
    <Stage label="Baby bottle page with Connie's post-purchase check-in">
      <img className="wt-bg" src={bg} alt="" width={1440} height={900} />
      <div className="wt-scrim wt-scrim--light" />
      <StageChrome showDot={false} />
      {!open && (
        <button
          type="button"
          className="wt-reopen"
          onClick={() => setOpen(true)}
        >
          Reopen the check-in
        </button>
      )}
      {open && (
        <div className="wt-checkin-anchor">
          <CheckInCard
            product={CHECK_IN_PRODUCT}
            steps={steps}
            typing={typing}
            thanks={typing ? undefined : shown.thanks}
            onAnswer={answer}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
      {open && answers.length > 0 && (
        <button
          type="button"
          className="wt-restart"
          onClick={() => setAnswers([])}
        >
          Start the check-in over
        </button>
      )}
    </Stage>
  );
}
