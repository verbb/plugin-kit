# Dropdown Menu

Dropdown menus reveal secondary actions, settings, and grouped choices without permanently occupying layout space.

## Basic Usage

Use a simple trigger and a short action list for the most common menu pattern.

<ComponentPreview src="./examples/dropdown-menu-basic.preview.web.ts" />

## Grouped Options

Labels, separators, check items, radio items, and shortcuts help organize denser menu content without losing scanability.

<ComponentPreview src="./examples/dropdown-menu-grouped.preview.web.ts" />

## Different Triggers

Menus often sit behind different trigger styles depending on whether the action is primary, contextual, or account-related.

<ComponentPreview src="./examples/dropdown-menu-triggers.preview.web.ts" />

## Submenus

Submenus are useful for deeper action trees, but they should stay narrow and clearly grouped.

<ComponentPreview src="./examples/dropdown-menu-submenus.preview.web.ts" />

## Selection Items

Use checkbox and radio items for menu options that change persistent view or sorting state.

<ComponentPreview src="./examples/dropdown-menu-selection.preview.web.ts" />

## Item Icons

Leading icons go in the item’s `prefix` slot (or `start`).

<ComponentPreview src="./examples/dropdown-menu-icons.preview.web.ts" />

## Sizes

`size` on `pk-dropdown-menu` scales items, labels, and icons together.

<ComponentPreview src="./examples/dropdown-menu-sizes.preview.web.ts" />

## Slotted labels and host metrics

Item labels live in light DOM (default slot). They inherit type metrics from the `pk-dropdown-item` **`:host`** — not from the shadow `.item` row, and not from the menu host or page. Size tokens set `--pk-dropdown-item-font-size` / `--pk-dropdown-item-line-height` on the item host so Craft CP (tight body line-height) and Tailwind-scoped hosts get the same row rhythm without consumer CSS.

Do **not** put `font-size` / `line-height` on `pk-dropdown-menu` (or a wrapper) expecting item labels to pick them up for layout — ancestor noise can crush rows until the kit `:host` pin is present. After that pin, consumers should remove temporary menu-host type overrides.

Stress this in the workshop playground at `/tools/slotted-host`: Craft vs Tailwind hosts, ellipsis + icon menus, a text-trigger type picker, an ancestor `line-height: normal` case, selects, overlay mode, and Measure popups.

<!-- pk-api:begin -->

## API

### pk-dropdown-menu

#### Slots

| Name | Description |
| --- | --- |
| `trigger` | Menu trigger (when not using `for`) |
| `(default)` | `pk-dropdown-item` elements |

#### Attributes & Properties

| Name | Description |
| --- | --- |
| `distance` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `for` | External trigger id — preferred over `slot="trigger"` when set (TipTap toolbar).<br><small><strong>Type</strong> <code>string</code></small> |
| `open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom-start</code></small> |
| `sideOffset` `side-offset` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `size` | <small><strong>Type</strong> <code>PkDropdownMenuSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `skidding` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |

#### Events

| Name | Description |
| --- | --- |
| `pk-open-change` | — |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `panel` | Menu panel | `::part(panel)` |

#### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-popup` | — |

### pk-dropdown-item

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Item label |
| `start` | Leading icon (preferred; matches pk-button) |
| `prefix` | Alias for `start` (legacy) |
| `details` | Trailing shortcut text |
| `submenu` | Nested menu items (`pk-dropdown-item`, separators, labels) |

#### Attributes & Properties

| Name | Description |
| --- | --- |
| `active` | Roving highlight index for keyboard nav (`active`). Visual chrome uses `:focus-visible` / hover — not this flag — so mouse-open does not paint the first item selected (initial open).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `checked` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `destructive` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `radioGroup` `radio-group` | <small><strong>Type</strong> <code>string</code></small> |
| `submenuOpen` `submenu-open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `type` | <small><strong>Type</strong> <code>PkDropdownItemType</code></small><br><small><strong>Default</strong> <code>normal</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |

#### Methods

| Name | Description |
| --- | --- |
| `focusControl()` | — |

#### Events

| Name | Description |
| --- | --- |
| `pk-submenu-open` | — |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `item` | Menu item button | `::part(item)` |
| `prefix` | Leading icon wrapper (hidden when empty) | `::part(prefix)` |

### pk-dropdown-label

_No public API metadata found in the custom elements manifest._

### pk-dropdown-separator

_No public API metadata found in the custom elements manifest._

<!-- pk-api:end -->
