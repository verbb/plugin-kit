# ModalTabsTrigger

Schema registry component **`ModalTabsTrigger`** — an individual tab button in a modal tab strip.

## Basic Usage

Use `ModalTabsTrigger` inside `ModalTabsList` to switch between tab panels in schema.

<ComponentPreview src="./examples/modal-tabs-basic.preview.tsx" />

## Role in SchemaForm

- Resolved via `$cmp: 'ModalTabsTrigger'`.
- Consumes **`useModalTabsErrors`** (from `ModalTabs.tsx`) when present to reflect validation errors for fields inside the matching content panel.
- Forwards to the design-system `ModalTabsTrigger` component.

## Schema expectations

Provide a stable **`value`** prop (string) aligning with the corresponding **`ModalTabsContent`** `value`.

## Registry

Default registration in `registry.ts`; extend or override with `registerFormComponents`.

## Related

- [ModalTabs](./modal-tabs.md)
