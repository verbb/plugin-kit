# Select

Selects expose a constrained list of options while keeping the closed trigger aligned with surrounding field controls.

## Basic Usage

Use a trigger plus content list for the common closed-select pattern.

<ComponentPreview src="./examples/select-basic.preview.web.ts" />

## Sizes

The select trigger follows the same sizing rhythm as other form controls so it can sit cleanly beside inputs, buttons, and other CP fields.

<ComponentPreview src="./examples/select-sizes.preview.web.ts" />

## Widths

Select triggers use their content width by default. Add a width utility to the trigger when the control should be fixed-width or fill its parent.

<ComponentPreview src="./examples/select-widths.preview.web.ts" />

## Grouped Options

Labels and separators help when a single list includes more than one logical option set.

<ComponentPreview src="./examples/select-grouped.preview.web.ts" />

## Decorations

Host `start` / `end` slots decorate the closed trigger (icons, status dots, and similar).

<ComponentPreview src="./examples/select-decorations.preview.web.ts" />

## Status Options

Put `pk-status` in an option’s `start` slot when the list represents Craft-like statuses.

<ComponentPreview src="./examples/select-status-input.preview.web.ts" />
