import { useEffect, useState, type ReactNode } from "react";

export const STEPPER_HEIGHT = 64;
export const CAPTION_HEIGHT = 72;

/** Scale the 1440 x 900 stage to the space left after the stepper and caption. */
function useStageScale(reserved: number) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const compute = () =>
      setScale(
        Math.min(
          (window.innerWidth - 32) / 1440,
          (window.innerHeight - reserved) / 900,
          1,
        ),
      );
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [reserved]);
  return scale;
}

/** A 1440 x 900 stage, scaled down to fit, in Figma coordinates. */
export function Stage({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const scale = useStageScale(STEPPER_HEIGHT + CAPTION_HEIGHT);
  return (
    <div
      className="wt-stage-slot"
      style={{
        width: Math.round(1440 * scale),
        height: Math.round(900 * scale),
      }}
    >
      <div
        className="connie-stage wt-stage"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        role="region"
        aria-label={label}
      >
        {children}
      </div>
    </div>
  );
}
