# Tabs

Tabs organize related content into compact sections without leaving the current view.

## Basic Usage

Use standard tabs for the most common inline section switching pattern.

<ComponentPreview src="./examples/tabs-basic.preview.web.ts" />

## Pane Tabs

Pane tabs are useful inside taller bounded regions where the tab list and content live together in the same panel.

<ComponentPreview src="./examples/tabs-pane.preview.web.ts" />

## Modal Tabs

Modal tabs adapt the same pattern to dialog layouts where the tab content needs a slightly different structure.

<ComponentPreview src="./examples/tabs-modal.preview.web.ts" />

## Sidebar Tabs

`variant="sidebar"` is the Craft-style vertical nav — group with `pk-tab-heading`, and optionally slot `icon` / `status` on each `pk-tab`.

<ComponentPreview src="./examples/tabs-sidebar.preview.web.ts" />

## Disabled and Overflow

Disabled tabs and scrollable tab lists — default, pane, and modal variants.

<ComponentPreview src="./examples/tabs-disabled-overflow.preview.web.ts" />

<!-- pk-api:begin -->

## API

### pk-tabs

#### Slots

| Name | Description |
| --- | --- |
| `nav` | `pk-tab` triggers and optional `pk-tab-heading` group labels |
| `(default)` | `pk-tab-panel` content panels |

#### Attributes & Properties

| Name | Description |
| --- | --- |
| `activation` | `manual` — arrow keys move focus only; Enter/Space activates (Base UI default). `auto` — arrow keys activate tabs immediately.<br><small><strong>Type</strong> <code>PkTabsActivation</code></small><br><small><strong>Default</strong> <code>manual</code></small> |
| `ariaLabel` `aria-label` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `orientation` | <small><strong>Type</strong> <code>PkTabsOrientation</code></small><br><small><strong>Default</strong> <code>horizontal</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkTabsPlacement</code></small><br><small><strong>Default</strong> <code>top</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |
| `variant` | Visual style — `default` (segmented), `pane`, `modal`, or `sidebar` (vertical nav).<br><small><strong>Type</strong> <code>PkTabsVariant</code></small><br><small><strong>Default</strong> <code>default</code></small> |

#### Events

| Name | Description |
| --- | --- |
| `pk-change` | Active tab changed. |
| `pk-tab-hide` | A tab panel became hidden. |
| `pk-tab-show` | A tab panel became visible. |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Root container | `::part(base)` |
| `list` | Tab list | `::part(list)` |

### pk-tab

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Tab label |
| `icon` | Optional leading content (icon, logo, etc.) |
| `status` | Optional trailing content (status dot, badge, etc.) |

#### Attributes & Properties

| Name | Description |
| --- | --- |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `focusIndex` `focus-index` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>-1</code></small> |
| `panelId` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `selected` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |

#### Methods

| Name | Description |
| --- | --- |
| `focusControl()` | — |

#### Events

| Name | Description |
| --- | --- |
| `pk-tab-keydown` | — |
| `pk-tab-select` | — |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `icon` | Icon slot wrapper (hidden when empty) | `::part(icon)` |
| `label` | Label slot wrapper | `::part(label)` |
| `status` | Status slot wrapper (hidden when empty) | `::part(status)` |
| `trigger` | Tab button | `::part(trigger)` |

### pk-tab-heading

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Heading text |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `heading` | Heading container | `::part(heading)` |

### pk-tab-panel

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Panel content |

#### Attributes & Properties

| Name | Description |
| --- | --- |
| `hidden` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `tabId` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `content` | Panel container | `::part(content)` |

<!-- pk-api:end -->
