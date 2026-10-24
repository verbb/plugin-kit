# Data Table

DataTable combines record browsing, an extensible toolbar and a pagination footer. Its behaviour lives in the canonical web component, shared by all framework adapters.

## Custom Cells

Use a scoped `cell-columnId` slot to render a column with Vue content. The slot receives `row`, `column`, `value` and `rowKey`. Listen to `@pk-query-change`, `@pk-view-change`, `@pk-selection-change` and `@pk-row-action` for native custom events; payloads live in `event.detail`.

<ComponentPreview src="./examples/data-table.preview.vue.ts" />

The email column uses the built-in `link` type with a `mailto:` destination. See [all column types](/web/components/data-table#columns-and-custom-cells) for live examples of text, web/email links, status indicators, numbers, currencies, percentages, dates and custom content. The built-in column definitions work the same way in every framework.

## Handles and Row Actions

Use `type: 'handle'` for a copyable monospace identifier. Pass `rowActions` returning `DataTableAction[]`; `{ id: 'edit', preset: 'edit' }`, `{ id: 'move', preset: 'move' }` and `{ id: 'delete', preset: 'delete' }` render the shared inline icon buttons. Override `label` or `disabled` per record and set `rowLabel` for readable accessible names. Custom actions with `id` and `label` use the overflow menu; `display: 'menu'` moves a preset there, and `display: 'inline'` renders a custom text button.

Listen to `@pk-row-action` for `{ action, row, rowKey }` in `event.detail`. Consumers own navigation, confirmation and mutations. Move emits an action; it does not enable drag reordering or change sorting. See [row actions](/web/components/data-table#selection-and-actions) for the full configuration. `DataTableAction` and `DataTableActionPreset` are exported by the adapter.

The example reports edit, delete and review requests below the table. It uses compact plain icon buttons and an SVG overflow control, with accessible names and no native title tooltips. It omits move because column sorting is enabled; use the working manual-order example below for drag and keyboard reordering.

## Manual Row Ordering

Enable `manual-order` to add drag handles and disable column sorting. Focus a handle and use Up/Down or Home/End to move it within the current page. The canonical component keeps selection and custom cells intact and announces the new position. Search, filters and consumer criteria disable moves until cleared.

<ComponentPreview src="./examples/data-table-order.preview.vue.ts" />

Listen to `@pk-row-reorder` and mirror `event.detail.rows` into your state. Set `reorderDisabled` while saving; restore `event.detail.previousRows` if a local save fails. The event also includes the moved `rowKey`, page-relative indexes, new and previous page key sequences, and a query snapshot. In remote mode the rows and keys cover only the displayed page. Consumers own endpoints, concurrency checks and rollback; tables with a `dataSource` can call `refresh()` to reload the current page after a failed save. See [manual ordering](/web/components/data-table#manual-row-ordering) for the full scope and event contract. `DataTableRowReorderDetail` is an exported type.

## View, Selection and Export

Selection is off by default, as shown above. Enable `selectable` when rows need bulk actions. Plain row clicks select one record, Cmd/Ctrl-click toggles records, and Shift-click selects a range on the current page. Links and cell controls retain their own actions. The count and `selection-actions` slot occupy a reserved footer region, keeping the table stationary as selection changes. The shared **View** popup provides sorting, toggleable columns and pointer/keyboard reordering. `defaultView` and `defaultSort` control **Use defaults**. A sortable table starts with `query.sort`, then falls back to `defaultSort` or its first sortable column ascending. Clicking the active header toggles direction; clicking another selects that column ascending. Set `query.pageSize` for page length; the footer has compact paging controls and a result count.

Supply `exportFormats` with `{ value, label, disabled? }` options to show the footer’s **Export** menu. Listen to `@pk-export` for `{ format, query, view, columnIds, selectedKeys }` in `event.detail`. The plugin handles the export; Kit supplies a detached state snapshot. Set `exporting` while the request runs. `DataTableExportDetail` and `DataTableExportFormat` are exported types.

## Remembering View Preferences

`persistDataTableView()` is re-exported by this package and uses the canonical web helper. Pass the underlying `pk-data-table` element, a stable `key` and the current `userId`; it remembers columns and sorting without saving search, filters or pagination. Set `restoreSort: false` when the URL supplies an explicit sort. **Use defaults** clears the remembered view.

Attach the helper after assigning columns, defaults and the initial query, before assigning a remote `dataSource`. Disconnect it when the table unmounts or its account/key changes. If query/view are controlled by framework state, copy the restored element state into that state and keep it aligned with subsequent events. See [the API and live persistence example](/web/components/data-table#remembering-view-preferences).

## Index Layout and Keyboard Selection

Use `layout="index"` inside a scrolling container to keep the toolbar, pagination footer and horizontal scrollbar in reach. The default embedded layout stays in normal document flow. Give the scrolling container 2px of padding so the table frame’s outer border stays visible. Set `--pk-data-table-header-offset` or `--pk-data-table-footer-offset` when surrounding controls occupy the scrollport edges; `--pk-data-table-toolbar-background` sets the sticky toolbar background. Set `rowLabel` to a property name or formatter for readable selection-checkbox labels. From a row checkbox, Up/Down and Home/End move focus, Shift extends a range, Cmd/Ctrl+A selects the eligible records on the current page, and Escape clears selection. Cell links and controls retain their own keyboard behavior.

<ComponentPreview src="./examples/data-table-index.preview.vue.ts" />

The density buttons use `toolbar-controls`, which sits after search/filtering and before **View**. Use `toolbar-start` for a leading status/source selector and `toolbar-end` for trailing actions. Use `<template #toolbar-controls>` to supply the controls. These slots stay available when search or View is hidden; `hideToolbar` hides them with the toolbar. Consumers own the controls’ state and actions.

## Long Content and Overflow

Text and custom cells wrap within Craft-style bounded columns. Built-in links truncate with an ellipsis; use `wrap: true` to wrap their labels instead. Dates, numbers and statuses stay on one line. Use `wrap: false` to keep a text value intact. Wide tables scroll within their own region, and `layout="index"` keeps a synchronized horizontal scrollbar above the sticky footer. See the [overflow example](../../web/components/data-table.md#long-content-and-overflow) to compare these treatments.

## Filter Builder

Define `filters` to show the funnel button inside search. The shared builder supports text, single/multiple choice, boolean, number and date conditions. It opens beneath search on wide tables and as a centered dialog on narrow tables. Add or remove conditions, choose comparison operators and use **Apply** to update results. **Cancel** or Escape discards edits; **Clear filters** clears the draft before applying. All conditions must match.

<ComponentPreview src="./examples/data-table-filters.preview.vue.ts" />

The example defines all six filter types. See [filter definitions and comparisons](/web/components/data-table#filter-types-and-comparisons) for their configuration. `query.filters` contains values and optional `query.filterOperators` contains non-default comparisons. Remote endpoints receive both maps. Restrict a definition's comparisons with `operators`. `DataTableFilterOperator` is an exported type. The `filters` slot remains consumer-owned and is not included in the built-in draft.

## Queries, Filters and Remote Data

Supply `rows` and `columns` for a bounded local dataset, or set `mode="remote"` with a `dataSource` function. The loader receives the query and an abort signal and returns rows plus pagination metadata. The facade supports the same query, filters, view, selection and loader properties as the web component. Use property bindings in templates, including `rowKey`, `exportFormats`, `dataSource`, `selectedKeys` and `columnControls`.

For externally managed fetching, omit `dataSource`, handle the query event, and supply the current page, loading state and total or next-page metadata. Clear `loading` when the matching request completes. Avoid fetching in both the loader and a query-event listener.

See the [canonical Data Table guide](/web/components/data-table) for complete live examples, column types, filter definitions, cursor pagination, state ownership, localisation and accessibility. `toolbar-start`, `toolbar-controls`, `toolbar-end`, `filters`, `selection-actions`, `empty` and `footer` slots provide the same extension points in every adapter.

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `toolbar-start` | Controls before search. |
| `toolbar-controls` | Additional controls after search/filter controls and before View. |
| `toolbar-end` | Product actions after the standard controls. |
| `filters` | Consumer-owned criteria controls inside the filter builder; consumers own their state and application. |
| `selection-actions` | Footer actions for the explicitly selected record IDs; space stays reserved when empty. |
| `footer` | Additional footer information. |
| `empty` | Replacement for the empty/no-match state. |

### Props

| Name | Description |
| --- | --- |
| `columnControls` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `columns` | Ordered column definitions and rendering capabilities.<br><small><strong>Type</strong> <code>DataTableColumn[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `dataSource` | Optional remote loader. Omit when the consuming application owns fetching.<br><small><strong>Type</strong> <code>DataTableDataSource \| undefined</code></small> |
| `defaultSort` | Initial/reset sort when query.sort is empty; defaults to the first sortable column ascending.<br><small><strong>Type</strong> <code>DataTableSort[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `defaultView` | Preferences restored by Use defaults.<br><small><strong>Type</strong> <code>DataTableView</code></small><br><small><strong>Default</strong> <code>{ hiddenColumns: [], columnOrder: [], }</code></small> |
| `error` | Safe user-facing error text, not a raw exception.<br><small><strong>Type</strong> <code>string</code></small> |
| `exportFormats` | Optional export choices. The consumer handles pk-export; no files are generated.<br><small><strong>Type</strong> <code>DataTableExportFormat[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `exporting` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `filters` | Filter controls and local matching rules.<br><small><strong>Type</strong> <code>DataTableFilter[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `hasNext` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `hideFooter` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `hideToolbar` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isRowSelectable` | Return false to exclude a record from selection.<br><small><strong>Type</strong> <code>(         row: DataTableRow,     ) =&gt; boolean \| undefined</code></small> |
| `label` | Accessible name for the table and its scroll region.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Records</code></small> |
| `labels` | Override any UI string; interpolation uses {id}, {label}, {count}, {start}, {end}, {total}.<br><small><strong>Type</strong> <code>Partial&lt;DataTableLabels&gt;</code></small><br><small><strong>Default</strong> <code>{}</code></small> |
| `layout` | Embedded tables flow with their content; index tables keep footer controls and horizontal scrolling in reach.<br><small><strong>Type</strong> <code>'embedded' \| 'index'</code></small><br><small><strong>Default</strong> <code>embedded</code></small> |
| `loading` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `locale` | <small><strong>Type</strong> <code>string</code></small> |
| `manualOrder` | Display rows in supplied order, with page-scoped pointer/keyboard reordering and no column sorting.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `mode` | Client mode processes all supplied rows. Remote mode never filters/sorts a partial page.<br><small><strong>Type</strong> <code>'client' \| 'remote'</code></small><br><small><strong>Default</strong> <code>client</code></small> |
| `nextCursor` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `pagination` | <small><strong>Type</strong> <code>'offset' \| 'cursor'</code></small><br><small><strong>Default</strong> <code>offset</code></small> |
| `previousCursor` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `query` | Search, sort, criteria and pagination state.<br><small><strong>Type</strong> <code>DataTableQuery</code></small> |
| `reorderDisabled` | Disable row moves while saving or unavailable. Handles stay focusable so pending saves retain keyboard focus.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `rowActions` | Available product actions for each record; presets default to inline icon buttons.<br><small><strong>Type</strong> <code>(         row: DataTableRow,     ) =&gt; DataTableAction[] \| undefined</code></small> |
| `rowKey` | A property name or function returning a unique, stable record ID.<br><small><strong>Type</strong> <code>string \| ((row: DataTableRow) =&gt; DataTableKey)</code></small><br><small><strong>Default</strong> <code>id</code></small> |
| `rowLabel` | Optional property name or formatter for accessible row-selection labels. Defaults to the row key.<br><small><strong>Type</strong> <code>string \| ((row: DataTableRow) =&gt; string) \| undefined</code></small> |
| `rows` | The complete local dataset, or one externally fetched remote page.<br><small><strong>Type</strong> <code>DataTableRow[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `searchable` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `searchDelay` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>250</code></small> |
| `selectable` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `selectedKeys` | Explicit selected record IDs, retained across pages.<br><small><strong>Type</strong> <code>DataTableKey[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `showFilters` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>'default' \| 'compact'</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `timeZone` | <small><strong>Type</strong> <code>string</code></small> |
| `total` | <small><strong>Type</strong> <code>number \| undefined</code></small> |
| `view` | Column visibility and ordering preferences.<br><small><strong>Type</strong> <code>DataTableView</code></small><br><small><strong>Default</strong> <code>{ hiddenColumns: [], columnOrder: [], }</code></small> |

### Events

| Name | Description |
| --- | --- |
| `@name` | — |
| `@pk-export` | Detail: { format, query, view, columnIds, selectedKeys }. Consumer handles the export. |
| `@pk-load` | Detail: { result, query }. A current data-source response was accepted. |
| `@pk-load-error` | Detail: { error }. The current request failed. |
| `@pk-query-change` | Detail: { query }. Search, sort, criteria or page changed. |
| `@pk-retry` | A retry was requested in externally controlled remote mode. |
| `@pk-row-action` | Detail: { action, row, rowKey }. Product action requested. |
| `@pk-row-reorder` | Detail: DataTableRowReorderDetail. Current-page order changed; the consumer saves it. |
| `@pk-selection-change` | Detail: { selectedKeys }. Explicit record IDs changed. |
| `@pk-view-change` | Detail: { view }. Column visibility/order changed. |

### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-data-table-cell-color` | Inherited cell foreground, including selected state. |
| `--pk-data-table-cell-muted-color` | Secondary cell text, including selected state. |
| `--pk-data-table-cell-padding` | Cell spacing. |
| `--pk-data-table-footer-offset` | Sticky footer inset from the scroll container bottom. |
| `--pk-data-table-header-offset` | Sticky header inset from the scroll container top. |
| `--pk-data-table-selected-background` | Selected row background. |
| `--pk-data-table-selected-color` | Selected row foreground. |
| `--pk-data-table-toolbar-background` | Background behind the sticky toolbar. |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `cell` | Data cell. | `::part(cell)` |
| `filter-builder` | Filter condition editor. | `::part(filter-builder)` |
| `filter-footer` | Apply, cancel and clear controls. | `::part(filter-footer)` |
| `filter-rule` | Individual filter condition row. | `::part(filter-rule)` |
| `footer` | Count, selection actions and pagination region. | `::part(footer)` |
| `footer-shell` | Sticky container in index layout. | `::part(footer-shell)` |
| `handle` | Copyable monospaced handle pill. | `::part(handle)` |
| `header-shell` | Sticky toolbar in index layout. | `::part(header-shell)` |
| `row-actions` | Inline row actions and optional overflow menu. | `::part(row-actions)` |
| `row-handle` | Pointer and keyboard row-reorder button in manual-order mode. | `::part(row-handle)` |
| `scroll` | Contained horizontal scroll region. | `::part(scroll)` |
| `scrollbar` | Synchronized horizontal scrollbar in index layout. | `::part(scrollbar)` |
| `selection` | Reserved footer selection count and actions. | `::part(selection)` |
| `table` | Semantic table. | `::part(table)` |
| `toolbar` | Toolbar container. | `::part(toolbar)` |

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-button` | — |
| `pk-button-group` | — |
| `pk-checkbox` | — |
| `pk-copy-button` | — |
| `pk-dialog` | — |
| `pk-dropdown-item` | — |
| `pk-dropdown-menu` | — |
| `pk-input` | — |
| `pk-option` | — |
| `pk-popover` | — |
| `pk-select` | — |
| `pk-spinner` | — |
| `pk-state-panel` | — |
| `pk-status-label` | — |

<!-- pk-api:end -->
