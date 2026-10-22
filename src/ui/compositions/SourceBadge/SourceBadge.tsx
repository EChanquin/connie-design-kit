import clsx from "clsx";
import type { SourceType } from "../connie/connieContract";
import { ArrowUpRightIcon } from "../connie/phosphorIcons";
import logoCr from "./assets/logo-cr.png";
import logoInstagram from "./assets/logo-instagram.png";
import logoReddit from "./assets/logo-reddit.png";
import logoYoutube from "./assets/logo-youtube.png";
import "./sourceBadge.css";

/** Source logos exported from the Connie Figma. */
export const SOURCE_LOGOS = {
  cr: logoCr,
  reddit: logoReddit,
  instagram: logoInstagram,
  youtube: logoYoutube,
} as const;

/**
 * Every source the UI can label. The agent contract's SourceType, plus "instagram",
 * which the Figma shows as a source a shopper can connect (it is not in the contract yet).
 */
export type ConnieSource = SourceType | "instagram";

const SOURCE_META: Record<ConnieSource, { label: string; logo?: string }> = {
  consumer_reports: { label: "Consumer Reports", logo: SOURCE_LOGOS.cr },
  reddit: { label: "Reddit", logo: SOURCE_LOGOS.reddit },
  youtube: { label: "YouTube", logo: SOURCE_LOGOS.youtube },
  instagram: { label: "Instagram", logo: SOURCE_LOGOS.instagram },
  web: { label: "Web" },
};

export const sourceLabel = (source: ConnieSource) => SOURCE_META[source].label;
export const sourceLogo = (source: ConnieSource) => SOURCE_META[source].logo;

type SourceLogoProps = {
  source: ConnieSource;
  /** 16 in rows and chips, 20 in larger chips */
  size?: 16 | 20;
  /** Set when the logo stands alone, so screen readers hear the source name */
  labelled?: boolean;
  className?: string;
};

/** A source's round logo. Sources without a logo show their first letter. */
export function SourceLogo({
  source,
  size = 16,
  labelled = false,
  className,
}: SourceLogoProps) {
  const logo = sourceLogo(source);
  const label = sourceLabel(source);
  const cls = clsx("sb-logo", `sb-logo--${size}`, className);
  if (!logo) {
    return (
      <span
        className={clsx(cls, "sb-logo--letter")}
        aria-hidden={!labelled}
        aria-label={labelled ? label : undefined}
      >
        {label.charAt(0)}
      </span>
    );
  }
  return (
    <img
      className={cls}
      src={logo}
      width={size}
      height={size}
      alt={labelled ? label : ""}
    />
  );
}

type SourceStackProps = {
  /** Sources in display order. CR first when present. */
  sources: ConnieSource[];
  /** Sources behind the summary that aren't shown as logos */
  extraCount?: number;
  className?: string;
};

/** Overlapping source logos with a "+N" count, used on insight rows. */
export function SourceStack({
  sources,
  extraCount = 0,
  className,
}: SourceStackProps) {
  const names = sources.map(sourceLabel);
  const spoken =
    names.join(", ") + (extraCount > 0 ? `, and ${extraCount} more` : "");
  return (
    <span className={clsx("sb-stack", className)}>
      <span className="sb-visually-hidden">Sources: {spoken}</span>
      <span className="sb-stack-logos" aria-hidden>
        {sources.map((s, i) => (
          <SourceLogo key={`${s}-${i}`} source={s} />
        ))}
      </span>
      {extraCount > 0 && (
        <span className="sb-stack-count" aria-hidden>
          +{extraCount}
        </span>
      )}
    </span>
  );
}

type SourceLinkProps = {
  source: ConnieSource;
  /** Human-readable label, never a raw URL */
  label: string;
  /** Null when the source has no public page (e.g. CR database rows). Renders a plain chip. */
  href: string | null;
  className?: string;
};

/** A chip that links one piece of evidence to where it came from. */
export function SourceLink({
  source,
  label,
  href,
  className,
}: SourceLinkProps) {
  const content = (
    <>
      <SourceLogo source={source} />
      <span className="sb-link-label">{label}</span>
    </>
  );
  if (!href) {
    return <span className={clsx("sb-link", className)}>{content}</span>;
  }
  return (
    <a
      className={clsx("sb-link", "sb-link--interactive", className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
      <ArrowUpRightIcon size={12} className="sb-link-arrow" />
      <span className="sb-visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
