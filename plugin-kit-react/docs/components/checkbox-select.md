# CheckboxSelect

CheckboxSelect presents a compact multi-select checklist with optional 'all' behavior.

## All Option

The optional all item is useful when the setting supports both targeted selection and a shorthand for 'everything'.

<ComponentPreview src="./examples/checkbox-select-all-option.preview.tsx" />

## All Selected

Use the all value when every option should be treated as selected without storing each individual option.

<ComponentPreview src="./examples/checkbox-select-all-selected.preview.tsx" />

## Selected Values

Use a string array when the setting stores a concrete set of selected options.

<ComponentPreview src="./examples/checkbox-select-selected-values.preview.tsx" />

## Disabled States

Disabled examples are useful when the control is present for context but the selection is currently locked.

<ComponentPreview src="./examples/checkbox-select-disabled-states.preview.tsx" />

## Long Lists

Use clear spacing and wrapping when options are longer than a short label.

<ComponentPreview src="./examples/checkbox-select-long-list.preview.tsx" />

## API reference

`CheckboxSelect` uses this package's `CheckboxInput`, which composes `Checkbox` and wraps [Base UI Checkbox](https://base-ui.com/react/components/checkbox/). Use the Base UI API reference for checked, unchecked, indeterminate, disabled, and form behavior.
