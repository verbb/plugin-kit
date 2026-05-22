# Combobox

Comboboxes mix freeform search with constrained option selection.

## Input Mode

Input mode works well when the control should feel like a searchable text field with inline suggestions.

<ComponentPreview src="./examples/combobox-input-mode.preview.tsx" />

## Sizes

The combobox input and option list follow the same sizing rhythm as select so searchable controls can align with adjacent fields.

<ComponentPreview src="./examples/combobox-sizes.preview.tsx" />

## Widths

Combobox input controls use their content width by default. Add a width utility to the input when the control should be fixed-width or fill its parent.

<ComponentPreview src="./examples/combobox-widths.preview.tsx" />

## Popup Mode

Popup mode is a better fit when the trigger should behave more like a select than a text field.

<ComponentPreview src="./examples/combobox-popup-mode.preview.tsx" />

## Multiple Selection

Chips are useful when the chosen options need to remain visible after selection.

<ComponentPreview src="./examples/combobox-multiple.preview.tsx" />

## Grouped Options

Grouped content is useful when the option list should be organized into labeled collections.

<ComponentPreview src="./examples/combobox-grouped.preview.tsx" />

## Higher-Level Input API

`ComboboxInput` provides a field-style API for the common single and async loading cases.

<ComponentPreview src="./examples/combobox-high-level-input.preview.tsx" />

## API reference

`Combobox` wraps [Base UI Combobox](https://base-ui.com/react/components/combobox/). Use the Base UI API reference for lower-level primitive props, filtering behavior, popup positioning, and multiple-selection details.
