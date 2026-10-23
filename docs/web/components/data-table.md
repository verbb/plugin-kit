# Data Table

DataTable combines a toolbar, a table of records and a pagination footer. Use it for model records, activity lists and report results that need consistent browsing controls. Use Craft’s element index for ordinary element listings and [Editable Table](/web/components/editable-table) for values being authored in rows.

## Browsing Records

Supply rows with stable IDs and column definitions. The default client mode searches, sorts, filters and pages the complete supplied dataset.

### Sorting

Sorting is opt-in per column:

- Click the active sortable heading to toggle ascending and descending.
- Click another sortable heading to sort that column ascending.
- Tables without sortable columns retain their supplied order.

A table with sortable columns always has an active sort. Supply `query.sort`, set `defaultSort`, or let the table use its first sortable column ascending. The same resolved sort is sent to remote loaders and query listeners. Passing an empty sort to `setQuery()` restores the default; it does not introduce an unsorted state.

### View and Columns

The **View** popup combines the sort field, direction and column preferences:

- **Reorder:** drag a column handle to preview its new position, then release to apply the order. Press Escape to cancel, or focus the handle and press Up/Down to reorder with the keyboard.
- **Show or hide:** toggle columns without changing the underlying rows. `hideable: false` keeps required columns visible; at least one column always remains visible.
- **Reset:** **Use defaults** restores `defaultView` and `defaultSort`. Unless supplied, these defaults show all columns in definition order and sort the first sortable column ascending.

<ComponentPreview src="./examples/data-table-records.preview.web.ts" />

```js
import '@verbb/plugin-kit-web/components/data-table.js';

const table = document.querySelector('pk-data-table');
table.label = 'Requests';
table.columns = [
    { id: 'name', label: 'Participant', sortable: true, hideable: false },
    { id: 'status', label: 'Status', type: 'status' },
];
table.rows = [
    { id: 1, name: 'Alex Morgan', status: 'pending' },
    { id: 2, name: 'Jamie Ellis', status: 'active' },
];
```

Set `rowKey` to another property name or a function when IDs are stored differently. Keys must be unique and stable strings or numbers; never use a page-relative array index. Assign new arrays/objects when changing rows, columns or query state.

## Tables without Selection

Selection is off by default. These product and activity examples have no checkbox column or bulk-action area. They still support search, sorting, column preferences and pagination. Set `query.pageSize` to control the page length; the footer keeps paging and the result count together without a page-size selector.

<ComponentPreview src="./examples/data-table-products.preview.web.ts" />

<ComponentPreview src="./examples/data-table-activity.preview.web.ts" />

## Index and Compact Layouts

Use `layout="index"` for long record lists. The toolbar stays at the top of the nearest scrolling container. Column headers scroll with the table rows. The footer stays at the bottom, with a synchronized horizontal scrollbar when columns overflow. The example below uses a 420px-tall scroll container with 2px of padding to keep the table frame’s outer border visible. Scroll down, move sideways, hide a column in **View**, and select rows to compare the pinned controls. Set `--pk-data-table-header-offset` or `--pk-data-table-footer-offset` when surrounding controls occupy the scrollport edges. `--pk-data-table-toolbar-background` sets the sticky toolbar background. The default `layout="embedded"` keeps the toolbar, headers and footer in normal document flow.

<ComponentPreview src="./examples/data-table-index.preview.web.ts" />

Use `size="compact"` for denser settings lists. Selection remains optional in either size or layout.

<ComponentPreview src="./examples/data-table-compact.preview.web.ts" />

## Long Content and Overflow

Ordinary text and custom cells wrap by default, with Craft's `33vw` maximum cell width. Long unbroken values can break within the cell. Built-in link columns stay on one line and show an ellipsis when their labels exceed the available width; the full label remains in the link's accessible name and native tooltip. Set `wrap: true` on a link column to show its complete label over multiple lines.

Dates, numbers and status columns stay on one line by default. Set `wrap: false` on a text column when a code or other value must stay intact. The `width` option is a preferred width, not a fixed limit: automatic table layout can widen a column to accommodate headings and non-wrapping content.

When the columns are wider than the available space, the table scrolls horizontally inside its own region. Search, View and the footer stay in place. Embedded tables use their native scrollbar; `layout="index"` adds a synchronized scrollbar above the sticky footer so it remains within reach on tall lists. Trackpad scrolling and keyboard scrolling work in both left-to-right and right-to-left layouts.

The example below combines a long linked title, wrapping prose, an unbroken reference and an explicitly non-wrapping code. Scroll down and sideways to review the sticky controls.

<ComponentPreview src="./examples/data-table-overflow.preview.web.ts" />

## Export Menu

Supply `exportFormats` to show the footer’s **Export** dropdown. Each option has a `value`, `label` and optional `disabled` flag. The component emits `pk-export` once when a format is chosen; it does not generate a file or fetch all matching records. The product example above displays the request so you can try the hook.

```js
table.exportFormats = [
    { value: 'csv', label: 'CSV' },
    { value: 'json', label: 'JSON' },
];
table.addEventListener('pk-export', (event) => {
    const { format, query, view, columnIds, selectedKeys } = event.detail;
    // Pass this snapshot to the plugin’s export handler.
});
```

The event contains a snapshot of query/view state, ordered visible `columnIds` and explicitly selected IDs. The consuming plugin decides whether to export the current page, matching records or selected records, and enforces server permissions. Set `exporting` while handling the request to disable the menu and show progress. Omit `exportFormats` to hide it. React uses `onPkExport`; Vue uses `@pk-export`.

## Columns and Custom Cells

The examples below cover all six column types. `text` is the default when `type` is omitted. Empty built-in values display an em dash.

| Type | Example | Configuration |
| --- | --- | --- |
| `text` | Team in the member directory | Plain text that wraps by default; use `wrap: false` to keep it on one line. |
| `link` | Member names and email addresses | `href(row)` provides the destination while the cell value supplies the label. |
| `status` | Approved, Awaiting review and Inactive | `status(row)` maps the visible label to a badge colour and indicator. |
| `number` | Orders, revenue and conversion | `numberOptions` controls integer, currency and percentage formatting. |
| `date` | Campaign update dates | `dateOptions`, `locale` and `timeZone` control the displayed date. |
| `custom` | Participant name with a secondary email line | `renderCell` or a named cell slot supplies the content. |

### Links, Text and Status

Member names are ordinary web links, while email addresses use `mailto:`. The member URLs use `example.com` as placeholder destinations; replace them with your application's record URLs. Link columns also support relative URLs and `tel:` links. Keep the displayed value separate from the destination with `href(row)`.

Status columns render a [StatusLabel](/web/components/status-label) badge with a dot and visible text. Here, `status(row)` maps **Approved** to `active`, **Awaiting review** to `pending` and **Inactive** to `inactive`, so the label can use your product's terminology.

<ComponentPreview src="./examples/data-table-links.preview.web.ts" />

### Status Labels

Use the same badge treatment for both semantic states and custom workflows. This example maps order workflow and payment labels to different colours through `status(row)`. Select a row to see how the badges adapt to the selected background. Keep the row values as readable labels; the component handles the uppercase visual treatment.

<ComponentPreview src="./examples/data-table-statuses.preview.web.ts" />

### Numbers and Dates

Orders use grouped digits, revenue uses Australian dollars, and conversion uses a percentage. The conversion column computes its numeric value with `value(row)`, so sorting uses the ratio rather than its formatted text. The table supplies `locale="en-AU"` and `timeZone="Australia/Melbourne"` for consistent formatting. The last row demonstrates that zero remains visible and a missing date displays an em dash.

<ComponentPreview src="./examples/data-table-formats.preview.web.ts" />

### Custom Cells

For content beyond those defaults, `renderCell({ row, column, value, rowKey })` returns a Lit template, DOM node or text. This controls the cell content while the component still owns table layout, sorting, selection and accessibility. Sorting/searching use the column’s value, not its rendered markup.

<ComponentPreview src="./examples/data-table-custom.preview.web.ts" />

```js
import { html } from 'lit';

table.columns = [{
    id: 'name',
    label: 'Participant',
    sortable: true,
    renderCell: ({ row }) => html`<strong>${row.name}</strong>`,
}];
```

Alternatively set `type: 'custom'` and project content into the slot returned by `dataTableCellSlot(rowKey, columnId)`, exported from the data-table family. React supports React-node render callbacks; Vue supports scoped `cell-columnId` slots. Consumer-projected content uses the consumer’s styles; built-in and Lit-rendered cells use the component’s shadow-root styles. Do not pass untrusted HTML strings as markup.

## Filters and Toolbar Extensions

Define filters independently from visible columns, then open the funnel button inside search. On wide tables the builder opens beneath the search field; in narrower spaces it opens as a centered dialog. Choose **Add a filter**, select a comparison and enter its value. Each field can appear once. Use the field selector to replace a condition, or the remove button to delete it. All conditions must match; multiple values within an “is one of” condition are alternatives.

Changes remain in a draft until **Apply**. Applying resets pagination and selection once, then updates local results or calls the remote loader. **Cancel**, Escape and clicking outside discard the draft. **Clear filters** removes the draft conditions; choose **Apply** to clear the active filters. Empty value conditions are ignored unless their operator is **is empty** or **has a value**. Reversed ranges display an error and keep the builder open. External changes to the query or filter definitions replace an open draft with the current applied state.

### Filter Types and Comparisons

This example provides all six filter types. Try **Status equals Active**, **Requests is at least 20**, and **Created is between** two dates. Add **Team is one of** to choose multiple teams, or **Verified equals No** to filter a boolean value. **Team is empty** finds Jordan Lee. Use **Participant begins with** for a text comparison.

<ComponentPreview src="./examples/data-table-filters.preview.web.ts" />

| Type | Default Comparison | Other Comparisons |
| --- | --- | --- |
| `text` | `contains` | `equals`, `not-equals`, `not-contains`, `starts-with`, `ends-with`, `empty`, `not-empty` |
| `select` | `equals` | `not-equals`, `empty`, `not-empty` |
| `multi-select` | `in` | `not-in`, `empty`, `not-empty` |
| `boolean` | `equals` | `empty`, `not-empty` |
| `number-range` | `between` | `equals`, `not-equals`, `greater-than`, `at-least`, `less-than`, `at-most`, `empty`, `not-empty` |
| `date-range` | `between` | The numeric comparisons above, labelled as before/after dates, plus `empty` and `not-empty`. |

Select options use `{ value, label }`. Boolean filter values are the strings `'true'` and `'false'`; row values may be booleans. A multi-select value is an array of selected option values. A `between` value is `[from, to]`, with empty strings representing unbounded ends. Other comparisons use a string. Empty comparisons retain the filter key with an empty string value. Local text comparisons are case-insensitive; select values compare exact option IDs. Date comparisons use UTC calendar days and include the whole selected end day. Interpret dates at the server when your product needs site-time-zone boundaries.

`query.filters` stores values, and the optional `query.filterOperators` map stores non-default comparisons. Omitting an operator preserves the filter type’s default comparison. Limit a filter's available comparisons with `operators`; its first supported entry becomes the default. For example:

```ts
table.filters = [{
    id: 'requests', label: 'Requests', type: 'number-range',
    operators: ['at-least', 'at-most', 'between'],
}];
table.setQuery({
    filters: { requests: '20' },
    filterOperators: { requests: 'at-least' },
});
```

Manage active filters in the filter popover. The funnel button shows the number of active filters; adding, changing, removing and clearing conditions all happen in the popover and take effect when you choose **Apply**. Search is debounced by `searchDelay` (250 ms by default); its clear button resets search immediately and returns focus to the input. Labels, comparison names, action text and validation messages can be translated through `labels`.

### Remote Filters

A remote endpoint receives both `filters` and `filterOperators`. Validate field IDs and supported operators before applying them to a database query. The example below simulates a remote loader and displays its request count and filter payload. Editing conditions or cancelling makes no request; **Apply** sends the completed draft once. Kit does not interpret remote-only `criteria`.

<ComponentPreview src="./examples/data-table-filters-remote.preview.web.ts" />

### Toolbar and Custom Criteria

Use `toolbar-start` for controls before search, `toolbar-controls` for controls between search/filtering and **View**, and `toolbar-end` for actions after **View**. The slots remain available when `searchable` or `columnControls` is false; `hideToolbar` hides the whole toolbar. The consumer owns each control's state and actions. For multiple adjacent controls, supply a ButtonGroup or a flex wrapper.

<ComponentPreview src="./examples/data-table-toolbar.preview.web.ts" />

This example uses a status selector before search, density buttons before **View**, and a new-record action at the end. The density buttons change `size`; a custom cards layout would remain consumer-owned.

Use the `filters` slot with `showFilters` for consumer-owned criteria such as a Craft condition builder or asynchronous user selector. This slot appears inside the shared builder, but its controls own their state and application; the built-in Apply/Cancel draft only covers declared `filters`. Call `setQuery({ filters: nextFilters, filterOperators: nextOperators })` for custom values, or `setQuery({ criteria: conditions })` for structured remote conditions. The local helper ignores undeclared filter IDs and does not interpret `criteria`. Clearing built-in filters leaves consumer-owned `criteria` unchanged.

`hideToolbar` supports embedded results with external controls. `searchable`, `columnControls` and `hideFooter` allow smaller compositions. The entire table remains one component, so consumers do not need to rebuild pagination or toolbar spacing.

## Selection and Actions

Enable `selectable` for row selection and checkboxes. Click a row’s non-interactive content to select just that record; Cmd-click (macOS) or Ctrl-click toggles an individual record. Shift-click selects an inclusive range from the last anchor on the current page, skipping ineligible records; Cmd/Ctrl+Shift adds a range. A range replaces this page’s selection while retaining explicit IDs on other pages. Checkboxes toggle records independently and also support Shift-click; keyboard Space toggles a focused checkbox. From a row checkbox, Up/Down moves between eligible records, Home/End moves to the first/last eligible record, and Shift extends a selection range. Cmd/Ctrl+A selects the eligible records on the current page, and Escape clears selection. Set `rowLabel` to a property name or formatter to give selection checkboxes readable names instead of record IDs. Links, buttons, inputs and other interactive cell content keep their own behavior. Add `data-table-interactive` to a custom interactive cell wrapper if it has no native control semantics. These gestures do nothing when `selectable` is false.

Selected rows use a dark slate background with white text. The selection count and `selection-actions` slot sit in a reserved footer region, so selecting records never inserts content above the table or shifts its rows. Keep the footer enabled when providing selection actions. `--pk-data-table-selected-background` and `--pk-data-table-selected-color` customize the selected colors; custom cells can use `--pk-data-table-cell-color` and `--pk-data-table-cell-muted-color` to follow the row’s state.

The header checkbox selects only eligible records on the current page. Explicit IDs remain selected while paging, and the count shows their full scope. Changing search, filters or sorting clears selection. `isRowSelectable(row)` can exclude records. On a site/account change, clear `selectedKeys` explicitly before supplying new data.

<ComponentPreview src="./examples/data-table-actions.preview.web.ts" />

Provide `rowActions(row)` returning `{ id, label, disabled? }` objects. `pk-row-action` supplies the action ID, row and row key; the plugin performs confirmation, permission checks and mutations. Put bulk controls in `selection-actions`, and consume `pk-selection-change.detail.selectedKeys`. There is no implicit “all matching records” selection. Exports and bulk operations belong to the consuming plugin, which knows their scope and backend guarantees.

## Remote Data

Set `mode="remote"` and provide a `dataSource(query, { signal })` returning a promise for `{ rows, total?, hasNext?, nextCursor?, previousCursor? }`. The loader runs on initial connection and query changes. Kit cancels superseded requests and rejects stale responses even when a loader ignores its signal. When sorting, existing rows stay visible and a spinner replaces the active column’s chevron until the request finishes. Other requests show a centred body spinner in place of the visible rows, preserving their space. Row interactions remain disabled while loading. Initial loads and loads following an empty result use the same space as the empty state. Loading text is announced to screen readers without a visible label. Loading does not insert a message above the table or move the footer. Paging keeps keyboard focus on an available page button when the request completes, unless the user has moved focus elsewhere.

<ComponentPreview src="./examples/data-table-remote.preview.web.ts" />

```js
table.mode = 'remote';
table.dataSource = async (query, { signal }) => {
    // Replace this URL and transport with the plugin's authenticated endpoint.
    const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
        signal,
    });
    if (!response.ok) throw new Error('Request failed');
    return response.json();
};
```

The example endpoint is illustrative. Craft plugins should use their existing authenticated request/CSRF transport. The server validates fields, operators, sort capabilities, page limits and permissions, then searches, filters and sorts the full authorised dataset. Remote mode never applies those operations again to the returned page. Catch `pk-load-error` for diagnostics; the UI uses safe error copy. `refresh()` retries or reloads after a mutation.

An existing application can own requests instead: omit `dataSource`, listen to `pk-query-change`, then assign `rows`, `total` or `hasNext`, `error` and `loading`. A UI query change sets `loading` to true; the application must clear it when the matching response completes. It also owns cancellation and stale-response handling in this mode. `DataTableRequestController` is available as a small optional request coordinator. Handle `pk-retry` to retry externally controlled requests.

## Cursor Pagination

Set `pagination="cursor"` for endpoints that return opaque cursors rather than page numbers. Kit forwards the requested token through `query.cursor`. Return `nextCursor` when another page exists and `previousCursor` when returning is supported. The table does not fabricate a total, page count or random-access links. Search/filter/sort changes clear the cursor. `query.pageSize` controls the requested page length and remains available to the loader.

<ComponentPreview src="./examples/data-table-cursor.preview.web.ts" />

## Empty and Error States

An empty dataset and a filtered query with no matches have distinct messages. Loading and updating feedback are announced. Failed loads show retry while preventing actions against stale rows. Override `labels` to translate UI text; interpolation keys are retained in translated strings. Use the `empty` slot for a product-specific next step.

<ComponentPreview src="./examples/data-table-empty.preview.web.ts" />

<ComponentPreview src="./examples/data-table-error.preview.web.ts" />

## State and Persistence

`query` contains `search`, `sort`, `filters`, optional `filterOperators`, zero-based `pageIndex`, `pageSize` and optional `cursor`. `view` contains `hiddenColumns` and `columnOrder`. The corresponding events expose complete new state. Consumers decide whether to put this state in the URL, user preferences or a named view. The table does not write browser storage or history automatically; opt into browser persistence with the helper below.

Column visibility is a viewing preference; it does not alter saved report definitions or permission boundaries. Keep a report’s persisted columns and export settings under the report editor’s explicit save behaviour.

### Remembering View Preferences

Call `persistDataTableView(table, options)` to remember column visibility, column order and sort field/direction in local storage. Configure the table first, then attach the helper before connecting it or starting its remote loader. Restoration is synchronous, so the first request uses the remembered sort without loading twice.

```ts
import { PkDataTable, persistDataTableView } from '@verbb/plugin-kit-web/components/data-table.js';

const table = new PkDataTable();
table.columns = columns;
table.defaultSort = [{ id: 'subscribed', direction: 'desc' }];
table.query = queryFromUrl;
const preferences = persistDataTableView(table, {
    key: 'back-in-stock:subscriptions',
    userId: currentUserId,
    version: 1,
    restoreSort: !urlHasExplicitSort,
});
table.dataSource = loadSubscriptions;
container.append(table);

// When disposing of this table or switching accounts:
// preferences.disconnect();
```

| Option | Behaviour |
| --- | --- |
| `key` | Required stable table identity. Include site or context when those views should have separate preferences. |
| `userId` | Required current account identifier. Users sharing a browser get separate preferences. |
| `version` | Defaults to `1`. Change it to start fresh after an incompatible consumer schema change. |
| `restoreSort` | Defaults to `true`. Set to `false` when an explicit URL sort should win; column preferences still restore and later user sort changes still save. |
| `storage` | Optional synchronous `getItem`/`setItem`/`removeItem` adapter. Defaults to the table document's `localStorage`. |

**Use defaults** removes the saved preference when the view and sort match the configured defaults. Search, filters, pagination, cursors, selected rows and row data are never stored. Browsers and origins have separate storage; this does not synchronise preferences across devices.

Removed column IDs and invalid sort fields are ignored. Required columns stay visible, new columns are appended in definition order, and at least one column remains visible. Invalid JSON, blocked storage and quota failures leave the table usable without persistence.

The helper listens to `pk-view-change` and sort changes in `pk-query-change`. Direct property assignments do not save automatically. It returns `storageKey`, `clear()` (forget saved preferences without changing the current table), and `disconnect()` (stop listening). Attaching a new helper to the same table disconnects the previous one. For controlled framework state, keep your state aligned with the restored `table.view` and `table.query` instead of overwriting them on the next render.

Change the columns or sort below, then choose **Recreate table** or reload the page. **Use defaults** forgets the demo's saved preferences.

<ComponentPreview src="./examples/data-table-persistence.preview.web.ts" />

## Layout and Accessibility

The component uses a native table with a caption and sortable heading buttons. Controls have accessible labels and normal keyboard navigation; the columns menu provides keyboard-operable reorder buttons. Wide tables scroll inside their region. Text wraps by default; use `wrap: false` to keep a value on one line, `align` for alignment, `width` for a preferred width and `size="compact"` for denser rows. Custom renderers remain responsible for meaningful link/button names and their own interactive content.

Pagination bounds the rendered page. Virtualisation, cell editing, spreadsheet navigation, grouping calculations, saved-view management and all-matching selection are not part of this component. A plugin can compose domain controls through slots without changing the table’s shared behaviour.

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

### Attributes & Properties

| Name | Description |
| --- | --- |
| `columnControls` `column-controls` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `columns` | Ordered column definitions and rendering capabilities.<br><small><strong>Type</strong> <code>DataTableColumn[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `dataSource` | Optional remote loader. Omit when the consuming application owns fetching.<br><small><strong>Type</strong> <code>DataTableDataSource \| undefined</code></small> |
| `defaultSort` | Initial/reset sort when query.sort is empty; defaults to the first sortable column ascending.<br><small><strong>Type</strong> <code>DataTableSort[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `defaultView` | Preferences restored by Use defaults.<br><small><strong>Type</strong> <code>DataTableView</code></small><br><small><strong>Default</strong> <code>{ hiddenColumns: [], columnOrder: [], }</code></small> |
| `error` | Safe user-facing error text, not a raw exception.<br><small><strong>Type</strong> <code>string</code></small> |
| `exportFormats` | Optional export choices. The consumer handles pk-export; no files are generated.<br><small><strong>Type</strong> <code>DataTableExportFormat[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `exporting` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `filters` | Filter controls and local matching rules.<br><small><strong>Type</strong> <code>DataTableFilter[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `hasNext` `has-next` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `hideFooter` `hide-footer` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `hideToolbar` `hide-toolbar` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isRowSelectable` | Return false to exclude a record from selection.<br><small><strong>Type</strong> <code>(         row: DataTableRow,     ) =&gt; boolean \| undefined</code></small> |
| `label` | Accessible name for the table and its scroll region.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Records</code></small> |
| `labels` | Override any UI string; interpolation uses {id}, {label}, {count}, {start}, {end}, {total}.<br><small><strong>Type</strong> <code>Partial&lt;DataTableLabels&gt;</code></small><br><small><strong>Default</strong> <code>{}</code></small> |
| `layout` | Embedded tables flow with their content; index tables keep footer controls and horizontal scrolling in reach.<br><small><strong>Type</strong> <code>'embedded' \| 'index'</code></small><br><small><strong>Default</strong> <code>embedded</code></small> |
| `loading` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `locale` | <small><strong>Type</strong> <code>string</code></small> |
| `mode` | Client mode processes all supplied rows. Remote mode never filters/sorts a partial page.<br><small><strong>Type</strong> <code>'client' \| 'remote'</code></small><br><small><strong>Default</strong> <code>client</code></small> |
| `nextCursor` `next-cursor` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `pagination` | <small><strong>Type</strong> <code>'offset' \| 'cursor'</code></small><br><small><strong>Default</strong> <code>offset</code></small> |
| `previousCursor` `previous-cursor` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `query` | Search, sort, criteria and pagination state.<br><small><strong>Type</strong> <code>DataTableQuery</code></small> |
| `rowActions` | Available product actions for each record.<br><small><strong>Type</strong> <code>(         row: DataTableRow,     ) =&gt; DataTableAction[] \| undefined</code></small> |
| `rowKey` | A property name or function returning a unique, stable record ID.<br><small><strong>Type</strong> <code>string \| ((row: DataTableRow) =&gt; DataTableKey)</code></small><br><small><strong>Default</strong> <code>id</code></small> |
| `rowLabel` | Optional property name or formatter for accessible row-selection labels. Defaults to the row key.<br><small><strong>Type</strong> <code>string \| ((row: DataTableRow) =&gt; string) \| undefined</code></small> |
| `rows` | The complete local dataset, or one externally fetched remote page.<br><small><strong>Type</strong> <code>DataTableRow[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `searchable` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `searchDelay` `search-delay` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>250</code></small> |
| `selectable` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `selectedKeys` | Explicit selected record IDs, retained across pages.<br><small><strong>Type</strong> <code>DataTableKey[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `showFilters` `show-filters` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>'default' \| 'compact'</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `timeZone` `time-zone` | <small><strong>Type</strong> <code>string</code></small> |
| `total` | <small><strong>Type</strong> <code>number \| undefined</code></small> |
| `view` | Column visibility and ordering preferences.<br><small><strong>Type</strong> <code>DataTableView</code></small><br><small><strong>Default</strong> <code>{ hiddenColumns: [], columnOrder: [], }</code></small> |

### Events

| Name | Description |
| --- | --- |
| `name` | — |
| `pk-export` | Detail: { format, query, view, columnIds, selectedKeys }. Consumer handles the export. |
| `pk-load` | Detail: { result, query }. A current data-source response was accepted. |
| `pk-load-error` | Detail: { error }. The current request failed. |
| `pk-query-change` | Detail: { query }. Search, sort, criteria or page changed. |
| `pk-retry` | A retry was requested in externally controlled remote mode. |
| `pk-row-action` | Detail: { action, row, rowKey }. Product action requested. |
| `pk-selection-change` | Detail: { selectedKeys }. Explicit record IDs changed. |
| `pk-view-change` | Detail: { view }. Column visibility/order changed. |

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
| `header-shell` | Sticky toolbar in index layout. | `::part(header-shell)` |
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
