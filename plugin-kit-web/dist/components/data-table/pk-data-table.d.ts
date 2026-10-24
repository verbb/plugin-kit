import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
import { DataTableAction, DataTableColumn, DataTableDataSource, DataTableExportFormat, DataTableSort, DataTableFilter, DataTableKey, DataTableLabels, DataTableQuery, DataTableRow, DataTableView } from './model.js';
export * from './model.js';
export * from './persistence.js';
/**
 * Record browser with a shared toolbar, semantic table and pagination footer.
 *
 * @slot toolbar-start - Controls before search.
 * @slot toolbar-controls - Additional controls after search/filter controls and before View.
 * @slot toolbar-end - Product actions after the standard controls.
 * @slot filters - Consumer-owned criteria controls inside the filter builder; consumers own their state and application.
 * @slot selection-actions - Footer actions for the explicitly selected record IDs; space stays reserved when empty.
 * @slot footer - Additional footer information.
 * @slot empty - Replacement for the empty/no-match state.
 * @event pk-query-change - Detail: { query }. Search, sort, criteria or page changed.
 * @event pk-row-reorder - Detail: DataTableRowReorderDetail. Current-page order changed; the consumer saves it.
 * @event pk-view-change - Detail: { view }. Column visibility/order changed.
 * @event pk-selection-change - Detail: { selectedKeys }. Explicit record IDs changed.
 * @event pk-row-action - Detail: { action, row, rowKey }. Product action requested.
 * @event pk-load - Detail: { result, query }. A current data-source response was accepted.
 * @event pk-load-error - Detail: { error }. The current request failed.
 * @event pk-export - Detail: { format, query, view, columnIds, selectedKeys }. Consumer handles the export.
 * @event pk-retry - A retry was requested in externally controlled remote mode.
 * @csspart header-shell - Sticky toolbar in index layout.
 * @csspart toolbar - Toolbar container.
 * @csspart table - Semantic table.
 * @csspart scroll - Contained horizontal scroll region.
 * @csspart footer - Count, selection actions and pagination region.
 * @csspart filter-builder - Filter condition editor.
 * @csspart filter-rule - Individual filter condition row.
 * @csspart filter-footer - Apply, cancel and clear controls.
 * @csspart footer-shell - Sticky container in index layout.
 * @csspart scrollbar - Synchronized horizontal scrollbar in index layout.
 * @cssproperty --pk-data-table-header-offset - Sticky header inset from the scroll container top.
 * @cssproperty --pk-data-table-toolbar-background - Background behind the sticky toolbar.
 * @cssproperty --pk-data-table-footer-offset - Sticky footer inset from the scroll container bottom.
 * @csspart handle - Copyable monospaced handle pill.
 * @csspart row-actions - Inline row actions and optional overflow menu.
 * @csspart row-handle - Pointer and keyboard row-reorder button in manual-order mode.
 * @csspart selection - Reserved footer selection count and actions.
 * @csspart cell - Data cell.
 * @cssproperty --pk-data-table-cell-padding - Cell spacing.
 * @cssproperty --pk-data-table-selected-background - Selected row background.
 * @cssproperty --pk-data-table-selected-color - Selected row foreground.
 * @cssproperty --pk-data-table-cell-color - Inherited cell foreground, including selected state.
 * @cssproperty --pk-data-table-cell-muted-color - Secondary cell text, including selected state.
 * @dependency pk-button
 * @dependency pk-input
 * @dependency pk-checkbox
 * @dependency pk-popover
 * @dependency pk-select
 * @dependency pk-option
 * @dependency pk-button-group
 * @dependency pk-dropdown-menu
 * @dependency pk-dropdown-item
 * @dependency pk-status-label
 * @dependency pk-dialog
 * @dependency pk-spinner
 * @dependency pk-state-panel
 */
export declare class PkDataTable extends PkElement {
    static styles: import('lit').CSSResult;
    private readonly filterController;
    /** Accessible name for the table and its scroll region. */
    label: string;
    /** The complete local dataset, or one externally fetched remote page. */
    rows: DataTableRow[];
    /** Ordered column definitions and rendering capabilities. */
    columns: DataTableColumn[];
    /** Filter controls and local matching rules. */
    filters: DataTableFilter[];
    /** A property name or function returning a unique, stable record ID. */
    rowKey: string | ((row: DataTableRow) => DataTableKey);
    /** Search, sort, criteria and pagination state. */
    query: DataTableQuery;
    /** Column visibility and ordering preferences. */
    view: DataTableView;
    /** Client mode processes all supplied rows. Remote mode never filters/sorts a partial page. */
    mode: 'client' | 'remote';
    pagination: 'offset' | 'cursor';
    /** Optional remote loader. Omit when the consuming application owns fetching. */
    dataSource?: DataTableDataSource;
    total?: number;
    hasNext: boolean;
    nextCursor?: string;
    previousCursor?: string;
    loading: boolean;
    /** Safe user-facing error text, not a raw exception. */
    error: string;
    searchable: boolean;
    showFilters: boolean;
    columnControls: boolean;
    hideToolbar: boolean;
    hideFooter: boolean;
    selectable: boolean;
    /** Display rows in supplied order, with page-scoped pointer/keyboard reordering and no column sorting. */
    manualOrder: boolean;
    /** Disable row moves while saving or unavailable. Handles stay focusable so pending saves retain keyboard focus. */
    reorderDisabled: boolean;
    /** Explicit selected record IDs, retained across pages. */
    selectedKeys: DataTableKey[];
    /** Return false to exclude a record from selection. */
    isRowSelectable?: (row: DataTableRow) => boolean;
    /** Available product actions for each record; presets default to inline icon buttons. */
    rowActions?: (row: DataTableRow) => DataTableAction[];
    /** Optional export choices. The consumer handles pk-export; no files are generated. */
    exportFormats: DataTableExportFormat[];
    exporting: boolean;
    /** Preferences restored by Use defaults. */
    defaultView: DataTableView;
    /** Initial/reset sort when query.sort is empty; defaults to the first sortable column ascending. */
    defaultSort: DataTableSort[];
    searchDelay: number;
    size: 'default' | 'compact';
    /** Embedded tables flow with their content; index tables keep footer controls and horizontal scrolling in reach. */
    layout: 'embedded' | 'index';
    /** Optional property name or formatter for accessible row-selection labels. Defaults to the row key. */
    rowLabel?: string | ((row: DataTableRow) => string);
    locale: string;
    timeZone: string;
    /** Override any UI string; interpolation uses {id}, {label}, {count}, {start}, {end}, {total}. */
    labels: Partial<DataTableLabels>;
    private loaded?;
    private searchDraft?;
    private dragOffsets;
    private reorderAnnouncement;
    private rowOrderAnnouncement;
    private rowOrder;
    private tableScrollWidth;
    private hasHorizontalOverflow;
    private sortLoading;
    private resizeObserver?;
    private layoutFrame?;
    private pagingFocus?;
    private selectionAnchor?;
    private checkboxGesture?;
    private viewClosePending;
    private dragFrame?;
    private drag?;
    private requests;
    private searchTimer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(changed: PropertyValues<this>): void;
    private observeLayout;
    private measureLayout;
    private syncHorizontalScroll;
    private restorePagingFocus;
    private text;
    private emit;
    /** Request a new remote page. Superseded responses are ignored, even if the loader ignores abort. */
    refresh(): Promise<void>;
    private get resolvedDefaultSort();
    /** Update query state and reset paging for search, sorting or criteria changes. */
    setQuery(patch: Partial<DataTableQuery>): void;
    private setSelection;
    private canSelectRow;
    private isRowControl;
    private selectRow;
    private clickRow;
    private clickRowCheckbox;
    private changeRowCheckbox;
    private keyRow;
    private accessibleRowLabel;
    private key;
    private get result();
    private get rowOrderFiltered();
    private get canReorderRows();
    private reorderRows;
    private keyRowOrder;
    private get orderedColumns();
    private setView;
    private toggleColumn;
    private moveColumn;
    private icon;
    private directionIcon;
    private startColumnDrag;
    private dragColumn;
    private previewColumnDrag;
    private cancelColumnDrag;
    private endColumnDrag;
    private finishViewChildren;
    private renderView;
    private renderExport;
    private sortColumn;
    private inputSearch;
    private renderToolbar;
    private renderCell;
    private actionLabel;
    private activateAction;
    private renderRowActions;
    private page;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-data-table': PkDataTable;
    }
}
//# sourceMappingURL=pk-data-table.d.ts.map