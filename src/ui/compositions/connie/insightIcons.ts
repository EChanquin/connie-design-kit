import type { ComponentType } from "react";
import type { InsightCategory } from "./connieContract";
import {
  CityGlyph,
  CloudGlyph,
  DiamondGlyph,
  FoldGlyph,
  SafetyGlyph,
  TopRatedGlyph,
} from "./figmaIcons";
import {
  ArrowsInLineHorizontalIcon,
  HeartBreakIcon,
  ScribbleIcon,
  SmileySadIcon,
  XCircleIcon,
} from "./phosphorIcons";

export type Glyph = ComponentType<{
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}>;

// Positive insights use the Figma icons from the Recommended frame (16:1602).
// Contract categories without their own Figma icon fall back to the Top Rated star.
const POSITIVE_ICON: Record<InsightCategory, Glyph> = {
  safety: SafetyGlyph,
  maneuverability: CityGlyph,
  fold: FoldGlyph,
  ease_of_use: TopRatedGlyph,
  service: TopRatedGlyph,
  durability: DiamondGlyph,
  value: TopRatedGlyph,
  comfort: CloudGlyph,
};

// Drawbacks use the Phosphor icons named in the Not Recommended frame (16:1664).
// "Low Rated" is a raster image in Figma, so categories without a named icon use XCircle.
const CAUTION_ICON: Record<InsightCategory, Glyph> = {
  safety: XCircleIcon,
  maneuverability: ScribbleIcon,
  fold: ArrowsInLineHorizontalIcon,
  ease_of_use: XCircleIcon,
  service: XCircleIcon,
  durability: HeartBreakIcon,
  value: XCircleIcon,
  comfort: SmileySadIcon,
};

/** Figma draws a few positive icons at other sizes */
export const INSIGHT_ICON_SIZE: Partial<Record<InsightCategory, number>> = {
  maneuverability: 18,
  fold: 28,
};

/** The icon for an insight category. Shared by the Product Insight Card and Decision Support. */
export const insightIcon = (
  category: InsightCategory,
  drawback: boolean,
): Glyph => (drawback ? CAUTION_ICON : POSITIVE_ICON)[category];
