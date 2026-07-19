# ModalTabsContent

Schema registry component **`ModalTabsContent`** — panel body for one tab inside **`ModalTabs`**.

## Basic Usage

Use `ModalTabsContent` to wrap the schema nodes that belong to one tab panel.

<ComponentPreview src="./examples/modal-tabs-basic.preview.tsx" />

## Role in SchemaForm

- `$cmp: 'ModalTabsContent'` wraps nested schema **`children`** in a single-column grid (`grid grid-cols-1 gap-4` in source).
- Pairs with **`ModalTabsTrigger`** by matching **`value`**.

## Children

Nested field and component nodes render through the same **`SchemaRenderer`** pipeline as the rest of the form.

## Registry

Ships with the default component registry; override sparingly so triggers/contents stay visually consistent.

## Related

- [ModalTabs](./modal-tabs.md)
