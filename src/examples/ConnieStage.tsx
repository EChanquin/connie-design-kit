import { useEffect, useState } from "react";
import bgScreenshot from "./connie-stage/bg-screenshot.png";
import cButtonBg from "./connie-stage/c-button-bg.svg";
import cButtonDot from "./connie-stage/c-button-dot.svg";
import cButtonStar from "./connie-stage/c-button-star.svg";
import iconArrowUpRight from "./connie-stage/icon-arrow-up-right.svg";
import iconChat from "./connie-stage/icon-chat.svg";
import iconGear from "./connie-stage/icon-gear.svg";
import iconHeart from "./connie-stage/icon-heart.svg";
import iconLine from "./connie-stage/icon-line.svg";
import iconLink from "./connie-stage/icon-link.svg";
import iconQuestion from "./connie-stage/icon-question.svg";
import iconX from "./connie-stage/icon-x.svg";
import iconXCircle from "./connie-stage/icon-x-circle.svg";
import logoCr from "./connie-stage/logo-cr.png";
import logoReddit from "./connie-stage/logo-reddit.png";
import "./connie-stage.css";

// ─── Figma-exact annotation card (node 16:6796) ──────────────────────────────
// Uses downloaded Figma assets; matches layout, spacing, and typography exactly
function AnnotationCard({ onClose }: { onClose: () => void }) {
  return (
    /* Outer card: bg secondary #fafaf7, border #c5c5c5 0.5px, radius 16, shadow */
    <div className="cs-card" role="region" aria-label='Claim check: "Comfortable &amp; Adjustable: Padded stroller seat"'>
      {/* Header row: icon + title + close */}
      <div className="cs-card-header">
        <div className="cs-card-verdict-row">
          {/* Solid-filled XCircle — Figma asset, fill #AE0D00 */}
          <img src={iconXCircle} width={20} height={20} alt="Misleading" className="cs-verdict-icon" />
          {/* Title 4: Semibold 18/22, -0.25 tracking */}
          <span className="cs-verdict-title">Misleading claim</span>
        </div>
        {/* Close — aria-label, medium touch target */}
        <button className="cs-close-btn" onClick={onClose} aria-label="Close claim check">
          <img src={iconX} width={18} height={18} alt="" aria-hidden />
        </button>
      </div>

      {/* Subtitle: Utility 1, 14/20 */}
      <p className="cs-subtitle">Doesn't match what our testers and real users are saying.</p>

      {/* Evidence area: 2 cards side by side — sources always labeled, never blended */}
      <div className="cs-evidence-row">
        {/* CR evidence card */}
        <div className="cs-evidence-card">
          <div className="cs-source-row">
            <img src={logoCr} width={16} height={16} alt="" className="cs-source-avatar" aria-hidden />
            {/* Source name: Utility 2, Semibold 12/16 */}
            <span className="cs-source-name">Consumer Reports</span>
          </div>
          {/* Quote: Utility 3, Regular 12/17 */}
          <p className="cs-quote">"Seat cushioning compressed quickly and offered little support during longer rides."</p>
          {/* Source chip: pill with Link + label + ArrowUpRight */}
          <a
            href="https://www.consumerreports.org"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-source-chip"
          >
            <img src={iconLink} width={14} height={14} alt="" aria-hidden />
            <span>Baby Trend Stroller Review</span>
            <img src={iconArrowUpRight} width={12} height={12} alt="" aria-hidden />
          </a>
        </div>

        {/* Community evidence card */}
        <div className="cs-evidence-card">
          <div className="cs-source-row">
            <img src={logoReddit} width={16} height={16} alt="" className="cs-source-avatar" aria-hidden />
            <span className="cs-source-name">Reddit</span>
          </div>
          <p className="cs-quote">"My daughter fusses to get out after one loop around the block."</p>
          <a
            href="https://www.reddit.com/r/Strollers"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-source-chip"
          >
            <img src={iconLink} width={14} height={14} alt="" aria-hidden />
            <span>Stroller Discussion: Thread</span>
            <img src={iconArrowUpRight} width={12} height={12} alt="" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Stage ────────────────────────────────────────────────────────────────────
// 1440×900 fixed canvas matching Figma frame 16:6784
export function ConnieStage() {
  const [cardOpen, setCardOpen] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const s = Math.min(window.innerWidth / 1440, window.innerHeight / 900, 1);
      setScale(s);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const scaledW = Math.round(1440 * scale);
  const scaledH = Math.round(900 * scale);

  return (
    <div className="connie-stage-wrapper">
      {/* Size box collapses to the visual footprint so flexbox can center it */}
      <div style={{ width: scaledW, height: scaledH, flexShrink: 0 }}>
      <div
        className="connie-stage"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        aria-label="Connie — inline claim annotation demo"
      >

        {/* Layer 1: Amazon page background screenshot + dim scrim (node 16:6785) */}
        <div className="cs-bg" aria-hidden>
          <img src={bgScreenshot} className="cs-bg-img" alt="" />
          <div className="cs-bg-scrim" />
        </div>

        {/* Layer 2: Green highlight — "Versatile Design" (verified, decorative) */}
        {/* Figma: left 530, top 173, w 521, h 21, #00803e opacity 0.2 */}
        <div
          className="cs-highlight cs-highlight--green"
          aria-hidden
        />

        {/* Layer 3: Red highlight — "Comfortable & Adjustable" (misleading, clickable) */}
        {/* Figma: left 536, top 315, w 325, h 21, #ae0d00 opacity 0.3 */}
        <button
          className="cs-highlight cs-highlight--red"
          onClick={() => setCardOpen(true)}
          aria-label='Open claim check for "Comfortable &amp; Adjustable: Padded stroller seat"'
          aria-expanded={cardOpen}
        />

        {/* Layer 4: NaviBar — left toolbar (node 16:4374) */}
        {/* Figma: left 34, top 316 */}
        <div className="cs-navibar" aria-hidden>
          <div className="cs-navibar-group">
            <img src={iconChat} width={40} height={40} alt="" />
            <img src={iconHeart} width={40} height={40} alt="" />
          </div>
          <img src={iconLine} width={40} height={0} alt="" className="cs-navibar-divider" />
          <div className="cs-navibar-group">
            <img src={iconGear} width={40} height={40} alt="" />
            <img src={iconQuestion} width={40} height={40} alt="" />
          </div>
        </div>

        {/* Layer 5: Connie C button (node 16:6789) */}
        {/* Figma: left 34, top 584, 60×60 */}
        <div className="cs-c-button" aria-hidden>
          <img src={cButtonBg} width={60} height={60} alt="" className="cs-c-bg" />
          <span className="cs-c-letter">C</span>
          <img src={cButtonStar} width={16} height={16} alt="" className="cs-c-star" />
          <img src={cButtonDot} width={14} height={14} alt="" className="cs-c-dot" />
        </div>

        {/* Layer 6: Annotation card — Figma: left 647, top 361 */}
        {cardOpen && (
          <div className="cs-card-anchor">
            <AnnotationCard onClose={() => setCardOpen(false)} />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
