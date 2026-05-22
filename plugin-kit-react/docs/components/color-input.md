# ColorInput

Color inputs combine a swatch with a text field so users can both pick and inspect a color value.

## Basic Usage

A color input should make the current color visible while still exposing the editable text value.

<ComponentPreview src="./examples/color-input-basic.preview.tsx" />

## Resolved Values

Different input shapes are useful to show because users will often paste shorthand values while the control resolves and normalizes them.

<ComponentPreview src="./examples/color-input-resolved.preview.tsx" />

## Sizes

The color input should scale cleanly across the shared size system.

<ComponentPreview src="./examples/color-input-sizes.preview.tsx" />

## States

Show invalid and disabled states when the color value participates in form validation.

<ComponentPreview src="./examples/color-input-states.preview.tsx" />

## API reference

`ColorInput` uses this package's `Input`, which wraps [Base UI Input](https://base-ui.com/react/components/input/). Use the Base UI API reference for inherited input behavior and accessibility details.
