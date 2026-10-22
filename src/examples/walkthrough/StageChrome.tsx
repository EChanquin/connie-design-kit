import "../connie-stage.css";
import cButtonBg from "../connie-stage/c-button-bg.svg";
import cButtonDot from "../connie-stage/c-button-dot.svg";
import cButtonStar from "../connie-stage/c-button-star.svg";
import iconChat from "../connie-stage/icon-chat.svg";
import iconGear from "../connie-stage/icon-gear.svg";
import iconHeart from "../connie-stage/icon-heart.svg";
import iconLine from "../connie-stage/icon-line.svg";
import iconQuestion from "../connie-stage/icon-question.svg";

/**
 * Connie's always-on page chrome: the nav rail and the C button, drawn at Figma
 * coordinates (frame 16:6784). Static images until ConnieNavBar is built.
 * Shared by the claim stage and every walkthrough stage.
 */
export function StageChrome({ showDot = true }: { showDot?: boolean }) {
  return (
    <>
      <div className="cs-navibar" aria-hidden>
        <div className="cs-navibar-group">
          <img src={iconChat} width={40} height={40} alt="" />
          <img src={iconHeart} width={40} height={40} alt="" />
        </div>
        <img
          src={iconLine}
          width={40}
          height={0}
          alt=""
          className="cs-navibar-divider"
        />
        <div className="cs-navibar-group">
          <img src={iconGear} width={40} height={40} alt="" />
          <img src={iconQuestion} width={40} height={40} alt="" />
        </div>
      </div>

      <div className="cs-c-button" aria-hidden>
        <img
          src={cButtonBg}
          width={60}
          height={60}
          alt=""
          className="cs-c-bg"
        />
        <span className="cs-c-letter">C</span>
        <img
          src={cButtonStar}
          width={16}
          height={16}
          alt=""
          className="cs-c-star"
        />
        {showDot && (
          <img
            src={cButtonDot}
            width={14}
            height={14}
            alt=""
            className="cs-c-dot"
          />
        )}
      </div>
    </>
  );
}
