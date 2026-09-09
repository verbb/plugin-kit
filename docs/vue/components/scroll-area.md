# Scroll Area

Scroll areas constrain overflowing content into a fixed region without losing access to the rest of the interface.

## Basic Usage

Use a standard scroll area when the content is modest in size but still needs a bounded viewport.

<ComponentPreview src="./examples/scroll-area-vertical.preview.vue.ts" />

## Long Lists

Use a taller scroll area for longer lists that need to stay bounded inside the surrounding interface.

<ComponentPreview src="./examples/scroll-area-virtualized.preview.vue.ts" />

## Horizontal Scrolling

Horizontal orientation is useful for card rails, chips, or wide utility panels that should not wrap.

<ComponentPreview src="./examples/scroll-area-horizontal.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Scrollable content |

### Props

| Name | Description |
| --- | --- |
| `content` | Readonly reference to the internal scroll container.<br><small><strong>Type</strong> <code>HTMLDivElement</code></small> |
| `orientation` | <small><strong>Type</strong> <code>PkScrollAreaOrientation</code></small><br><small><strong>Default</strong> <code>vertical</code></small> |
| `size` | <small><strong>Type</strong> <code>PkScrollAreaSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `withoutScrollbar` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withoutShadow` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### Events

| Name | Description |
| --- | --- |
| `@pk-scroll` | Emitted when the viewport scrolls. |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Root container | `::part(base)` |
| `content` | Scrollable content wrapper | `::part(content)` |
| `end-shadow` | Trailing edge shadow | `::part(end-shadow)` |
| `scrollbar` | Custom scrollbar track | `::part(scrollbar)` |
| `start-shadow` | Leading edge shadow | `::part(start-shadow)` |
| `thumb` | Custom scrollbar thumb | `::part(thumb)` |
| `viewport` | Scroll viewport (alias for content) | `::part(viewport)` |

<!-- pk-api:end -->
