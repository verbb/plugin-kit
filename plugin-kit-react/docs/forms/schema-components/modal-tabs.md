# ModalTabs

`ModalTabs` is a **schema component** (`$cmp: 'ModalTabs'`) that wraps the kit’s `ModalTabs` UI primitives (`src/forms/components/ModalTabs.tsx`) and connects them to **schema form errors**.

## Basic Usage

Use `ModalTabs` when the schema needs tabbed sections that still participate in SchemaForm error handling.

<ComponentPreview src="./examples/modal-tabs-basic.preview.tsx" />

## Role

- Reads **`SchemaEngineContext`** to access `getErrorMapFields`.
- Walks **`schemaNode.children`** (tab panels) and computes which tabs contain fields with errors (via `hasSchemaErrorsCached` from `utils/schemaIndexCache`).
- Provides **`ModalTabsErrorsContext`** so triggers can show error state.

Export **`useModalTabsErrors`** for custom triggers if you replace subcomponents.

## Subcomponents

Use together in schema:

- `ModalTabs` — root; accepts schema-driven props merged from the node.
- `ModalTabsList`
- `ModalTabsTrigger` — `value` matches a tab panel’s `value`.
- `ModalTabsContent` — wraps children in a grid; `value` selects the active panel.

These map to registry keys **`ModalTabs`**, **`ModalTabsList`**, **`ModalTabsTrigger`**, **`ModalTabsContent`**.

## `usesSchemaNode`

Only the root **`ModalTabs`** wrapper sets **`usesSchemaNode: true`**, so the engine injects **`schemaNode`** for tab ↔ error mapping. List / trigger / content are plain functions exported through the registry without `usesSchemaNode`.

## Related

- [ModalTabsList](./modal-tabs-list.md) · [ModalTabsTrigger](./modal-tabs-trigger.md) · [ModalTabsContent](./modal-tabs-content.md)
