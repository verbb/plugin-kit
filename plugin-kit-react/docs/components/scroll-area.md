# ScrollArea

Scroll areas constrain overflowing content into a fixed region without losing access to the rest of the interface.

## Basic Usage

Use a standard scroll area when the content is modest in size but still needs a bounded viewport.

<ComponentPreview src="./examples/scroll-area-vertical.preview.tsx" />

## Virtualized Lists

Use the virtualized variant for longer lists where rendering every row at once would be wasteful.

<ComponentPreview src="./examples/scroll-area-virtualized.preview.tsx" />

## Horizontal Scrolling

Horizontal orientation is useful for card rails, chips, or wide utility panels that should not wrap.

<ComponentPreview src="./examples/scroll-area-horizontal.preview.tsx" />

## API reference

`ScrollArea` wraps [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area/). Use the Base UI API reference for viewport, scrollbar, thumb, corner, and orientation behavior.
