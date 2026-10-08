# Connie Tokens

Pulled from the Connie Figma file (Vision Board, "Inline annotations" frames). The values live in `src/connie-theme.css` as `--connie-*` custom properties. The `.connie-theme` class points SDS semantic tokens at them, so components keep using `--sds-*` names but render Connie's look. Put `.connie-theme` on a container, never hardcode the hex values below in component CSS.

## Color

| Connie token | Value | Use | SDS token to override |
|---|---|---|---|
| color/foreground/primary | #050500 | Titles, quote text | --sds-color-text-default-default |
| color/foreground/secondary | #666661 | Subtitles, source labels, "unable to verify" icon | --sds-color-text-default-secondary |
| color/foreground/attention | #ae0d00 | Misleading claim icon | --sds-color-icon-danger-default |
| color/foreground/brand | #00803e | Verified claim icon | --sds-color-icon-positive-default |
| color/background/primary | #ffffff | Evidence cards | --sds-color-background-default-default |
| color/background/secondary | #fafaf7 | Outer annotation card | --sds-color-background-default-secondary |
| color/border/subtle | #d8d9d4 | Evidence card and link-chip borders | --sds-color-border-default-default |
| border card (from node 16:6796) | #c5c5c5 | Outer annotation card border | `--connie-color-border-card` |
| background hover | #f5f5f3 | Chip and close button hover | `--connie-color-background-hover` |

## Typography (CR-Averta)

| Connie style | Spec | Use |
|---|---|---|
| Title 4 | Semibold 18/22, -0.25 | Verdict title ("Misleading claim") |
| Utility 1 | Regular 14/20 | Subtitle, quotes |
| Utility 2 (Eyebrow) | Semibold 12/16 | Source name ("Consumer Reports", "Reddit") |
| Utility 3 | Regular 12/17 | Link chip text |

CR-Averta is a licensed CR font. If it isn't available locally, fall back to the SDS default sans and note it. Do not substitute a lookalike web font.

## Spacing and shape

| Token | Value |
|---|---|
| spacing-core-25 / 50 / 75 / 100 / 300 | 2 / 4 / 8 / 12 / 24 px |
| radius small / medium / 2x-large | 8 / 16 / 48 px |
| Drop shadow | 0 0 15px #05050029 |

## Component mapping (use SDS, don't build custom)

| Card part | SDS component |
|---|---|
| Outer card | Card or Flex with background-secondary, radius medium, shadow |
| Verdict row | Flex + Icon + TextHeading |
| Evidence cards | Grid (2 columns, 1 on mobile) of Card |
| Source link chip | Tag or Button (subtle) with Link + ArrowUpRight icons, href required |
| Close | IconButton (X), aria-label "Close" |
| Add more sources | Button (secondary), radius 2x-large |
