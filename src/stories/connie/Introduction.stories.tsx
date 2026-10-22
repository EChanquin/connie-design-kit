import type { Meta, StoryObj } from "@storybook/react";
import "./introduction.css";

const meta: Meta = {
  title: "Connie/Introduction",
  parameters: { layout: "fullscreen", options: { showPanel: false } },
};
export default meta;

const COMPONENTS = [
  {
    name: "Product Insight Card",
    story: "connie-product-insight-card--recommended",
    line: "Connie's verdict on the product a shopper is viewing, with the evidence behind it.",
  },
  {
    name: "Claim Annotation Card",
    story: "connie-claim-annotation-card--misleading",
    line: "Checks a marketing claim against CR lab tests and real owner reports.",
  },
  {
    name: "Priority Chips",
    story: "connie-priority-chips--confirmed",
    line: "What Connie thinks matters to the shopper, ranked, and hers to change.",
  },
  {
    name: "Decision Support",
    story: "connie-decision-support--cards",
    line: "Her shortlist, ranked against her priorities, as cards or a table.",
  },
  {
    name: "Check-In Card",
    story: "connie-check-in-card--playable",
    line: "Asks how a purchase went weeks later, so the next parent decides with it.",
  },
];

const RULES = [
  [
    "Never blend sources",
    "CR lab data and community evidence each get their own card and label.",
  ],
  [
    "State is never color alone",
    "Every state changes an icon shape or a word, not only a color.",
  ],
  [
    "The shopper decides",
    "Connie researches and ranks. It never buys, and anything it infers can be changed.",
  ],
];

const LIVE = "https://connie-design-kit.vercel.app";

export const Introduction: StoryObj = {
  render: () => (
    <div className="connie-theme ci-page">
      <header className="ci-hero">
        <div className="ci-brand">
          <span className="ci-mark" aria-hidden>
            C
          </span>
          <span className="ci-brand-text">
            Connie
            <span>by Consumer Reports</span>
          </span>
        </div>
        <h1 className="ci-title">Connie design system</h1>
        <p className="ci-lede">
          Connie is a Consumer Reports browser extension that helps shoppers
          decide, not buy. It puts CR's lab results next to real owner reviews
          on whatever page they're shopping. These are its components, rebuilt
          from the team's Figma on Connie tokens. Each one reads the agent's
          JSON response as-is, so the UI and the agent share one contract.
        </p>
        <div className="ci-links">
          <a
            className="ci-btn ci-btn--primary"
            href={`${LIVE}/#install`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Walk through the journey
          </a>
          <a
            className="ci-btn"
            href={`${LIVE}/#storyboard`}
            target="_blank"
            rel="noopener noreferrer"
          >
            See the storyboard
          </a>
          <a
            className="ci-btn"
            href="https://github.com/EChanquin/connie-design-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code on GitHub
          </a>
        </div>
      </header>

      <section className="ci-section" aria-labelledby="ci-components">
        <h2 id="ci-components" className="ci-eyebrow">
          Components
        </h2>
        <ul className="ci-grid">
          {COMPONENTS.map((c) => (
            <li key={c.name}>
              <a
                className="ci-card"
                href={`?path=/story/${c.story}`}
                target="_top"
              >
                <span className="ci-card-name">{c.name}</span>
                <span className="ci-card-line">{c.line}</span>
                <span className="ci-card-go" aria-hidden>
                  View states →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="ci-section" aria-labelledby="ci-rules">
        <h2 id="ci-rules" className="ci-eyebrow">
          Rules every component follows
        </h2>
        <ul className="ci-rules">
          {RULES.map(([title, line]) => (
            <li key={title}>
              <span className="ci-rule-title">{title}</span>
              <span className="ci-rule-line">{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="ci-footer">
        <p>
          Screens designed by the Connie team. Components and build by Edward
          Chanquin.
        </p>
        <p>
          All data is synthetic. Verdicts and quotes are illustrative and don't
          reflect real CR test results.
        </p>
      </footer>
    </div>
  ),
};
