# Button Group

Button groups keep related actions visually connected so compound controls read as one unit.

## Basic Usage

Use a button group when several adjacent actions belong to the same workflow. End a Craft-style toolbar with `group-trigger` for the disclosure control — not a slotted chevron icon.

<ComponentPreview src="./examples/button-group-basic.preview.web.ts" />

## Menu Trigger (`group-trigger`)

A split toolbar is just labeled actions plus a disclosure end-cap. `group-trigger` is the attribute on that end-cap (Craft `.menubtn`): narrow padding and a CSS chevron. Do not slot `chevron-down` — that keeps a full square hit target.

<ComponentPreview src="./examples/button-group-menu-trigger.preview.web.ts" />

## Separators

Separators are **on by default** — a 1px divider between joined controls. Set `separators="false"` for a flush join.

<ComponentPreview src="./examples/button-group-separators.preview.web.ts" />

## Split Actions

Split-button patterns keep the primary action obvious while still exposing closely related secondary options. The end-cap uses `group-trigger`.

<ComponentPreview src="./examples/button-group-split-actions.preview.web.ts" />

## Sizes

Button groups should scale cleanly with the shared button size system so they can fit toolbars and denser control areas.

<ComponentPreview src="./examples/button-group-sizes.preview.web.ts" />

## Orientation

Vertical orientation keeps related actions grouped when horizontal space is limited or the controls need to read more like a menu.

<ComponentPreview src="./examples/button-group-orientation.preview.web.ts" />

## Other Controls

Button groups can combine buttons with adjacent fields and overlays when the control should still read as one compact action bar.

<ComponentPreview src="./examples/button-group-other-controls.preview.web.ts" />

## Dropdown

Dropdown triggers work well at the end of a group when the primary action remains visible but secondary actions need extra space. Use `group-trigger` on the menu’s trigger button.

<ComponentPreview src="./examples/button-group-dropdown.preview.web.ts" />

## Popover

Popover triggers work well when a grouped action needs lightweight supporting content instead of a menu. Same pattern: `group-trigger` on the trigger, no chevron icon.

<ComponentPreview src="./examples/button-group-popover.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Buttons, toolbars, and overlay triggers |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `exclusive` | Exclusive icon/text toggle styling — Craft `.btngroup--exclusive`. Use with `pk-toggle` items for view-mode pickers.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | Accessible label for the group —  `pk-button-group.label`.<br><small><strong>Type</strong> <code>string</code></small> |
| `orientation` | <small><strong>Type</strong> <code>PkButtonGroupOrientation</code></small><br><small><strong>Default</strong> <code>horizontal</code></small> |
| `separators` | Draw 1px dividers between adjacent controls (Craft default). Set `separators="false"` for flush join. Explicit `pk-button-group-separator` elements always work for segment splits.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Group container | `::part(base)` |

<!-- pk-api:end -->
