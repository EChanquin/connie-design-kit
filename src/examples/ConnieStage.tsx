import { useEffect, useRef, useState } from "react";
import bgScreenshot from "./connie-stage/bg-screenshot.png";
import cButtonBg from "./connie-stage/c-button-bg.svg";
import cButtonDot from "./connie-stage/c-button-dot.svg";
import cButtonStar from "./connie-stage/c-button-star.svg";
import iconArrowUpRight from "./connie-stage/icon-arrow-up-right.svg";
import iconChat from "./connie-stage/icon-chat.svg";
import iconCheckCircle from "./connie-stage/icon-check-circle.svg";
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

// ─── Misleading annotation card (node 16:6796) ───────────────────────────────
function MisleadingCard({ onClose }: { onClose: () => void }) {
  return (
    <div className="cs-card" role="region" aria-label='Claim check: "Comfortable &amp; Adjustable: Padded stroller seat"'>
      <div className="cs-card-header">
        <div className="cs-card-verdict-row">
          <img src={iconXCircle} width={20} height={20} alt="Misleading" className="cs-verdict-icon" />
          <span className="cs-verdict-title">Misleading claim</span>
        </div>
        <button className="cs-close-btn" onClick={onClose} aria-label="Close claim check">
          <img src={iconX} width={18} height={18} alt="" aria-hidden />
        </button>
      </div>
      <p className="cs-subtitle">Doesn't match what our testers and real users are saying.</p>
      <div className="cs-evidence-row">
        <div className="cs-evidence-card">
          <div className="cs-source-row">
            <img src={logoCr} width={16} height={16} alt="" className="cs-source-avatar" aria-hidden />
            <span className="cs-source-name">Consumer Reports</span>
          </div>
          <p className="cs-quote">"Seat cushioning compressed quickly and offered little support during longer rides."</p>
          <a href="https://www.consumerreports.org" target="_blank" rel="noopener noreferrer" className="cs-source-chip">
            <img src={iconLink} width={14} height={14} alt="" aria-hidden />
            <span>Baby Trend Stroller Review</span>
            <img src={iconArrowUpRight} width={12} height={12} alt="" aria-hidden />
          </a>
        </div>
        <div className="cs-evidence-card">
          <div className="cs-source-row">
            <img src={logoReddit} width={16} height={16} alt="" className="cs-source-avatar" aria-hidden />
            <span className="cs-source-name">Reddit</span>
          </div>
          <p className="cs-quote">"My daughter fusses to get out after one loop around the block."</p>
          <a href="https://www.reddit.com/r/Strollers" target="_blank" rel="noopener noreferrer" className="cs-source-chip">
            <img src={iconLink} width={14} height={14} alt="" aria-hidden />
            <span>Stroller Discussion: Thread</span>
            <img src={iconArrowUpRight} width={12} height={12} alt="" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Verified annotation card (node 16:6860) ─────────────────────────────────
function VerifiedCard({ onClose }: { onClose: () => void }) {
  return (
    <div className="cs-card" role="region" aria-label='Claim check: "Versatile Design"'>
      <div className="cs-card-header">
        <div className="cs-card-verdict-row">
          <img src={iconCheckCircle} width={20} height={20} alt="Verified" className="cs-verdict-icon" />
          <span className="cs-verdict-title">Verified claim</span>
        </div>
        <button className="cs-close-btn" onClick={onClose} aria-label="Close claim check">
          <img src={iconX} width={18} height={18} alt="" aria-hidden />
        </button>
      </div>
      <p className="cs-subtitle">Matches what our testers and real users are saying.</p>
      <div className="cs-evidence-row">
        <div className="cs-evidence-card">
          <div className="cs-source-row">
            <img src={logoCr} width={16} height={16} alt="" className="cs-source-avatar" aria-hidden />
            <span className="cs-source-name">Consumer Reports</span>
          </div>
          <p className="cs-quote">"Testers found it very maneuverable; it's a breeze to navigate through crowded spaces."</p>
          <a href="https://www.consumerreports.org" target="_blank" rel="noopener noreferrer" className="cs-source-chip">
            <img src={iconLink} width={14} height={14} alt="" aria-hidden />
            <span>Baby Trend Stroller Review</span>
            <img src={iconArrowUpRight} width={12} height={12} alt="" aria-hidden />
          </a>
        </div>
        <div className="cs-evidence-card">
          <div className="cs-source-row">
            <img src={logoReddit} width={16} height={16} alt="" className="cs-source-avatar" aria-hidden />
            <span className="cs-source-name">Reddit</span>
          </div>
          <p className="cs-quote">"Does well on long walks."</p>
          <a href="https://www.reddit.com/r/Strollers" target="_blank" rel="noopener noreferrer" className="cs-source-chip">
            <img src={iconLink} width={14} height={14} alt="" aria-hidden />
            <span>Best Strollers: Thread</span>
            <img src={iconArrowUpRight} width={12} height={12} alt="" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Stage ────────────────────────────────────────────────────────────────────
// 1440×900 fixed canvas matching Figma frame 16:6784 / 16:6848
export function ConnieStage() {
  const [openCard, setOpenCard] = useState<"misleading" | "verified" | null>(null);
  const [scale, setScale] = useState(1);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const compute = () => {
      const s = Math.min(window.innerWidth / 1440, window.innerHeight / 900, 1);
      setScale(s);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenCard(null), 300);
  };
  const open = (card: "misleading" | "verified") => {
    cancelClose();
    setOpenCard(card);
  };
  const close = () => {
    cancelClose();
    setOpenCard(null);
  };

  const scaledW = Math.round(1440 * scale);
  const scaledH = Math.round(900 * scale);

  return (
    <div className="connie-stage-wrapper">
      <div style={{ width: scaledW, height: scaledH, flexShrink: 0 }}>
        <div
          className="connie-stage"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
          aria-label="Connie — inline claim annotation demo"
        >
          {/* Layer 1: Amazon page background screenshot + dim scrim */}
          <div className="cs-bg" aria-hidden>
            <img src={bgScreenshot} className="cs-bg-img" alt="" />
            <div className="cs-bg-scrim" />
          </div>

          {/* Layer 2: Green highlight — "Versatile Design" (verified) */}
          {/* Figma: left 530, top 173, w 521, h 21 */}
          <button
            className="cs-highlight cs-highlight--green"
            onMouseEnter={() => open("verified")}
            onMouseLeave={scheduleClose}
            onFocus={() => open("verified")}
            aria-label='Open claim check for "Versatile Design"'
            aria-expanded={openCard === "verified"}
          />

          {/* Layer 3: Red highlight — "Comfortable & Adjustable" (misleading) */}
          {/* Figma: left 536, top 315, w 325, h 21 */}
          <button
            className="cs-highlight cs-highlight--red"
            onMouseEnter={() => open("misleading")}
            onMouseLeave={scheduleClose}
            onFocus={() => open("misleading")}
            aria-label='Open claim check for "Comfortable &amp; Adjustable: Padded stroller seat"'
            aria-expanded={openCard === "misleading"}
          />

          {/* Layer 4: NaviBar */}
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

          {/* Layer 5: Connie C button */}
          <div className="cs-c-button" aria-hidden>
            <img src={cButtonBg} width={60} height={60} alt="" className="cs-c-bg" />
            <span className="cs-c-letter">C</span>
            <img src={cButtonStar} width={16} height={16} alt="" className="cs-c-star" />
            <img src={cButtonDot} width={14} height={14} alt="" className="cs-c-dot" />
          </div>

          {/* Layer 6: Verified card — Figma: left 862, top 215 */}
          {openCard === "verified" && (
            <div
              className="cs-card-anchor cs-card-anchor--verified"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <VerifiedCard onClose={close} />
            </div>
          )}

          {/* Layer 7: Misleading card — Figma: left 647, top 361 */}
          {openCard === "misleading" && (
            <div
              className="cs-card-anchor"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <MisleadingCard onClose={close} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
