# ModalTabsList

Schema registry component **`ModalTabsList`** — the tab strip container inside a **`ModalTabs`** schema subtree.

## Basic Usage

Use `ModalTabsList` inside `ModalTabs` to render the tab strip for the available panels.

<ComponentPreview src="./examples/modal-tabs-basic.preview.tsx" />

## Role in SchemaForm

Rendered when the schema contains `{ "$cmp": "ModalTabsList", ... }` as a child of **`ModalTabs`**. It forwards to `@verbb/plugin-kit-react/components` `ModalTabsList` with schema-appropriate styling.

## Usage

Author it **under** `ModalTabs` alongside `ModalTabsTrigger` and `ModalTabsContent` siblings so the tab list and panels share one modal tab state machine from the base component library.

## Registry

Registered by default in `src/forms/registry.ts`. Replace with `registerFormComponent('ModalTabsList', ...)` only if you need bespoke behavior.

## Related

- [ModalTabs](./modal-tabs.md)
