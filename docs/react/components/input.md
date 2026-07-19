# Input

Inputs collect short freeform text and should stay visually aligned with surrounding controls.

## Basic Usage

Use a placeholder for empty guidance and `value` when the control should open with an existing value.

<ComponentPreview src="./examples/input-basic.preview.tsx" />

## Sizes

The input size scale matches adjacent buttons, selects, and other field controls so dense CP layouts still line up cleanly.

<ComponentPreview src="./examples/input-sizes.preview.tsx" />

## Widths

Inputs are full-width by default. Constrain the parent for field layouts, or set an explicit width when the input needs to be fixed.

<ComponentPreview src="./examples/input-widths.preview.tsx" />

## Validation

Use `invalid` when the current value has failed validation so the field can surface its error state consistently.

<ComponentPreview src="./examples/input-validation.preview.tsx" />

## Disabled

Disable the field when it is present for context but not currently editable.

<ComponentPreview src="./examples/input-disabled.preview.tsx" />

## Adornments

Use `slot="start"` / `slot="end"` for icons or short units **inside** the field border. Prefer this for a single leading/trailing glyph (search, currency). Use [input groups](/web/components/input-group) when the adornment is a separate control (button, select) or multi-part addon.

```tsx
<Input placeholder="Search">
  <Icon slot="start" icon="search" />
</Input>
```

<ComponentPreview src="./examples/input-adornments.preview.tsx" />
