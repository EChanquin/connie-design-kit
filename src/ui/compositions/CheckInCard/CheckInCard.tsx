import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { PostPurchasePayload } from "../connie/connieContract";
import { ArrowUpIcon, XIcon } from "../connie/phosphorIcons";
import "./checkInCard.css";

/** One question in the check-in and, once she's answered, her answer. */
export type CheckInStep = {
  message: string;
  options: string[];
  /** The option she picked */
  answer?: string;
  /** What her reply bubble says, when it reads differently from the option ("Love it - worth every penny") */
  reply?: string;
  /** Leave her pick outlined without a reply bubble (the last question in Figma 16:4307) */
  silent?: boolean;
};

export type CheckInProduct = {
  name: string;
  image?: string;
  rankLabel?: string;
  price?: string;
  retailer?: string;
};

export type CheckInCardProps = {
  /** The product she saved, shown under the first question */
  product: CheckInProduct;
  steps: CheckInStep[];
  /** Connie is writing the next message */
  typing?: boolean;
  /** Closing note once she's done, e.g. how many parents her answer helped */
  thanks?: string;
  onAnswer?: (stepIndex: number, option: string) => void;
  onClose?: () => void;
  className?: string;
};

/** Turns the agent's `post_purchase` payload into the first check-in step. */
export const checkInStepFromPayload = (
  payload: PostPurchasePayload,
): CheckInStep => ({
  message: payload.message,
  options: payload.sentiment_options,
});

/** The thank-you line from the payload's community stat, when the agent sends one. */
export const thanksFromPayload = (
  payload: PostPurchasePayload,
): string | undefined =>
  payload.community_stat
    ? `Thanks! ${payload.community_stat.percent}% ${payload.community_stat.statement}.`
    : undefined;

/**
 * Connie checks in weeks after a purchase and asks how it went, one tap at a time.
 * Her answers go back to the community, so the next parent decides with them.
 * Matches the Connie Figma (Vision Board, Post-Purchase 16:3966 to 16:4307).
 * Usage rules: context/design-system/components/check-in-card.md
 */
export function CheckInCard({
  product,
  steps,
  typing = false,
  thanks,
  onAnswer,
  onClose,
  className,
}: CheckInCardProps) {
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    body.current?.scrollTo({
      top: body.current.scrollHeight,
      behavior: "smooth",
    });
  }, [steps.length, typing, thanks, steps]);

  return (
    <section
      className={clsx("check-in-card connie-theme", className)}
      aria-label="Connie check-in"
    >
      <header className="cic-header">
        <span className="cic-logo" aria-hidden>
          C
        </span>
        <span className="cic-brand">
          <span className="cic-name">Connie</span>
          <span className="cic-org">Consumer Reports</span>
        </span>
        {onClose && (
          <button
            type="button"
            className="cic-close"
            aria-label="Close check-in"
            onClick={onClose}
          >
            <XIcon size={16} />
          </button>
        )}
      </header>

      <div className="cic-body" ref={body} aria-live="polite" tabIndex={0} aria-label="Check-in conversation">
        {steps.map((step, i) => {
          const answered = step.answer !== undefined;
          return (
            <div key={i} className="cic-turn">
              <p className="cic-bubble">{step.message}</p>

              {i === 0 && (
                <div className="cic-product">
                  <span className="cic-product-image">
                    {product.image && <img src={product.image} alt="" />}
                  </span>
                  <span className="cic-product-info">
                    {product.rankLabel && (
                      <span className="cic-rank">{product.rankLabel}</span>
                    )}
                    <span className="cic-product-name">{product.name}</span>
                    {(product.price || product.retailer) && (
                      <span className="cic-product-price">
                        {product.price}
                        {product.retailer && (
                          <span className="cic-retailer">
                            At {product.retailer}
                          </span>
                        )}
                      </span>
                    )}
                  </span>
                </div>
              )}

              <div
                className="cic-options"
                role="group"
                aria-label={step.message}
              >
                {step.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    className="cic-option"
                    aria-pressed={step.answer === o}
                    disabled={answered}
                    onClick={() => onAnswer?.(i, o)}
                  >
                    {o}
                  </button>
                ))}
              </div>

              {answered && !step.silent && (
                <p className="cic-reply">
                  <span className="cic-visually-hidden">You said: </span>
                  {step.reply ?? step.answer}
                </p>
              )}
            </div>
          );
        })}

        {typing && (
          <p className="cic-typing" role="status" aria-label="Connie is typing">
            <span />
            <span />
            <span />
          </p>
        )}

        {thanks && (
          <p className="cic-thanks">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden
              focusable="false"
            >
              {/* Figma 16:4307 thank-you star */}
              <path
                d="M10 2.5L12.1667 7.33333L17.5 7.75L13.4167 11.25L14.6667 16.4167L10 14.0833L5.33333 16.5833L6.58333 11.4167L2.5 7.75L7.83333 7.33333L10 2.5Z"
                fill="currentColor"
              />
            </svg>
            {thanks}
          </p>
        )}
      </div>

      {/* Free text isn't wired in this prototype. The field shows where it lives. */}
      <div className="cic-input" aria-hidden>
        <span>Add anything in your own words…</span>
        <span className="cic-send">
          <ArrowUpIcon size={14} />
        </span>
      </div>
    </section>
  );
}
