import { PriorityChips, type Priority } from "compositions";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { PriorityLabel } from "../../ui/compositions/connie/connieContract";
import {
  ArrowRightIcon,
  CaretRightIcon,
  CheckIcon,
  PaperPlaneRightIcon,
  XIcon,
} from "../../ui/compositions/connie/phosphorIcons";
import {
  AFTER_APARTMENT,
  AFTER_COMMUTE,
  STARTING_PAYLOAD,
  prioritiesFromPayload,
} from "../../ui/compositions/PriorityChips/priorityChips.fixtures";
import bg from "./amazon-results-bg.jpg";
import { Stage } from "./Stage";
import { StageChrome } from "./StageChrome";

/*
 * Understand. Connie works out Maya's priorities in a short chat.
 * Script and copy from the Priority Inference frames (Figma 16:2401 to 16:2938).
 * The chat panel here is a page-level shell. ConnieChat is not in the library yet.
 */

type Step =
  | "start"
  | "home"
  | "thinking-home"
  | "travel"
  | "thinking-travel"
  | "done";

const HOME_OPTIONS = [
  "Apartment with elevator",
  "Apartment without elevator",
  "House",
];
const TRAVEL_OPTIONS = [
  "Mostly by car",
  "Mostly public transit",
  "Mostly walking",
];

function Bot({ children }: { children: ReactNode }) {
  return (
    <div className="wt-msg">
      <span className="wt-avatar" aria-hidden>
        C
      </span>
      <div className="wt-msg-body">{children}</div>
    </div>
  );
}

function Options({
  options,
  picked,
  onPick,
  label,
}: {
  options: string[];
  picked: string | null;
  onPick: (o: string) => void;
  label: string;
}) {
  return (
    <div className="wt-options" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className="wt-option"
          aria-pressed={picked === o}
          disabled={picked !== null && picked !== o}
          onClick={() => picked === null && onPick(o)}
        >
          {o}
          {picked === o && <CheckIcon size={14} />}
        </button>
      ))}
    </div>
  );
}

const confirmAll = (list: Priority[]): Priority[] =>
  list.map((p) =>
    p.status === "suggested" ? { ...p, status: "confirmed" } : p,
  );

export function PrioritiesStage() {
  const [step, setStep] = useState<Step>("start");
  const [home, setHome] = useState<string | null>(null);
  const [travel, setTravel] = useState<string | null>(null);
  const [afterHome, setAfterHome] = useState<Priority[]>([]);
  const [current, setCurrent] = useState<Priority[]>([]);
  const [editing, setEditing] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [step, editing]);

  const pickHome = (o: string) => {
    setHome(o);
    setStep("thinking-home");
    window.setTimeout(() => {
      const next =
        o === "Apartment without elevator"
          ? AFTER_APARTMENT
          : confirmAll(prioritiesFromPayload(STARTING_PAYLOAD));
      setAfterHome(next);
      setStep("travel");
    }, 900);
  };

  const pickTravel = (o: string) => {
    setTravel(o);
    setStep("thinking-travel");
    window.setTimeout(() => {
      let next: Priority[];
      if (o === "Mostly public transit") {
        next = afterHome.some(
          (p) => p.label === "Lightweight" && p.status === "boosted",
        )
          ? AFTER_COMMUTE
          : [
              {
                label: "Easy Fold",
                status: "boosted",
                reason: "Recommended based on your commute",
              },
              ...afterHome.filter((p) => p.label !== "Easy Fold"),
            ];
      } else {
        next = afterHome;
      }
      setCurrent(next);
      setStep("done");
    }, 900);
  };

  const raised = current
    .filter((p) => p.status === "boosted")
    .map((p) => p.label);
  const homeReply =
    home === "Apartment without elevator"
      ? "Good to know! Since you'll be carrying your stroller up stairs, we'll prioritize lightweight options."
      : "Good to know! Your four priorities stay as they are for now.";
  const travelReply =
    travel === "Mostly public transit"
      ? "Got it! We'll prioritize strollers that are lightweight and easy to fold for trips on public transit."
      : "Got it! That doesn't change your priorities.";

  return (
    <Stage label="Amazon results page with Connie's chat working out Maya's priorities">
      <img className="wt-bg" src={bg} alt="" width={1440} height={900} />
      <div className="wt-scrim" />
      <StageChrome showDot={false} />

      <aside className="wt-chat" aria-label="Connie chat">
        <header className="wt-chat-header">
          <p className="wt-chat-title">Connie</p>
          <button
            type="button"
            className="wt-chat-close"
            aria-label="Close chat"
            disabled
          >
            <XIcon size={14} />
          </button>
        </header>

        <div className="wt-chat-body" ref={scroller} aria-live="polite">
          <Bot>
            <p className="wt-bubble">
              Shopping for a stroller? I can figure out what fits your life or
              take you straight to the top picks.
            </p>
            {step === "start" && (
              <div className="wt-start">
                <button
                  type="button"
                  className="wt-start-card"
                  onClick={() => setStep("home")}
                >
                  <span className="wt-start-text">
                    <span className="wt-start-title">
                      Help me figure it out
                    </span>
                    <span className="wt-start-sub">
                      A few quick questions about your setup
                    </span>
                  </span>
                  <CaretRightIcon size={18} />
                </button>
                <a className="wt-start-card" href="#decide">
                  <span className="wt-start-text">
                    <span className="wt-start-title">
                      Show me the top 5 now
                    </span>
                    <span className="wt-start-sub">
                      Connie's best picks, ranked
                    </span>
                  </span>
                  <CaretRightIcon size={18} />
                </a>
              </div>
            )}
          </Bot>

          {step !== "start" && (
            <>
              <Bot>
                <p className="wt-bubble">{STARTING_PAYLOAD.message}</p>
                <PriorityChips
                  priorities={prioritiesFromPayload(STARTING_PAYLOAD)}
                />
              </Bot>
              <Bot>
                <p className="wt-bubble">
                  {STARTING_PAYLOAD.follow_up_question}
                </p>
                <Options
                  options={HOME_OPTIONS}
                  picked={home}
                  onPick={pickHome}
                  label="Where you live"
                />
              </Bot>
            </>
          )}

          {step === "thinking-home" && (
            <Bot>
              <p className="wt-thinking">Thinking…</p>
              <PriorityChips priorities={[]} state="loading" />
            </Bot>
          )}

          {(step === "travel" ||
            step === "thinking-travel" ||
            step === "done") && (
            <>
              <Bot>
                <p className="wt-bubble">{homeReply}</p>
                <PriorityChips priorities={afterHome} />
              </Bot>
              <Bot>
                <p className="wt-bubble">
                  Which best describes how you'll usually travel with your
                  stroller?
                </p>
                <Options
                  options={TRAVEL_OPTIONS}
                  picked={travel}
                  onPick={pickTravel}
                  label="How you travel"
                />
              </Bot>
            </>
          )}

          {step === "thinking-travel" && (
            <Bot>
              <p className="wt-thinking">Thinking…</p>
              <PriorityChips priorities={[]} state="loading" />
            </Bot>
          )}

          {step === "done" && (
            <>
              <Bot>
                <p className="wt-bubble">{travelReply}</p>
                <PriorityChips
                  priorities={current}
                  editable={editing}
                  onReorder={(labels: PriorityLabel[]) =>
                    setCurrent([
                      ...labels.map((l) => current.find((p) => p.label === l)!),
                      ...current.filter((p) => p.status === "removed"),
                    ])
                  }
                  onRemove={(label) =>
                    setCurrent(
                      current.map((p) =>
                        p.label === label ? { ...p, status: "removed" } : p,
                      ),
                    )
                  }
                  onRestore={(label) =>
                    setCurrent(
                      current.map((p) =>
                        p.label === label ? { ...p, status: "confirmed" } : p,
                      ),
                    )
                  }
                />
              </Bot>
              <Bot>
                <p className="wt-bubble">
                  {raised.length ? (
                    <>
                      Thanks! Based on your answers, we've increased the
                      priority of{" "}
                      {raised.map((l, i) => (
                        <span key={l}>
                          {i > 0 && " and "}
                          <strong>{l}</strong>
                        </span>
                      ))}{" "}
                      while still considering all four priorities in your
                      recommendations. This narrows your matches from 24 highly
                      rated strollers to 11. You can reorder or add priorities
                      anytime.
                    </>
                  ) : (
                    <>
                      Thanks! I'll weigh all four priorities equally. You can
                      reorder or add priorities anytime.
                    </>
                  )}
                </p>
                <a className="wt-primary" href="#decide">
                  Find my best matches <ArrowRightIcon size={16} />
                </a>
              </Bot>
              <div className="wt-followups">
                <button
                  type="button"
                  className="wt-chip-btn"
                  aria-pressed={editing}
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? "Done reordering" : "Reorder priorities"}
                </button>
                <button
                  type="button"
                  className="wt-chip-btn"
                  disabled
                  title="Not in this prototype"
                >
                  Add another priority
                </button>
              </div>
            </>
          )}
        </div>

        <div className="wt-chat-input" aria-hidden>
          <span>Ask Connie anything…</span>
          <span className="wt-send">
            <PaperPlaneRightIcon size={14} />
          </span>
        </div>
      </aside>
    </Stage>
  );
}
