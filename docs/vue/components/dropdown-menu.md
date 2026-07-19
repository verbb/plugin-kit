# Dropdown Menu

Dropdown menus reveal secondary actions, settings, and grouped choices without permanently occupying layout space.

## Basic Usage

Use a simple trigger and a short action list for the most common menu pattern.

<ComponentPreview src="./examples/dropdown-menu-basic.preview.vue.ts" />

## Grouped Options

Labels, separators, check items, radio items, and shortcuts help organize denser menu content without losing scanability.

<ComponentPreview src="./examples/dropdown-menu-grouped.preview.vue.ts" />

## Different Triggers

Menus often sit behind different trigger styles depending on whether the action is primary, contextual, or account-related.

<ComponentPreview src="./examples/dropdown-menu-triggers.preview.vue.ts" />

## Submenus

Submenus are useful for deeper action trees, but they should stay narrow and clearly grouped.

<ComponentPreview src="./examples/dropdown-menu-submenus.preview.vue.ts" />

## Selection Items

Use checkbox and radio items for menu options that change persistent view or sorting state.

<ComponentPreview src="./examples/dropdown-menu-selection.preview.vue.ts" />

## Item Icons

Leading icons go in the item’s `prefix` slot (or `start`).

<ComponentPreview src="./examples/dropdown-menu-icons.preview.vue.ts" />

## Sizes

`size` on `DropdownMenu` scales items, labels, and icons together.

<ComponentPreview src="./examples/dropdown-menu-sizes.preview.vue.ts" />
