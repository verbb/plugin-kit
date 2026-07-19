# Field

`Field` is Craft-style field layout around a control — label, instructions, errors, warnings, tips, and optional header actions.

## Standalone Labels

Control-level `label` and `instructions` can live on `Input` (and similar controls) without wrapping in `Field`.

<ComponentPreview src="./examples/field-standalone-labels.preview.vue.ts" />

## Errors and Warnings

Use `required`, `warning`, and the `errors` slot around an invalid control. Tip and instruction values can include inline Markdown.

<ComponentPreview src="./examples/field-errors-and-warnings.preview.vue.ts" />

## Translatable

`translatable` shows the translation icon beside the field label.

<ComponentPreview src="./examples/field-translatable.preview.vue.ts" />

## Tip

`tip` renders helper text below the control.

<ComponentPreview src="./examples/field-tip.preview.vue.ts" />

## Header End

Trailing header actions go in `slot="header-end"` — for example a small “Bulk add” button.

<ComponentPreview src="./examples/field-header-end.preview.vue.ts" />
