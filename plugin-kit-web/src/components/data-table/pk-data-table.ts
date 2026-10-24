import { html, nothing, type PropertyValues } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import {
    slidersOutline,
    chevronDown,
    chevronUp,
    chevronLeft,
    chevronRight,
    magnifyingGlass,
    gripMove,
    pen,
    xmark,
    clipboard,
    ellipsis,
    renderIconHtml,
} from '../../icons/index.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property, state } from '../../decorators.js';
import { PkElement } from '../../base/pk-element.js';
import type { PkHideEvent } from '../../events/overlay-lifecycle.js';
import '../button/pk-button.js';
import type { PkButton } from '../button/pk-button.js';
import '../input/pk-input.js';
import '../checkbox/pk-checkbox.js';
import '../popover/pk-popover.js';
import '../select/pk-select.js';
import '../select/pk-option.js';
import '../button-group/pk-button-group.js';
import '../dropdown-menu/pk-dropdown-menu.js';
import '../dropdown-menu/pk-dropdown-item.js';
import '../status-label/pk-status-label.js';
import '../state-panel/pk-state-panel.js';
import '../spinner/pk-spinner.js';
import '../copy-button/pk-copy-button.js';
import { dataTableStyles } from './styles.js';
import { DataTableFilterController } from './filter-controller.js';
import { DataTableRowOrderController } from './row-order-controller.js';
import {
    dataTableCellSlot,
    dataTableLabels,
    dataTableText,
    dataTableValue,
    defaultDataTableQuery,
    queryDataTable,
    DataTableRequestController,
    type DataTableAction,
    type DataTableColumn,
    type DataTableDataSource,
    type DataTableExportFormat,
    type DataTableExportDetail,
    type DataTableSort,
    type DataTableFilter,
    type DataTableKey,
    type DataTableLabels,
    type DataTableQuery,
    type DataTableResult,
    type DataTableRow,
    type DataTableRowReorderDetail,
    type DataTableView,
} from './model.js';
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
@customElement('pk-data-table')
export class PkDataTable extends PkElement {
    static override styles = dataTableStyles;
    private readonly filterController = new DataTableFilterController(this);

    /** Accessible name for the table and its scroll region. */
    @property() label = 'Records';
    /** The complete local dataset, or one externally fetched remote page. */
    @property({ attribute: false }) rows: DataTableRow[] = [];
    /** Ordered column definitions and rendering capabilities. */
    @property({ attribute: false }) columns: DataTableColumn[] = [];
    /** Filter controls and local matching rules. */
    @property({ attribute: false }) filters: DataTableFilter[] = [];
    /** A property name or function returning a unique, stable record ID. */
    @property({ attribute: false }) rowKey:
        string | ((row: DataTableRow) => DataTableKey) = 'id';
    /** Search, sort, criteria and pagination state. */
    @property({ attribute: false }) query: DataTableQuery =
        defaultDataTableQuery();
    /** Column visibility and ordering preferences. */
    @property({ attribute: false }) view: DataTableView = {
        hiddenColumns: [],
        columnOrder: [],
    };
    /** Client mode processes all supplied rows. Remote mode never filters/sorts a partial page. */
    @property() mode: 'client' | 'remote' = 'client';
    @property() pagination: 'offset' | 'cursor' = 'offset';
    /** Optional remote loader. Omit when the consuming application owns fetching. */
    @property({ attribute: false }) dataSource?: DataTableDataSource;
    @property({ type: Number }) total?: number;
    @property({ type: Boolean, attribute: 'has-next' }) hasNext = false;
    @property({ attribute: 'next-cursor' }) nextCursor?: string;
    @property({ attribute: 'previous-cursor' }) previousCursor?: string;
    @property({ type: Boolean }) loading = false;
    /** Safe user-facing error text, not a raw exception. */
    @property() error = '';
    @property({ type: Boolean }) searchable = true;
    @property({ type: Boolean, attribute: 'show-filters' }) showFilters = false;
    @property({ type: Boolean, attribute: 'column-controls' }) columnControls =
        true;
    @property({ type: Boolean, attribute: 'hide-toolbar' }) hideToolbar = false;
    @property({ type: Boolean, attribute: 'hide-footer' }) hideFooter = false;
    @property({ type: Boolean }) selectable = false;
    /** Display rows in supplied order, with page-scoped pointer/keyboard reordering and no column sorting. */
    @property({ type: Boolean, attribute: 'manual-order' }) manualOrder = false;
    /** Disable row moves while saving or unavailable. Handles stay focusable so pending saves retain keyboard focus. */
    @property({ type: Boolean, attribute: 'reorder-disabled' }) reorderDisabled = false;
    /** Explicit selected record IDs, retained across pages. */
    @property({ attribute: false }) selectedKeys: DataTableKey[] = [];
    /** Return false to exclude a record from selection. */
    @property({ attribute: false }) isRowSelectable?: (
        row: DataTableRow,
    ) => boolean;
    /** Available product actions for each record; presets default to inline icon buttons. */
    @property({ attribute: false }) rowActions?: (
        row: DataTableRow,
    ) => DataTableAction[];
    /** Optional export choices. The consumer handles pk-export; no files are generated. */
    @property({ attribute: false }) exportFormats: DataTableExportFormat[] = [];
    @property({ type: Boolean }) exporting = false;
    /** Preferences restored by Use defaults. */
    @property({ attribute: false }) defaultView: DataTableView = {
        hiddenColumns: [],
        columnOrder: [],
    };
    /** Initial/reset sort when query.sort is empty; defaults to the first sortable column ascending. */
    @property({ attribute: false }) defaultSort: DataTableSort[] = [];
    @property({ type: Number, attribute: 'search-delay' }) searchDelay = 250;
    @property({ reflect: true }) size: 'default' | 'compact' = 'default';
    /** Embedded tables flow with their content; index tables keep footer controls and horizontal scrolling in reach. */
    @property({ reflect: true }) layout: 'embedded' | 'index' = 'embedded';
    /** Optional property name or formatter for accessible row-selection labels. Defaults to the row key. */
    @property({ attribute: false }) rowLabel?:
        string | ((row: DataTableRow) => string);
    @property() locale = '';
    @property({ attribute: 'time-zone' }) timeZone = '';
    /** Override any UI string; interpolation uses {id}, {label}, {count}, {start}, {end}, {total}. */
    @property({ attribute: false }) labels: Partial<DataTableLabels> = {};

    @state() private loaded?: DataTableResult;
    @state() private searchDraft?: string;
    @state() private dragOffsets: Record<string, number> = {};
    @state() private reorderAnnouncement = '';
    @state() private rowOrderAnnouncement = '';
    private rowOrder = new DataTableRowOrderController(
        () => this.canReorderRows,
        (from, to) => this.reorderRows(from, to),
        () => { this.rowOrderAnnouncement = this.text('rowReorderCancelled'); },
    );
    @state() private tableScrollWidth = 0;
    @state() private hasHorizontalOverflow = false;
    private sortLoading = false;
    private resizeObserver?: ResizeObserver;
    private layoutFrame?: number;
    private pagingFocus?: { direction: number; button: HTMLElement };
    private selectionAnchor?: DataTableKey;
    private checkboxGesture?: {
        key: DataTableKey;
        shiftKey: boolean;
        metaKey: boolean;
        ctrlKey: boolean;
    };
    private viewClosePending = false;
    private dragFrame?: number;
    private drag?: {
        id: string;
        startY: number;
        pointerY: number;
        startScroll: number;
        moved: boolean;
        targetIndex: number;
        pointerId: number;
        handle: HTMLElement;
        list: HTMLElement;
        rows: { id: string; top: number; height: number }[];
    };
    private requests = new DataTableRequestController();
    private searchTimer?: ReturnType<typeof setTimeout>;

    override connectedCallback(): void {
        super.connectedCallback();
        if (this.hasUpdated) this.observeLayout();
        if (this.hasUpdated && this.mode === 'remote' && this.dataSource)
            void this.refresh();
    }

    override disconnectedCallback(): void {
        this.rowOrder.cancel(false);
        this.cancelColumnDrag();
        this.resizeObserver?.disconnect();
        if (this.layoutFrame !== undefined)
            cancelAnimationFrame(this.layoutFrame);
        this.layoutFrame = undefined;
        this.resizeObserver = undefined;
        this.pagingFocus = undefined;
        clearTimeout(this.searchTimer);
        this.requests.cancel();
        super.disconnectedCallback();
    }

    protected override willUpdate(changed: PropertyValues<this>): void {
        // An external update must not commit a drag against a stale page or geometry.
        if (this.rowOrder.active) this.rowOrder.cancel();
        if (this.drag && (changed.has('columns') || changed.has('view')))
            this.cancelColumnDrag();
        if (
            changed.has('query') ||
            changed.has('rows') ||
            changed.has('selectable')
        ) {
            this.selectionAnchor = undefined;
            this.checkboxGesture = undefined;
        }
        // Resolve before rendering or loading so the indicator and endpoint receive the same sort.
        if ((this.manualOrder && this.query.sort.length) ||
            (!this.query.sort.length && this.resolvedDefaultSort.length)) {
            this.query = { ...this.query, sort: this.resolvedDefaultSort };
            if (this.mode === 'remote') this.loading = true;
            this.emit('pk-query-change', { query: this.query });
        }
        const pageSize = Number.isFinite(this.query.pageSize)
            ? Math.max(1, Math.floor(this.query.pageSize))
            : 25;
        const pageIndex = Number.isFinite(this.query.pageIndex)
            ? Math.max(0, Math.floor(this.query.pageIndex))
            : 0;
        if (
            pageSize !== this.query.pageSize ||
            pageIndex !== this.query.pageIndex
        )
            this.query = { ...this.query, pageSize, pageIndex };
        if (changed.has('query')) {
            this.requests.cancel();
            clearTimeout(this.searchTimer);
            this.searchDraft = undefined;
            // Also reset selection for externally supplied criteria, including browser history.
            const previous = changed.get('query') as DataTableQuery | undefined;
            this.sortLoading = !this.manualOrder && Boolean(previous?.sort.length &&
                JSON.stringify(previous.sort) !== JSON.stringify(this.query.sort));
            if (
                previous &&
                JSON.stringify([
                    previous.criteria,
                    previous.search,
                    previous.filters,
                    previous.filterOperators,
                    previous.sort,
                ]) !==
                    JSON.stringify([
                        this.query.criteria,
                        this.query.search,
                        this.query.filters,
                        this.query.filterOperators,
                        this.query.sort,
                    ])
            )
                this.setSelection([]);
        }
        if (changed.has('loading') && !this.loading) this.sortLoading = false;
        if (changed.has('dataSource') || changed.has('mode')) {
            this.requests.cancel();
            this.loaded = undefined;
        }
        if (changed.has('mode') && this.mode === 'client') {
            this.loading = false;
            this.error = '';
        }
        if (
            this.mode === 'client' &&
            (changed.has('rows') || changed.has('query'))
        ) {
            const result = queryDataTable(
                this.rows,
                this.columns,
                this.filters,
                this.query,
                this.locale || undefined,
            );
            const lastPage = Math.max(
                0,
                Math.ceil((result.total ?? 0) / this.query.pageSize) - 1,
            );
            if (this.query.pageIndex > lastPage) {
                this.query = { ...this.query, pageIndex: lastPage };
                this.emit('pk-query-change', { query: this.query });
            }
        }
    }

    protected override updated(changed: PropertyValues<this>): void {
        if (!this.resizeObserver) this.observeLayout();
        this.measureLayout();
        void this.restorePagingFocus();
        if (
            (changed.has('query') ||
                changed.has('dataSource') ||
                changed.has('mode')) &&
            this.mode === 'remote' &&
            this.dataSource
        )
            void this.refresh();
    }

    private observeLayout(): void {
        this.resizeObserver?.disconnect();
        this.resizeObserver = new ResizeObserver(() => {
            this.rowOrder.checkGeometry();
            // Rendering a scrollbar changes geometry; leave the observer delivery before updating Lit state.
            if (this.layoutFrame !== undefined)
                cancelAnimationFrame(this.layoutFrame);
            this.layoutFrame = requestAnimationFrame(() => {
                this.layoutFrame = undefined;
                this.measureLayout();
            });
        });
        for (const element of this.renderRoot.querySelectorAll(
            '.scroll, table, thead',
        ))
            this.resizeObserver.observe(element);
    }

    private measureLayout(): void {
        const scroll = this.renderRoot.querySelector<HTMLElement>('.scroll');
        if (!scroll) return;
        const header = this.renderRoot.querySelector<HTMLElement>('thead');
        // Position outside the table: Safari does not reliably contain absolute children in tbody.
        scroll.style.setProperty('--_pk-data-table-heading-height', `${header?.offsetHeight ?? 0}px`);
        this.tableScrollWidth = scroll.scrollWidth;
        this.hasHorizontalOverflow =
            scroll.scrollWidth > scroll.clientWidth + 1;
        const proxy = this.renderRoot.querySelector<HTMLElement>('.scrollbar');
        if (proxy) proxy.scrollLeft = scroll.scrollLeft;
    }

    private syncHorizontalScroll(event: Event, target: string): void {
        const scroll = this.renderRoot.querySelector<HTMLElement>(target);
        if (scroll)
            scroll.scrollLeft = (event.currentTarget as HTMLElement).scrollLeft;
    }

    private async restorePagingFocus(): Promise<void> {
        if (!this.pagingFocus || this.loading) return;
        const pending = this.pagingFocus;
        const buttons = [
            ...this.renderRoot.querySelectorAll<PkButton>('.pager pk-button'),
        ];
        // Lit updates child controls after this table. Wait until their native buttons are enabled before focusing.
        await Promise.all(buttons.map((button) => button.updateComplete));
        if (this.pagingFocus !== pending || this.loading || !this.isConnected)
            return;
        this.pagingFocus = undefined;
        const { direction, button } = pending;
        let active: Element | null = this.ownerDocument.activeElement;
        while (active?.shadowRoot?.activeElement)
            active = active.shadowRoot.activeElement;
        // Disabling a pending page button can drop focus to the document. Never steal it from a control the user moved to.
        if (
            active &&
            active !== this.ownerDocument.body &&
            active !== button &&
            active !== button.shadowRoot?.activeElement
        )
            return;
        const preferred = buttons[direction > 0 ? 1 : 0];
        const target =
            preferred && !preferred.disabled
                ? preferred
                : buttons.find((item) => !item.disabled);
        (
            target ?? this.renderRoot.querySelector<HTMLElement>('.scroll')
        )?.focus({ preventScroll: true });
    }

    private text(
        key: keyof DataTableLabels,
        values: Record<string, string | number> = {},
    ): string {
        return (this.labels[key] ?? dataTableLabels[key]).replace(
            /\{(\w+)\}/g,
            (match, name: string) => String(values[name] ?? match),
        );
    }

    private emit(name: string, detail: unknown = {}): void {
        this.dispatchEvent(
            new CustomEvent(name, { detail, bubbles: true, composed: true }),
        );
    }

    /** Request a new remote page. Superseded responses are ignored, even if the loader ignores abort. */
    async refresh(): Promise<void> {
        if (this.mode !== 'remote' || !this.dataSource) {
            this.emit('pk-retry');
            return;
        }
        this.loading = true;
        this.error = '';
        const query = this.manualOrder ? { ...this.query, sort: [] } : this.query;
        try {
            const result = await this.requests.load(
                this.dataSource,
                query,
            );
            if (!result) return;
            if (!Array.isArray(result.rows))
                throw new TypeError('DataTable dataSource must return rows.');
            this.loaded = result;
            this.loading = false;
            this.emit('pk-load', { result, query });
        } catch (error) {
            this.error = this.text('error');
            this.loading = false;
            this.emit('pk-load-error', { error });
        }
    }

    private get resolvedDefaultSort(): DataTableSort[] {
        if (this.manualOrder) return [];
        if (this.defaultSort.length)
            return this.defaultSort.map((sort) => ({ ...sort }));
        const column = this.columns.find((column) => column.sortable);
        return column ? [{ id: column.id, direction: 'asc' }] : [];
    }

    /** Update query state and reset paging for search, sorting or criteria changes. */
    setQuery(patch: Partial<DataTableQuery>): void {
        if (this.manualOrder && 'sort' in patch) {
            const { sort: _sort, ...rest } = patch;
            patch = rest;
            if (!Object.keys(patch).length) return;
        }
        this.requests.cancel();
        if ('sort' in patch && !patch.sort?.length)
            patch = { ...patch, sort: this.resolvedDefaultSort };
        const criteriaChanged =
            'search' in patch ||
            'sort' in patch ||
            'filters' in patch ||
            'filterOperators' in patch ||
            'criteria' in patch;
        const resetPage = criteriaChanged || 'pageSize' in patch;
        this.query = {
            ...this.query,
            ...patch,
            ...(resetPage ? { pageIndex: 0, cursor: undefined } : {}),
        };
        if (criteriaChanged) {
            this.pagingFocus = undefined;
            this.setSelection([]);
        }
        // In controlled remote mode the host must finish the request by clearing loading.
        if (this.mode === 'remote') this.loading = true;
        this.emit('pk-query-change', { query: this.query });
    }

    private setSelection(selectedKeys: DataTableKey[]): void {
        if (!selectedKeys.length) this.selectionAnchor = undefined;
        if (this.selectedKeys.length === 0 && selectedKeys.length === 0) return;
        this.selectedKeys = selectedKeys;
        this.emit('pk-selection-change', { selectedKeys });
    }

    private canSelectRow(row: DataTableRow): boolean {
        return (
            this.selectable &&
            !this.loading &&
            !this.error &&
            this.isRowSelectable?.(row) !== false
        );
    }

    private isRowControl(event: MouseEvent): boolean {
        // Inspect the composed path so controls in React/Vue slots and nested shadow roots retain their own actions.
        for (const node of event.composedPath()) {
            if (node === event.currentTarget) break;
            if (
                node instanceof Element &&
                node.matches(
                    'a, button, input, select, textarea, label, summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], [role="checkbox"], [role="switch"], [tabindex], [data-table-interactive]',
                )
            )
                return true;
        }
        return false;
    }

    private selectRow(
        row: DataTableRow,
        gesture: { shiftKey?: boolean; metaKey?: boolean; ctrlKey?: boolean },
        toggle = false,
    ): void {
        if (!this.canSelectRow(row)) return;
        const key = this.key(row);
        const pageKeys = this.result.rows.map((item) => this.key(item));
        const anchor =
            this.selectionAnchor === undefined
                ? -1
                : pageKeys.indexOf(this.selectionAnchor);
        const index = pageKeys.indexOf(key);
        if (gesture.shiftKey && anchor !== -1 && index !== -1) {
            const range = this.result.rows
                .slice(Math.min(anchor, index), Math.max(anchor, index) + 1)
                .filter((item) => this.canSelectRow(item))
                .map((item) => this.key(item));
            // A range replaces this page's selection; explicit IDs on other pages stay selected.
            const retained =
                gesture.metaKey || gesture.ctrlKey
                    ? this.selectedKeys
                    : this.selectedKeys.filter((id) => !pageKeys.includes(id));
            this.setSelection([...new Set([...retained, ...range])]);
            return;
        }
        this.selectionAnchor = key;
        if (toggle || gesture.metaKey || gesture.ctrlKey) {
            this.setSelection(
                this.selectedKeys.includes(key)
                    ? this.selectedKeys.filter((id) => id !== key)
                    : [...this.selectedKeys, key],
            );
        } else {
            this.setSelection([key]);
        }
    }

    private clickRow(event: MouseEvent, row: DataTableRow): void {
        if (
            event.button !== 0 ||
            !this.canSelectRow(row) ||
            this.isRowControl(event)
        )
            return;
        this.selectRow(row, event);
        (event.currentTarget as HTMLElement)
            .querySelector('pk-checkbox')
            ?.focus({ preventScroll: true });
    }

    private clickRowCheckbox(event: MouseEvent, row: DataTableRow): void {
        // Browsers differ on forwarding Shift-click from a label to its input.
        // Handle that label gesture directly; native input/keyboard changes keep their normal path.
        if (
            event.shiftKey &&
            !(event.composedPath()[0] instanceof HTMLInputElement)
        ) {
            event.preventDefault();
            this.checkboxGesture = undefined;
            this.selectRow(row, event, true);
            return;
        }
        this.checkboxGesture = {
            key: this.key(row),
            shiftKey: event.shiftKey,
            metaKey: event.metaKey,
            ctrlKey: event.ctrlKey,
        };
    }

    private changeRowCheckbox(row: DataTableRow): void {
        const gesture =
            this.checkboxGesture?.key === this.key(row)
                ? this.checkboxGesture
                : {};
        this.checkboxGesture = undefined;
        this.selectRow(row, gesture, true);
    }

    private keyRow(event: KeyboardEvent, row: DataTableRow): void {
        if (!this.canSelectRow(row) || event.defaultPrevented) return;
        const tr = event.currentTarget as HTMLElement;
        const checkbox = tr.querySelector('pk-checkbox');
        // Native/slotted cell controls keep their own shortcuts. Only the row selector participates.
        if (
            !event.composedPath().includes(checkbox as EventTarget) &&
            event.target !== tr
        )
            return;
        const command = event.metaKey || event.ctrlKey;
        const rows = this.result.rows.filter((item) => this.canSelectRow(item));
        if (command && event.key.toLowerCase() === 'a') {
            event.preventDefault();
            this.setSelection([
                ...new Set([
                    ...this.selectedKeys,
                    ...rows.map((item) => this.key(item)),
                ]),
            ]);
            return;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            this.setSelection([]);
            return;
        }
        if (event.key === 'Enter' || (event.key === ' ' && event.shiftKey)) {
            event.preventDefault();
            this.selectRow(row, event, true);
            return;
        }
        if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key))
            return;
        event.preventDefault();
        const current = rows.findIndex(
            (item) => this.key(item) === this.key(row),
        );
        const first =
            event.key === 'Home' || (command && event.key === 'ArrowUp');
        const last =
            event.key === 'End' || (command && event.key === 'ArrowDown');
        const index = first
            ? 0
            : last
              ? rows.length - 1
              : Math.max(
                    0,
                    Math.min(
                        rows.length - 1,
                        current + (event.key === 'ArrowUp' ? -1 : 1),
                    ),
                );
        const target = rows[index];
        if (!target) return;
        if (event.shiftKey) {
            this.selectionAnchor ??= this.key(row);
            this.selectRow(target, event);
        }
        const pageIndex = this.result.rows.findIndex(
            (item) => this.key(item) === this.key(target),
        );
        const targetRow =
            this.renderRoot.querySelectorAll<HTMLElement>('tbody tr')[
                pageIndex
            ];
        if (targetRow) {
            // Keep keyboard-focused rows between the pinned toolbar and footer.
            const footerHeight =
                this.layout === 'index'
                    ? (this.renderRoot.querySelector<HTMLElement>(
                          '.footer-shell',
                      )?.offsetHeight ?? 0)
                    : 0;
            const headerHeight = this.layout === 'index'
                ? (this.renderRoot.querySelector<HTMLElement>('.header-shell')?.offsetHeight ?? 0) +
                  (Number.parseFloat(getComputedStyle(this.renderRoot.querySelector<HTMLElement>('.header-shell')!).top) || 0) + 2
                : 0;
            targetRow.style.scrollMarginBlockStart = `${headerHeight}px`;
            targetRow.style.scrollMarginBlockEnd = `${footerHeight}px`;
        }
        targetRow
            ?.querySelector<HTMLElement>('pk-checkbox')
            ?.focus({ preventScroll: true });
        targetRow?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    private accessibleRowLabel(row: DataTableRow): string {
        return (
            (typeof this.rowLabel === 'function'
                ? this.rowLabel(row)
                : this.rowLabel
                  ? dataTableText(row[this.rowLabel])
                  : '') || String(this.key(row))
        );
    }

    private key(row: DataTableRow): DataTableKey {
        const key =
            typeof this.rowKey === 'function'
                ? this.rowKey(row)
                : row[this.rowKey];
        if (typeof key !== 'string' && typeof key !== 'number')
            throw new TypeError(
                'DataTable rows require a stable string or number rowKey.',
            );
        return key;
    }

    private get result(): DataTableResult {
        if (this.mode === 'client')
            return queryDataTable(
                this.rows,
                this.columns,
                this.filters,
                this.manualOrder ? { ...this.query, sort: [] } : this.query,
                this.locale || undefined,
            );
        return this.dataSource
            ? (this.loaded ?? { rows: [] })
            : {
                  rows: this.rows,
                  total: this.total,
                  hasNext: this.hasNext,
                  nextCursor: this.nextCursor,
                  previousCursor: this.previousCursor,
              };
    }

    private get rowOrderFiltered(): boolean {
        return Boolean(this.query.search.trim() || this.searchDraft?.trim() ||
            Object.keys(this.query.filters).length ||
            Object.keys(this.query.criteria ?? {}).length);
    }

    private get canReorderRows(): boolean {
        const count = this.mode === 'client'
            ? Math.min(this.query.pageSize, this.rows.length - this.query.pageIndex * this.query.pageSize)
            : this.dataSource ? this.loaded?.rows.length ?? 0 : this.rows.length;
        return this.manualOrder && !this.reorderDisabled && !this.loading &&
            !this.error && !this.rowOrderFiltered && count > 1;
    }

    private reorderRows(fromIndex: number, toIndex: number): void {
        if (!this.canReorderRows || fromIndex === toIndex) return;
        const page = [...this.result.rows];
        if (fromIndex < 0 || toIndex < 0 || fromIndex >= page.length || toIndex >= page.length)
            return;
        const previousKeys = page.map((row) => this.key(row));
        const [row] = page.splice(fromIndex, 1);
        page.splice(toIndex, 0, row);
        const previousRows = [...(this.mode === 'remote' && this.dataSource
            ? this.loaded!.rows : this.rows)];
        let rows: DataTableRow[];
        if (this.mode === 'client') {
            // Only replace this page's slots; off-page records retain their positions.
            const pageKeys = new Set(previousKeys);
            let index = 0;
            rows = this.rows.map((item) => pageKeys.has(this.key(item)) ? page[index++] : item);
            this.rows = rows;
        } else if (this.dataSource) {
            rows = page;
            this.loaded = { ...this.loaded!, rows };
        } else {
            rows = page;
            this.rows = rows;
        }
        this.selectionAnchor = undefined;
        this.rowOrderAnnouncement = this.text('rowReordered', {
            label: this.accessibleRowLabel(row), position: toIndex + 1, count: page.length,
        });
        const detail: DataTableRowReorderDetail = {
            rowKey: this.key(row), fromIndex, toIndex,
            orderedKeys: page.map((item) => this.key(item)), previousKeys,
            rows: [...rows], previousRows, query: structuredClone(this.query),
        };
        // Repeat moves the existing nodes, but browsers can drop focus when a row is reinserted.
        const handle = this.renderRoot.querySelectorAll<HTMLButtonElement>('.row-handle')[fromIndex];
        const hadFocus = this.renderRoot instanceof ShadowRoot && this.renderRoot.activeElement === handle;
        const focusAfterMove = async () => {
            await this.updateComplete;
            if (!hadFocus || !this.isConnected || !handle?.isConnected || this.loading || this.error || !this.manualOrder) return;
            const active = this.ownerDocument.activeElement;
            if (active !== this && active !== this.ownerDocument.body) return;
            const shadowActive = (this.renderRoot as ShadowRoot).activeElement;
            if (shadowActive && shadowActive !== handle) return;
            handle.focus({ preventScroll: true });
            handle.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        };
        this.emit('pk-row-reorder', detail);
        void focusAfterMove();
    }

    private keyRowOrder(event: KeyboardEvent, row: DataTableRow): void {
        if (event.altKey || event.ctrlKey || event.metaKey)
            return;
        if (!['Home', 'End', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        if (this.rowOrder.active || !this.canReorderRows) return;
        const rows = this.result.rows;
        const from = rows.findIndex((item) => this.key(item) === this.key(row));
        const to = event.key === 'Home' ? 0 : event.key === 'End' ? rows.length - 1
            : event.key === 'ArrowUp' ? Math.max(0, from - 1)
              : event.key === 'ArrowDown' ? Math.min(rows.length - 1, from + 1) : undefined;
        if (to === undefined) return;
        this.reorderRows(from, to);
    }

    private get orderedColumns(): DataTableColumn[] {
        const ordered = this.view.columnOrder
            .map((id) => this.columns.find((column) => column.id === id))
            .filter((column): column is DataTableColumn => Boolean(column));
        return [...new Set([...ordered, ...this.columns])];
    }

    private setView(view: DataTableView): void {
        this.view = view;
        this.emit('pk-view-change', { view });
    }

    private toggleColumn(id: string): void {
        const hidden = new Set(this.view.hiddenColumns);
        if (
            !hidden.has(id) &&
            this.columns.filter(
                (column) => column.hideable === false || !hidden.has(column.id),
            ).length <= 1
        )
            return;
        if (hidden.has(id)) hidden.delete(id);
        else hidden.add(id);
        this.setView({ ...this.view, hiddenColumns: [...hidden] });
    }

    private moveColumn(id: string, direction: number): void {
        const order = this.orderedColumns.map((column) => column.id),
            index = order.indexOf(id);
        if (index + direction < 0 || index + direction >= order.length) return;
        order.splice(index, 1);
        order.splice(index + direction, 0, id);
        this.reorderAnnouncement = this.text('reordered', {
            label: this.columns.find((column) => column.id === id)?.label ?? id,
            position: index + direction + 1,
            count: order.length,
        });
        this.setView({ ...this.view, columnOrder: order });
    }

    private icon(icon: typeof slidersOutline, slot?: string) {
        return html`<span
            class="icon"
            slot=${slot ?? nothing}
            aria-hidden="true"
            >${unsafeSVG(renderIconHtml(icon))}</span
        >`;
    }

    private directionIcon(direction: 'asc' | 'desc') {
        return html`<svg
            class="direction-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path
                d=${direction === 'asc' ? 'M5 20V4m-3 3 3-3 3 3' : 'M5 4v16m-3-3 3 3 3-3'}
            />
            <path d="M12 5h9M12 10h6M12 15h3M12 20h1" />
        </svg>`;
    }

    private startColumnDrag(event: PointerEvent, id: string): void {
        if (event.button !== 0) return;
        const list = this.renderRoot.querySelector<HTMLElement>('.column-list');
        if (!list) return;
        event.preventDefault();
        const handle = event.currentTarget as HTMLElement;
        handle.focus();
        const bounds = list.getBoundingClientRect();
        const rows = [
            ...list.querySelectorAll<HTMLElement>('.column-option'),
        ].map((row) => {
            const rect = row.getBoundingClientRect();
            return {
                id: row.dataset.column!,
                top: rect.top - bounds.top + list.scrollTop,
                height: rect.height,
            };
        });
        this.drag = {
            id,
            startY: event.clientY,
            pointerY: event.clientY,
            startScroll: list.scrollTop,
            moved: false,
            targetIndex: rows.findIndex((row) => row.id === id),
            pointerId: event.pointerId,
            handle,
            list,
            rows,
        };
        handle.setPointerCapture(event.pointerId);
    }

    private dragColumn(event: PointerEvent): void {
        if (!this.drag || event.pointerId !== this.drag.pointerId) return;
        this.drag.pointerY = event.clientY;
        if (Math.abs(event.clientY - this.drag.startY) < 4 && !this.drag.moved)
            return;
        this.drag.moved = true;
        this.previewColumnDrag();
    }

    private previewColumnDrag(): void {
        const drag = this.drag;
        if (!drag?.moved) return;
        const { list, rows } = drag;
        const bounds = list.getBoundingClientRect();
        const sourceIndex = rows.findIndex((row) => row.id === drag.id);
        const source = rows[sourceIndex];
        const desiredTop =
            source.top +
            drag.pointerY -
            drag.startY +
            list.scrollTop -
            drag.startScroll;
        const top = Math.max(
            Math.max(rows[0].top, list.scrollTop),
            Math.min(
                desiredTop,
                rows.at(-1)!.top + rows.at(-1)!.height - source.height,
                list.scrollTop + list.clientHeight - source.height,
            ),
        );
        const center = top + source.height / 2;
        drag.targetIndex = rows.reduce(
            (closest, row, index) =>
                Math.abs(center - row.top - row.height / 2) <
                Math.abs(center - rows[closest].top - rows[closest].height / 2)
                    ? index
                    : closest,
            0,
        );
        // Keep the captured handle in place in the DOM; only commit the order on drop.
        this.dragOffsets = Object.fromEntries(
            rows.map((row, index) => [
                row.id,
                index === sourceIndex
                    ? top - source.top
                    : index > sourceIndex && index <= drag.targetIndex
                      ? -source.height
                      : index < sourceIndex && index >= drag.targetIndex
                        ? source.height
                        : 0,
            ]),
        );
        const scroll =
            drag.pointerY < bounds.top + 24
                ? -8
                : drag.pointerY > bounds.bottom - 24
                  ? 8
                  : 0;
        if (this.dragFrame !== undefined) cancelAnimationFrame(this.dragFrame);
        this.dragFrame = undefined;
        if (
            scroll &&
            (scroll < 0
                ? list.scrollTop > 0
                : list.scrollTop + list.clientHeight < list.scrollHeight)
        ) {
            this.dragFrame = requestAnimationFrame(() => {
                this.dragFrame = undefined;
                list.scrollTop += scroll;
                this.previewColumnDrag();
            });
        }
    }

    private cancelColumnDrag(): void {
        const drag = this.drag;
        this.drag = undefined;
        if (this.dragFrame !== undefined) cancelAnimationFrame(this.dragFrame);
        this.dragFrame = undefined;
        this.dragOffsets = {};
        if (drag?.handle.hasPointerCapture(drag.pointerId))
            drag.handle.releasePointerCapture(drag.pointerId);
    }

    private endColumnDrag(event: PointerEvent, commit: boolean): void {
        const drag = this.drag;
        if (!drag || event.pointerId !== drag.pointerId) return;
        this.cancelColumnDrag();
        if (commit && drag.moved) {
            this.moveColumn(
                drag.id,
                drag.targetIndex -
                    drag.rows.findIndex((row) => row.id === drag.id),
            );
        }
    }

    private finishViewChildren(event: PkHideEvent): void {
        const view = (event.currentTarget as HTMLElement).closest('pk-popover');
        if (!view || event.target !== view) return;
        if (this.drag && event.detail.source === 'escape') {
            event.preventDefault();
            this.cancelColumnDrag();
            return;
        }
        this.cancelColumnDrag();
        const select = view.querySelector('pk-select');
        if (!select?.open) return;
        // A parent scale animation must not resize a still-positioned child dropdown.
        event.preventDefault();
        if (this.viewClosePending) return;
        this.viewClosePending = true;
        select.addEventListener(
            'pk-after-hide',
            () => {
                this.viewClosePending = false;
                void view.closePopover(event.detail.source);
            },
            { once: true },
        );
        void select.hide();
    }

    private renderView() {
        const sort = this.query.sort[0];
        const sortable = this.manualOrder ? [] : this.columns.filter((column) => column.sortable);
        const visibleCount = this.columns.filter(
            (column) =>
                column.hideable === false ||
                !this.view.hiddenColumns.includes(column.id),
        ).length;
        return html`<pk-popover
            class="view-popover"
            .label=${this.text('view')}
            @pk-hide=${this.finishViewChildren}
            placement="bottom-end"
            flush
        >
            <pk-button slot="trigger" with-caret
                >${this.icon(slidersOutline, 'start')}${this.text('view')}</pk-button
            >
            <div class="view-grid">
                ${
                    sortable.length
                        ? html`<div class="view-label">
                                  ${this.text('sortBy')}
                              </div>
                              <div
                                  class="view-sort"
                                  role="group"
                                  aria-label=${this.text('sortBy')}
                              >
                                  <pk-select
                                      aria-label=${this.text('sortBy')}
                                      .value=${sort?.id ?? ''}
                                      @pk-change=${(
                                          event: CustomEvent<{ value: string }>,
                                      ) => {
                                          const id = event.detail.value;
                                          if (id)
                                              this.setQuery({
                                                  sort: [
                                                      {
                                                          id,
                                                          direction:
                                                              sort?.direction ??
                                                              'asc',
                                                      },
                                                  ],
                                              });
                                      }}
                                      >${sortable.map((column) => html`<pk-option value=${column.id}>${column.label}</pk-option>`)}</pk-select
                                  >
                                  <pk-button-group
                                      .label=${this.text('sortDirection')}
                                      >${(['asc', 'desc'] as const).map((direction) => html`<pk-button .disabled=${!sort} variant=${sort?.direction === direction ? 'secondary' : 'default'} aria-label=${this.text(direction === 'asc' ? 'ascending' : 'descending')} aria-pressed=${sort?.direction === direction ? 'true' : 'false'} @click=${() => sort && this.setQuery({ sort: [{ id: sort.id, direction }] })}>${this.directionIcon(direction)}</pk-button>`)}</pk-button-group
                                  >
                              </div>`
                        : nothing
                }
                <div class="view-label columns-label">
                    ${this.text('columns')}
                </div>
                <div
                    class="column-list"
                    role="group"
                    aria-label=${this.text('columns')}
                    ?data-reordering=${this.drag?.moved}
                >
                    <span id="reorder-help" class="sr-only"
                        >${this.text('reorderHelp')}</span
                    >
                    ${repeat(
                        this.orderedColumns,
                        (column) => column.id,
                        (column) =>
                            html`<div
                                class="column-option"
                                data-column=${column.id}
                                ?data-dragging=${this.drag?.moved && this.drag.id === column.id}
                                style=${styleMap({ transform: this.drag?.moved ? `translateY(${this.dragOffsets[column.id] ?? 0}px)` : undefined })}
                            >
                                <button
                                    class="column-handle"
                                    type="button"
                                    aria-label=${this.text('reorder', { label: column.label })}
                                    aria-describedby="reorder-help"
                                    @pointerdown=${(event: PointerEvent) => this.startColumnDrag(event, column.id)}
                                    @pointermove=${(event: PointerEvent) => this.dragColumn(event)}
                                    @pointerup=${(event: PointerEvent) => this.endColumnDrag(event, true)}
                                    @pointercancel=${(event: PointerEvent) => this.endColumnDrag(event, false)}
                                    @lostpointercapture=${(event: PointerEvent) => this.endColumnDrag(event, false)}
                                    @keydown=${(event: KeyboardEvent) => {
                                        if (
                                            this.drag &&
                                            event.key === 'Escape'
                                        ) {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            this.cancelColumnDrag();
                                            return;
                                        }
                                        if (this.drag) return;
                                        if (
                                            event.key === 'ArrowUp' ||
                                            event.key === 'ArrowDown'
                                        ) {
                                            event.preventDefault();
                                            this.moveColumn(
                                                column.id,
                                                event.key === 'ArrowUp'
                                                    ? -1
                                                    : 1,
                                            );
                                        }
                                    }}
                                >
                                    ${this.icon(gripMove)}
                                </button>
                                <pk-checkbox
                                    .checked=${column.hideable === false || !this.view.hiddenColumns.includes(column.id)}
                                    .disabled=${column.hideable === false || (!this.view.hiddenColumns.includes(column.id) && visibleCount <= 1)}
                                    @change=${() => this.toggleColumn(column.id)}
                                    >${column.label}</pk-checkbox
                                >
                            </div>`,
                    )}
                </div>
            </div>
            <div class="view-footer">
                <pk-button
                    variant="transparent"
                    @click=${() => {
                        this.setView(structuredClone(this.defaultView));
                        this.setQuery({
                            sort: structuredClone(this.defaultSort),
                        });
                    }}
                    >${this.text('defaults')}</pk-button
                ><pk-button
                    @click=${(event: Event) => (event.currentTarget as HTMLElement).closest('pk-popover')?.closePopover()}
                    >${this.text('close')}</pk-button
                >
            </div>
            <span role="status" class="sr-only"
                >${this.reorderAnnouncement}</span
            >
        </pk-popover>`;
    }

    private renderExport() {
        if (!this.exportFormats.length) return nothing;
        return html`<pk-dropdown-menu
            placement="top-end"
            @pk-select=${(event: CustomEvent<{ value: string }>) => {
                if (
                    this.loading ||
                    this.exporting ||
                    !this.exportFormats.some(
                        (format) =>
                            format.value === event.detail.value &&
                            !format.disabled,
                    )
                )
                    return;
                const detail: DataTableExportDetail = {
                    format: event.detail.value,
                    query: structuredClone(this.query),
                    view: structuredClone(this.view),
                    columnIds: this.orderedColumns
                        .filter(
                            (column) =>
                                column.hideable === false ||
                                !this.view.hiddenColumns.includes(column.id),
                        )
                        .map((column) => column.id),
                    selectedKeys: [...this.selectedKeys],
                };
                this.emit('pk-export', detail);
            }}
            ><pk-button
                slot="trigger"
                with-caret
                size="sm"
                .disabled=${this.loading || this.exporting}
                .loading=${this.exporting}
                aria-label=${this.text(this.exporting ? 'exporting' : 'export')}
                >${this.text(this.exporting ? 'exporting' : 'export')}</pk-button
            >${this.exportFormats.map((format) => html`<pk-dropdown-item value=${format.value} .disabled=${Boolean(format.disabled)}>${format.label}</pk-dropdown-item>`)}</pk-dropdown-menu
        >`;
    }

    private sortColumn(id: string): void {
        if (this.manualOrder) return;
        const current = this.query.sort[0];
        this.setQuery({
            sort: [
                {
                    id,
                    direction:
                        current?.id === id && current.direction === 'asc'
                            ? 'desc'
                            : 'asc',
                },
            ],
        });
    }

    private inputSearch(event: Event): void {
        // Filter controls are slotted into the search field, but own their input events.
        if (event.target !== event.currentTarget) return;
        const value = (event.currentTarget as HTMLInputElement).value;
        this.searchDraft = value;
        clearTimeout(this.searchTimer);
        if (!value) {
            if (this.query.search) this.setQuery({ search: '' });
        } else {
            this.searchTimer = setTimeout(
                () => this.setQuery({ search: value }),
                this.searchDelay,
            );
        }
    }

    private renderToolbar() {
        if (this.hideToolbar) return nothing;
        return html`<div class="toolbar" part="toolbar">
            <slot name="toolbar-start"></slot>
            ${this.searchable ? html`<pk-input class="search" type="search" with-clear .clearLabel=${this.text('clearSearch')} .label=${this.text('search')} placeholder=${this.text('search')} .value=${this.searchDraft ?? this.query.search} @input=${this.inputSearch}>${this.icon(magnifyingGlass, 'start')}${this.filterController.renderTrigger('end')}</pk-input>` : nothing}
            <div class="toolbar-end">
                ${!this.searchable ? this.filterController.renderTrigger() : nothing}
                <slot name="toolbar-controls"></slot>
                ${this.columnControls ? this.renderView() : nothing}
                <slot name="toolbar-end"></slot>
            </div>
        </div>`;
    }

    private renderCell(row: DataTableRow, column: DataTableColumn) {
        const value = dataTableValue(row, column),
            key = this.key(row);
        const context = { row, column, value, rowKey: key };
        if (column.renderCell) return column.renderCell(context);
        if (column.type === 'custom')
            return html`<slot name=${dataTableCellSlot(key, column.id)}
                >${dataTableText(value)}</slot
            >`;
        if (value == null || value === '') return '—';
        if (column.type === 'handle') {
            const handle = dataTableText(value);
            return html`<span class="cell-handle" part="handle">
                <code>${handle}</code><pk-copy-button
                    .value=${handle}
                    .ariaLabel=${this.text('copyHandle', { label: handle })}
                    .copiedLabel=${this.text('copiedHandle', { label: handle })}
                    >${this.icon(clipboard, 'icon')}</pk-copy-button>
            </span>`;
        }
        if (column.type === 'number' && Number.isFinite(Number(value)))
            return new Intl.NumberFormat(
                this.locale || undefined,
                column.numberOptions,
            ).format(Number(value));
        if (column.type === 'date') {
            const date =
                value instanceof Date ? value : new Date(dataTableText(value));
            if (!Number.isFinite(date.getTime())) return '—';
            return html`<time datetime=${date.toISOString()}
                >${new Intl.DateTimeFormat(this.locale || undefined, { ...(this.timeZone ? { timeZone: this.timeZone } : {}), ...column.dateOptions }).format(date)}</time
            >`;
        }
        if (column.type === 'status')
            return html`<pk-status-label
                .status=${column.status?.(row) ?? dataTableText(value)}
                >${dataTableText(value)}</pk-status-label
            >`;
        if (column.type === 'link') {
            const href = column.href?.(row) ?? dataTableText(value);
            // Relative links are useful in Craft. Disallow executable and data URL schemes.
            try {
                if (
                    !['http:', 'https:', 'mailto:', 'tel:'].includes(
                        new URL(href, document.baseURI).protocol,
                    )
                )
                    return dataTableText(value);
            } catch {
                return dataTableText(value);
            }
            return html`<a
                href=${href}
                class=${column.wrap === true ? nothing : 'cell-link'}
                title=${dataTableText(value)}
                >${dataTableText(value)}</a
            >`;
        }
        return dataTableText(value);
    }

    private actionLabel(action: DataTableAction): string {
        return action.label ?? (action.preset ? this.text(`${action.preset}Action`) : action.id);
    }

    private activateAction(event: Event, action: DataTableAction, row: DataTableRow): void {
        if (action.disabled || this.loading || this.error) return;
        (event.currentTarget as HTMLElement).closest('pk-popover')?.removeAttribute('open');
        this.emit('pk-row-action', { action: action.id, row, rowKey: this.key(row) });
    }

    private renderRowActions(row: DataTableRow, actions: DataTableAction[]) {
        if (!actions.length) return nothing;
        const isInline = (action: DataTableAction) =>
            (action.display ?? (action.preset ? 'inline' : 'menu')) === 'inline';
        const menu = actions.filter((action) => !isInline(action));
        return html`<div class="row-actions" part="row-actions">
            ${actions.filter(isInline).map((action) => {
                const label = this.text('rowAction', {
                    label: this.actionLabel(action), id: this.accessibleRowLabel(row),
                });
                return html`<pk-button
                    class="row-action"
                    data-preset=${action.preset ?? nothing}
                    size=${action.preset ? 'xs' : 'sm'}
                    variant="none"
                    aria-label=${label}
                    .disabled=${Boolean(action.disabled)}
                    @click=${(event: Event) => this.activateAction(event, action, row)}
                    >${action.preset
                        ? this.icon({ edit: pen, move: gripMove, delete: xmark }[action.preset], 'start')
                        : this.actionLabel(action)}</pk-button>`;
            })}
            ${menu.length ? html`<pk-popover placement="bottom-end">
                <pk-button slot="trigger" size="xs" variant="none"
                    aria-label=${this.text('actions', { id: this.accessibleRowLabel(row) })}
                    >${this.icon(ellipsis, 'start')}</pk-button>
                <div class="panel">
                    ${menu.map((action) => html`<pk-button
                        .disabled=${Boolean(action.disabled)}
                        @click=${(event: Event) => this.activateAction(event, action, row)}
                        >${this.actionLabel(action)}</pk-button>`)}
                </div>
            </pk-popover>` : nothing}
        </div>`;
    }

    private page(delta: number, result: DataTableResult): void {
        const button =
            this.renderRoot.querySelectorAll<HTMLElement>('.pager pk-button')[
                delta > 0 ? 1 : 0
            ];
        if (button) this.pagingFocus = { direction: delta, button };
        this.setQuery({
            pageIndex: Math.max(0, this.query.pageIndex + delta),
            cursor:
                this.pagination === 'cursor'
                    ? delta > 0
                        ? result.nextCursor
                        : result.previousCursor
                    : undefined,
        });
    }

    override render() {
        const result = this.result;
        const columns = this.orderedColumns.filter(
            (column) =>
                column.hideable === false ||
                !this.view.hiddenColumns.includes(column.id),
        );
        const eligible = result.rows
            .filter((row) => this.isRowSelectable?.(row) !== false)
            .map((row) => this.key(row));
        const selected = new Set(this.selectable ? this.selectedKeys : []);
        const checked =
            eligible.length > 0 && eligible.every((key) => selected.has(key));
        const start = result.rows.length
            ? this.query.pageIndex * this.query.pageSize + 1
            : 0;
        const end = result.rows.length ? start + result.rows.length - 1 : 0;
        const next =
            this.pagination === 'cursor'
                ? Boolean(result.nextCursor)
                : result.total != null
                  ? end < result.total
                  : Boolean(result.hasNext);
        const previous =
            this.pagination === 'cursor'
                ? this.query.pageIndex > 0 &&
                  result.previousCursor !== undefined
                : this.query.pageIndex > 0;
        const busy = this.loading || Boolean(this.error);
        const sorting = this.loading && this.sortLoading;
        const bodyLoading = this.loading && !sorting;
        const proxy =
            this.layout === 'index' &&
            !this.hideFooter &&
            this.hasHorizontalOverflow;
        const count = this.text(
            result.total == null ? 'unknownRange' : 'range',
            { start, end, total: result.total ?? 0 },
        );
        return html`
            <div class="header-shell" part="header-shell">
                ${this.renderToolbar()}
            </div>
            ${this.filterController.renderDialog()}
            ${this.manualOrder ? html`
                <span id="row-order-help" class="sr-only">${this.text('reorderRowHelp')}</span>
                ${this.rowOrderFiltered ? html`<p class="row-order-hint">${this.text('reorderRowsFiltered')}</p>` : nothing}
                <span role="status" class="sr-only">${this.rowOrderAnnouncement}</span>
            ` : nothing}
            <div role="status" aria-live="polite" class="sr-only">
                ${this.loading ? this.text(result.rows.length ? 'updating' : 'loading') : selected.size ? `${count}. ${this.text('selected', { count: selected.size })}` : count}
            </div>
            ${this.error ? html`<pk-state-panel variant="error" .heading=${this.error}><pk-button slot="actions" @click=${() => this.refresh()}>${this.text('retry')}</pk-button></pk-state-panel>` : nothing}
            <div class="table-frame">
                <div
                    class="scroll"
                    part="scroll"
                    ?data-proxy=${proxy}
                    @scroll=${(event: Event) => this.syncHorizontalScroll(event, '.scrollbar')}
                    role="region"
                    aria-label=${this.label}
                    tabindex="0"
                    aria-busy=${this.loading ? 'true' : 'false'}
                >
                    <table part="table">
                        <caption class="sr-only">
                            ${this.label}
                        </caption>
                        <thead>
                            <tr>
                                ${this.manualOrder ? html`<th class="small" scope="col"><span class="sr-only">${this.text('rowOrder')}</span></th>` : nothing}
                                ${this.selectable ? html`<th class="small"><pk-checkbox aria-label=${this.text('selectPage')} .checked=${checked} .indeterminate=${!checked && eligible.some((key) => selected.has(key))} .disabled=${busy || eligible.length === 0} @change=${() => this.setSelection(checked ? this.selectedKeys.filter((key) => !eligible.includes(key)) : [...new Set([...this.selectedKeys, ...eligible])])}></pk-checkbox></th>` : nothing}
                                ${columns.map((column) => {
                                    const sort = !this.manualOrder && this.query.sort.find(
                                        (item) => item.id === column.id,
                                    );
                                    return html`<th
                                        scope="col"
                                        style=${styleMap({ width: column.width })}
                                        class=${column.align ?? (column.type === 'number' ? 'end' : '')}
                                        ?data-sorted=${Boolean(sort)}
                                        ?data-sortable=${Boolean(column.sortable && !this.manualOrder)}
                                        aria-sort=${sort ? (sort.direction === 'asc' ? 'ascending' : 'descending') : nothing}
                                    >
                                        ${column.sortable && !this.manualOrder ? html`<button class="sort" aria-label=${this.text('sort', { label: column.label })} @click=${() => this.sortColumn(column.id)}>${column.label}${sort ? sorting ? html`<pk-spinner class="sort-spinner" size="xs" aria-hidden="true"></pk-spinner>` : this.icon(sort.direction === 'asc' ? chevronUp : chevronDown) : nothing}</button>` : column.label}
                                    </th>`;
                                })}
                                ${this.rowActions ? html`<th class="small"><span class="sr-only">${this.text('actions', { id: '' })}</span></th>` : nothing}
                            </tr>
                        </thead>
                        <tbody class=${busy && !sorting ? 'busy' : ''} ?inert=${busy} ?data-loading=${bodyLoading}>
                            ${repeat(
                                result.rows,
                                (row) => this.key(row),
                                (row) => {
                                    const actions = this.rowActions?.(row) ?? [];
                                    return html`<tr
                                        ?data-selected=${this.selectable && selected.has(this.key(row))}
                                        ?data-selectable=${this.canSelectRow(row)}
                                        @click=${(event: MouseEvent) => this.clickRow(event, row)}
                                        @keydown=${(event: KeyboardEvent) => this.keyRow(event, row)}
                                        @mousedown=${(event: MouseEvent) => {
                                            if (
                                                event.button === 0 &&
                                                this.canSelectRow(row) &&
                                                (event.shiftKey ||
                                                    event.metaKey ||
                                                    event.ctrlKey) &&
                                                !this.isRowControl(event)
                                            )
                                                event.preventDefault();
                                        }}
                                    >
                                        ${this.manualOrder ? html`<td class="small">
                                            <button class="row-handle" part="row-handle" type="button"
                                                aria-label=${this.text('reorderRow', { label: this.accessibleRowLabel(row) })}
                                                aria-describedby="row-order-help"
                                                aria-disabled=${this.canReorderRows ? 'false' : 'true'}
                                                @pointerdown=${(event: PointerEvent) => this.rowOrder.start(event)}
                                                @keydown=${(event: KeyboardEvent) => this.keyRowOrder(event, row)}
                                                >${this.icon(gripMove)}</button>
                                        </td>` : nothing}
                                        ${
                                            this.selectable
                                                ? html`<td class="small">
                                                      <pk-checkbox
                                                          aria-label=${this.text('selectRow', { id: this.accessibleRowLabel(row) })}
                                                          .checked=${selected.has(this.key(row))}
                                                          .disabled=${busy || this.isRowSelectable?.(row) === false}
                                                          @mousedown=${(
                                                              event: MouseEvent,
                                                          ) => {
                                                              if (
                                                                  event.shiftKey
                                                              ) {
                                                                  event.preventDefault();
                                                                  (
                                                                      event.currentTarget as HTMLElement
                                                                  ).focus({
                                                                      preventScroll: true,
                                                                  });
                                                              }
                                                          }}
                                                          @click=${(event: MouseEvent) => this.clickRowCheckbox(event, row)}
                                                          @change=${() => this.changeRowCheckbox(row)}
                                                      ></pk-checkbox>
                                                  </td>`
                                                : nothing
                                        }
                                        ${columns.map((column) => html`<td part="cell" class=${`${column.align ?? (column.type === 'number' ? 'end' : '')} ${(column.wrap ?? !['number', 'date', 'status', 'handle'].includes(column.type ?? 'text')) ? '' : 'nowrap'}`}>${this.renderCell(row, column)}</td>`)}
                                        ${
                                            this.rowActions
                                                ? html`<td class="small">
                                                      ${this.renderRowActions(row, actions)}
                                                  </td>`
                                                : nothing
                                        }
                                    </tr>`;
                                },
                            )}
                        </tbody>
                    </table>
                    ${bodyLoading ? html`
                        ${!result.rows.length ? html`<div class="loading-space" aria-hidden="true"></div>` : nothing}
                        <div class="loading-indicator" aria-hidden="true"><pk-spinner></pk-spinner></div>
                    ` : nothing}
                    ${!result.rows.length && !bodyLoading && !this.error ? html`<slot name="empty"><pk-state-panel .heading=${this.text(this.query.search || Object.keys(this.query.filters).length ? 'noResults' : 'empty')}></pk-state-panel></slot>` : nothing}
                </div>
                ${
                    this.hideFooter
                        ? nothing
                        : html`<div class="footer-shell" part="footer-shell">
                              ${proxy ? html`<div class="scrollbar" part="scrollbar" role="region" aria-label=${this.text('scrollColumns', { label: this.label })} tabindex="0" @scroll=${(event: Event) => this.syncHorizontalScroll(event, '.scroll')}><div style=${styleMap({ width: `${this.tableScrollWidth}px` })}></div></div>` : nothing}
                              <div class="footer" part="footer">
                                  <nav
                                      class="pager"
                                      aria-label=${this.text('pagination', { label: this.label })}
                                  >
                                      <pk-button
                                          size="sm"
                                          variant="outline"
                                          aria-label=${this.text('previous')}
                                          .disabled=${!previous || this.loading}
                                          @click=${() => this.page(-1, result)}
                                          >${this.icon(chevronLeft)}</pk-button
                                      >
                                      <pk-button
                                          size="sm"
                                          variant="outline"
                                          aria-label=${this.text('next')}
                                          .disabled=${!next || this.loading}
                                          @click=${() => this.page(1, result)}
                                          >${this.icon(chevronRight)}</pk-button
                                      >
                                      <span>${count}</span>
                                  </nav>
                                  ${
                                      this.selectable
                                          ? html`<div
                                                class="selection"
                                                part="selection"
                                                ?data-empty=${selected.size === 0}
                                                ?inert=${busy || selected.size === 0}
                                                aria-hidden=${selected.size === 0 ? 'true' : nothing}
                                            >
                                                <span class="selection-count"
                                                    >${this.text('selected', { count: selected.size })}</span
                                                >
                                                <slot
                                                    name="selection-actions"
                                                ></slot>
                                            </div>`
                                          : nothing
                                  }
                                  <slot name="footer"></slot>
                                  <div class="footer-actions">
                                      ${this.renderExport()}
                                  </div>
                              </div>
                          </div>`
                }
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-data-table': PkDataTable;
    }
}
