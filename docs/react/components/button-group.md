# Button Group

Button groups keep related actions visually connected so compound controls read as one unit.

## Basic Usage

Use a button group when several adjacent actions belong to the same workflow. End a Craft-style toolbar with `groupTrigger` for the disclosure control — not a slotted chevron icon.

<ComponentPreview src="./examples/button-group-basic.preview.tsx" />

## Menu Trigger (`groupTrigger`)

A split toolbar is just labeled actions plus a disclosure end-cap. `groupTrigger` is the attribute on that end-cap (Craft `.menubtn`): narrow padding and a CSS chevron. Do not slot `chevron-down` — that keeps a full square hit target.

<ComponentPreview src="./examples/button-group-menu-trigger.preview.tsx" />

## Separators

Separators are **on by default** — a 1px divider between joined controls. Set `separators="false"` for a flush join.

<ComponentPreview src="./examples/button-group-separators.preview.tsx" />

## Split Actions

Split-button patterns keep the primary action obvious while still exposing closely related secondary options. The end-cap uses `groupTrigger`.

<ComponentPreview src="./examples/button-group-split-actions.preview.tsx" />

## Sizes

Button groups should scale cleanly with the shared button size system so they can fit toolbars and denser control areas.

<ComponentPreview src="./examples/button-group-sizes.preview.tsx" />

## Orientation

Vertical orientation keeps related actions grouped when horizontal space is limited or the controls need to read more like a menu.

<ComponentPreview src="./examples/button-group-orientation.preview.tsx" />

## Other Controls

Button groups can combine buttons with adjacent fields and overlays when the control should still read as one compact action bar.

<ComponentPreview src="./examples/button-group-other-controls.preview.tsx" />

## Dropdown

Dropdown triggers work well at the end of a group when the primary action remains visible but secondary actions need extra space. Use `groupTrigger` on the menu’s trigger button.

<ComponentPreview src="./examples/button-group-dropdown.preview.tsx" />

## Popover

Popover triggers work well when a grouped action needs lightweight supporting content instead of a menu. Same pattern: `groupTrigger` on the trigger, no chevron icon.

<ComponentPreview src="./examples/button-group-popover.preview.tsx" />
