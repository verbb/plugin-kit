# Image Browser

Presentational picker for **static** icons and images supplied by the host — filesystem catalogs, icon sets, preview folders. Plugin Kit does not scan disks or filter file types; assign `items` or `groups` with already-resolved preview URLs or inline SVG.

`label` is display text (a curated name or a filename). `value` is what gets stored. Use this instead of Craft asset pickers when the value must travel with Project Config across environments.

Grid name visibility is controlled by `label-mode` / `labelMode`: `tooltip` (default — shared hover tip), `inline` (caption under each cell), or `none` (`aria-label` only).

## Icon Mode

Default icon catalog — compact glyphs with `label-mode="tooltip"`.

<ComponentPreview src="./examples/image-browser-icons.preview.vue.ts" />

## Icon Inline Labels

Captions under each glyph (`label-mode="inline"`).

<ComponentPreview src="./examples/image-browser-icons-inline.preview.vue.ts" />

## Icon No Labels

Names stay on `aria-label` only (`label-mode="none"`).

<ComponentPreview src="./examples/image-browser-icons-none.preview.vue.ts" />

## Image Mode

Default image catalog — larger photo tiles with `label-mode="tooltip"`.

<ComponentPreview src="./examples/image-browser-images.preview.vue.ts" />

## Image Inline Labels

Captions under each photo (`label-mode="inline"`).

<ComponentPreview src="./examples/image-browser-images-inline.preview.vue.ts" />

## Image No Labels

Names stay on `aria-label` only (`label-mode="none"`).

<ComponentPreview src="./examples/image-browser-images-none.preview.vue.ts" />

## Grouped Icons

Named groups, search, and scroll paging when a set is large. Use `groups` instead of a flat `items` list.

<ComponentPreview src="./examples/image-browser-groups.preview.vue.ts" />

## Grouped Images

Same `groups` API with `mode="image"` — headings sit above photo tiles.

<ComponentPreview src="./examples/image-browser-groups-images.preview.vue.ts" />

## Loading

Host-driven catalog warm. Set `loading` until `items` / `groups` arrive — the open panel shows a centered spinner (no loading copy). Pair with `selected-label` / `selected-preview` so the closed trigger still reflects a stored value before the catalog is ready.

<ComponentPreview src="./examples/image-browser-loading.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Props

| Name | Description |
| --- | --- |
| `ariaLabel` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` | <small><strong>Type</strong> <code>string</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `emptyMessage` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>No items match your query.</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `labelMode` | How option names appear in the grid: `tooltip` (default), `inline` under each cell, or `none` (`aria-label` only).<br><small><strong>Type</strong> <code>PkImageBrowserLabelMode</code></small><br><small><strong>Default</strong> <code>tooltip</code></small> |
| `loading` | Host-driven catalog warm / refresh. Shows a centered `pk-spinner` in the panel (no loading copy). Prefer this over inferring from empty `items` / `groups` — empty can also mean a filter miss or a genuinely empty catalog.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `mode` | `icon` = compact glyph tiles; `image` = larger photo tiles.<br><small><strong>Type</strong> <code>PkImageBrowserMode</code></small><br><small><strong>Default</strong> <code>icon</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `pageSize` | Items drawn per group before scroll reveals the next page.<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>96</code></small> |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Choose…</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom-start</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `readOnly` | Alias for `readonly`. |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `searchPlaceholder` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Search…</code></small> |
| `selectedLabel` | Closed-trigger label when `value` is set but not yet found in `items` / `groups` (e.g. catalog still loading).<br><small><strong>Type</strong> <code>string</code></small> |
| `selectedPreview` | Closed-trigger preview for the same pre-catalog case as `selected-label`.<br><small><strong>Type</strong> <code>string</code></small> |
| `sideOffset` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `size` | <small><strong>Type</strong> <code>PkImageBrowserSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |
| `width` | <small><strong>Type</strong> <code>PkImageBrowserWidth</code></small><br><small><strong>Default</strong> <code>auto</code></small> |
| `withClear` | Show a clear control when a value is selected.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `checkValidity()` | Runs constraint validation without showing the browser UI. |
| `hide(source: PkOverlaySource)` | — |
| `reportValidity()` | Runs constraint validation and shows the browser UI when invalid. |
| `resetValidity()` | Clears custom errors and re-syncs validity state. |
| `setCustomValidity(message: string)` | Sets or clears a custom validation message. |
| `show()` | — |

### Events

| Name | Description |
| --- | --- |
| `@change` | — |
| `@input` | — |
| `@pk-change` | — |

### Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `disabled` | The control is disabled. | `:state(disabled)` |
| `invalid` | The control currently fails constraint validation. | `:state(invalid)` |
| `optional` | The control is not required. | `:state(optional)` |
| `required` | The control is required. | `:state(required)` |
| `user-invalid` | Invalid after the user has interacted with the control. | `:state(user-invalid)` |
| `user-valid` | Valid after the user has interacted with the control. | `:state(user-valid)` |
| `valid` | The control currently passes constraint validation. | `:state(valid)` |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `clear-button` | Clear selection button (inside the control) | `::part(clear-button)` |
| `loading` | Catalog-loading status region (spinner) | `::part(loading)` |
| `option` | Grid cell button | `::part(option)` |
| `panel` | Popup panel shell | `::part(panel)` |
| `panel-body` | Scrollable results region | `::part(panel-body)` |
| `panel-input` | Search input | `::part(panel-input)` |
| `panel-search` | Search field container | `::part(panel-search)` |
| `root` | Filled control chrome (trigger + clear + chevron) | `::part(root)` |
| `trigger` | Opens the panel (preview + label) | `::part(trigger)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-popup` | Positioned panel host. |
| `pk-spinner` | Shown in the panel while `loading` is set. |
| `pk-tooltip` | Hover label when `label-mode="tooltip"`. |

<!-- pk-api:end -->
