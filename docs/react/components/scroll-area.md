# Scroll Area

Scroll areas constrain overflowing content into a fixed region without losing access to the rest of the interface.

## Basic Usage

Use a standard scroll area when the content is modest in size but still needs a bounded viewport.

<ComponentPreview src="./examples/scroll-area-vertical.preview.tsx" />

## Long lists

Use a taller scroll area for longer lists that need to stay bounded inside the surrounding interface. This is a fixed viewport — it does not virtualize rows.

<ComponentPreview src="./examples/scroll-area-virtualized.preview.tsx" />

## Horizontal Scrolling

Horizontal orientation is useful for card rails, chips, or wide utility panels that should not wrap.

<ComponentPreview src="./examples/scroll-area-horizontal.preview.tsx" />
