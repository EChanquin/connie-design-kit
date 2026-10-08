# Component Index

Master index of all SDS components. Check here before building anything — if SDS has it, use it.

## Connie compositions

Built on SDS for Connie. Use these before composing anything new from primitives.

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| ClaimAnnotationCard | Claim check card with verdict and labeled evidence. Full rules in [claim-annotation-card.md](claim-annotation-card.md) | Showing whether a product claim holds up | `import { ClaimAnnotationCard } from "compositions"` |

## Actions

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Button | Primary interactive element | User triggers an action | `import { Button } from "primitives"` |
| IconButton | Compact icon-only button | Secondary action, tight space | `import { IconButton } from "primitives"` |
| Link | Inline navigation element | Navigating to another page/section | `import { Link } from "primitives"` |

## Containment

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Accordion | Expandable content sections | Collapsible content (FAQ, details) | `import { Accordion } from "primitives"` |
| Dialog | Modal overlay | Critical decisions, confirmations, focused tasks | `import { Dialog } from "primitives"` |
| Menu | Dropdown menu | Action list on click/hover | `import { Menu } from "primitives"` |
| Tooltip | Hover/focus popup | Supplementary info without navigation | `import { Tooltip } from "primitives"` |

## Communication

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Notification | Alert/status message | System feedback, success/error messages | `import { Notification } from "primitives"` |
| Tag | Label/badge | Categorization, status indicators | `import { Tag } from "primitives"` |

## Navigation

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Navigation | Primary nav bar | Top-level site navigation | `import { Navigation } from "primitives"` |
| Tab | Tabbed content switcher | Switching between views in-place | `import { Tab } from "primitives"` |
| Pagination | Page navigation | Multi-page content navigation | `import { Pagination } from "primitives"` |

## Selection

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Checkbox | Multi-select toggle | Multiple selections from a list | `import { Checkbox } from "primitives"` |
| Radio | Single-select option | One choice from a set | `import { Radio } from "primitives"` |
| Switch | On/off toggle | Binary setting | `import { Switch } from "primitives"` |
| Select | Dropdown picker | Choosing from many options | `import { Select } from "primitives"` |
| ListBox | Scrollable selection list | Visible multi-option selection | `import { ListBox } from "primitives"` |
| Slider | Range input | Numeric value in a range | `import { Slider } from "primitives"` |

## Text Input

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Input | Single-line text field | Short text entry (name, email) | `import { Input } from "primitives"` |
| Textarea | Multi-line text field | Long text entry (comments, bio) | `import { Textarea } from "primitives"` |
| Search | Search input | Search/filter functionality | `import { Search } from "primitives"` |
| Fieldset | Form field grouping | Grouping related form fields with a legend | `import { Fieldset } from "primitives"` |

## Layout

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Flex | Flexbox container | One-dimensional row/column layouts | `import { Flex } from "layout"` |
| Grid | CSS grid container | Two-dimensional multi-column layouts | `import { Grid } from "layout"` |
| Section | Semantic page section | Top-level page regions with padding | `import { Section } from "layout"` |

## Media

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Avatar | User/entity image | Profile pictures, user representations | `import { Avatar } from "primitives"` |
| Image | Responsive image | Photos, illustrations, screenshots | `import { Image } from "primitives"` |
| Logo | Brand mark | App branding, partner logos | `import { Logo } from "primitives"` |
| Icon | Icon wrapper | Displaying any of the 290+ SDS icons | `import { Icon } from "primitives"` |

## Typography

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Text | All text rendering | Headings, body, labels — any text | `import { Text } from "primitives"` |

## Compositions

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Cards | Content card layouts | Feature highlights, info blocks | `import { ... } from "compositions"` |
| Forms | Form compositions | Complete form patterns | `import { ... } from "compositions"` |
| Headers | Page headers | Top-of-page content with nav | `import { Header } from "compositions"` |
| Footers | Page footers | Bottom-of-page content and links | `import { Footer } from "compositions"` |
| Sections | Page section compositions | Pre-built section layouts | `import { ... } from "compositions"` |

## Data Layer

| Hook | Description | Import |
|------|-------------|--------|
| `useAuth` | Authentication state | `import { useAuth } from "data"` |
| `usePricing` | Pricing data | `import { usePricing } from "data"` |
| `useProducts` | Product catalog | `import { useProducts } from "data"` |
| `useMediaQuery` | Responsive breakpoints | `import { useMediaQuery } from "hooks"` |

## Table

| Component | Description | Use when... | Import |
|-----------|-------------|-------------|--------|
| Table | Data table | Structured tabular data | `import { Table } from "primitives"` |

## Storybook

- Live: https://figma.github.io/sds/storybook
- Local: `npm run storybook`

Always check Storybook for full prop documentation and interactive examples.
