# Separator

Separators divide related content into smaller visual groups without introducing heavy borders or boxes. They can be used horizontally between sections or vertically between inline items.

## Horizontal Separators

Horizontal separators are the most common pattern for splitting stacked content.

<ComponentPreview src="./examples/separator-horizontal.preview.tsx" />

## Vertical Separators

Vertical separators help divide inline controls or short metadata groups.

<ComponentPreview src="./examples/separator-vertical.preview.tsx" />

<!-- pk-api:begin -->

## API

### Props

| Name | Description |
| --- | --- |
| `orientation` | <small><strong>Type</strong> <code>PkSeparatorOrientation</code></small><br><small><strong>Default</strong> <code>horizontal</code></small> |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Painted rule (inner line) | `::part(base)` |

<!-- pk-api:end -->
