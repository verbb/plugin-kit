import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { PropertyValues, TemplateResult } from 'lit';
import { arrowDown, arrowUp, ellipsis, gear, getIcon, plus, xmark } from '@verbb/plugin-kit-icons';

import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { renderIconHtml } from '../../icons/index.js';
import { RequiredValidator } from '../../validators/index.js';
import '../button/pk-button.js';
import '../checkbox/pk-checkbox.js';
import '../color-input/pk-color-input.js';
import '../combobox/pk-combobox.js';
import '../date-picker/pk-date-picker.js';
import '../dropdown-menu/pk-dropdown-item.js';
import '../dropdown-menu/pk-dropdown-menu.js';
import '../input/pk-input.js';
import '../lightswitch/pk-lightswitch.js';
import '../select/pk-option.js';
import '../select/pk-select.js';
import '../textarea/pk-textarea.js';
import '../time-picker/pk-time-picker.js';
import { EditableTableDndController } from './editable-table-dnd.js';
import { pkEditableTableStyles } from './pk-editable-table.styles.js';
import {
    defaultValueForColumn,
    generateHandle,
    GENERATED_CELL_MODE,
    getCustomCellSlotName,
    getGeneratedCellKey,
    isCustomColumn,
    isEmptyCellValue,
    isGeneratedColumn,
    isThinColumn,
    nextRowId,
    normalizeOptions,
    type GeneratedCellMode,
    type PkEditableTableColumn,
    type PkEditableTableColumnType,
    type PkEditableTableGetRowMenuItems,
    type PkEditableTableModifyColumn,
    type PkEditableTableModifyRow,
    type PkEditableTableOption,
    type PkEditableTableRow,
    type PkEditableTableRowMenuItem,
    type PkEditableTableRowModifier,
} from './editable-table-model.js';

/** Slotted start-icon markup for pk-button (bundled — no registry lookup). */
const START_GRIP_ICON = `
    <svg slot="start" viewBox="0 0 448 512" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M71.3 295.6c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2s-57.4 21.9-79.2 0zM184.4 182.5c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2-57.3 21.8-79.2 0zm0 147c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.9-21.8-21.9-57.3 0-79.2zM297.5 216.4c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.8-21.9-21.8-57.3 0-79.2z"></path>
    </svg>
`;
const START_ELLIPSIS_ICON = renderIconHtml(ellipsis).replace('<svg', '<svg slot="start" aria-hidden="true"');
const START_ARROW_UP_ICON = renderIconHtml(arrowUp).replace('<svg', '<svg slot="start" aria-hidden="true"');
const START_ARROW_DOWN_ICON = renderIconHtml(arrowDown).replace('<svg', '<svg slot="start" aria-hidden="true"');
const START_XMARK_ICON = renderIconHtml(xmark).replace('<svg', '<svg slot="start" aria-hidden="true"');
const START_PLUS_ICON = renderIconHtml(plus).replace('<svg', '<svg slot="start" aria-hidden="true"');
const START_GEAR_ICON = renderIconHtml(gear).replace('<svg', '<svg slot="start" aria-hidden="true"');

const startIconHtml = (iconName?: string): string => {
    if (!iconName) {
        return '';
    }

    if (iconName === 'gear') {
        return START_GEAR_ICON;
    }

    const icon = getIcon(iconName);
    if (!icon) {
        return '';
    }

    return renderIconHtml(icon).replace('<svg', '<svg slot="start" aria-hidden="true"');
};

export type {
    PkEditableTableColumn,
    PkEditableTableColumnType,
    PkEditableTableGetRowMenuItems,
    PkEditableTableModifyColumn,
    PkEditableTableModifyRow,
    PkEditableTableOption,
    PkEditableTableRow,
    PkEditableTableRowMenuItem,
    PkEditableTableRowModifier,
} from './editable-table-model.js';

export {
    getCustomCellSlotName,
    isCustomColumn,
    nextRowId,
} from './editable-table-model.js';

/**
 * Editable table — inline-editable rows with add/delete and drag/keyboard reorder.
 * Form-associated: submits a JSON array of row objects (internal `_id`s stripped).
 *
 * Canonical composite; framework facades wrap this rather than reimplementing the table.
 * Cell controls compose the same `pk-*` primitives exposed to consumers so the web
 * component keeps v1/Craft feel while owning the canonical table behaviour.
 */
@customElement('pk-editable-table')
export class PkEditableTable extends PkFormAssociatedElement {
    static override styles = pkEditableTableStyles;

    static override get validators() {
        return [...super.validators, RequiredValidator()];
    }

    @property({ attribute: false })
    columns: PkEditableTableColumn[] = [];

    @property({ attribute: false })
    rows: PkEditableTableRow[] = [];

    @property({ type: Boolean, reflect: true, attribute: 'allow-add' })
    allowAdd = true;

    @property({ type: Boolean, reflect: true, attribute: 'allow-delete' })
    allowDelete = true;

    @property({ type: Boolean, reflect: true, attribute: 'allow-reorder' })
    allowReorder = true;

    @property({ attribute: 'add-row-label' })
    addRowLabel = '';

    /**
     * Optional form-field prefix for `cellErrors` keys.
     * Looks up `${fieldName}.${rowIndex}.${columnName}` then falls back to `${rowIndex}.${columnName}`.
     */
    @property({ attribute: 'field-name' })
    fieldName = '';

    /** Errors keyed by `${rowIndex}.${columnName}` or `${fieldName}.${rowIndex}.${columnName}`. */
    @property({ attribute: false })
    cellErrors: Record<string, string[] | string> = {};

    /** Merged into each newly added row after column defaults. */
    @property({ attribute: false })
    newRowDefaults: Record<string, unknown> = {};

    /**
     * Per-cell column override (e.g. swap value column to a select based on another cell).
     * Return a partial column merged over the base definition for that render.
     */
    @property({ attribute: false })
    modifyColumn: PkEditableTableModifyColumn | null = null;

    /** Per-row chrome — class/title on the `<tr>` (availability highlights, etc.). */
    @property({ attribute: false })
    modifyRow: PkEditableTableModifyRow | null = null;

    /**
     * Extra ellipsis-menu items for a row (data descriptors — not React nodes).
     * Selection fires `pk-row-menu-select` with `{ rowIndex, row, item, action, value }`.
     */
    @property({ attribute: false })
    getRowMenuItems: PkEditableTableGetRowMenuItems | null = null;

    @state()
    private internalRows: PkEditableTableRow[] = [];

    /**
     * Deferred drag binding. Grips render immediately but stay inactive until idle
     * so large tables don't pay pointer-listener setup on first paint.
     */
    @state()
    private dndReady = false;

    /** Per-cell mode for generated handle/value columns (`rowId:columnName` → mode). */
    private generatedCellModes = new Map<string, GeneratedCellMode>();

    private dndController = new EditableTableDndController({
        onReorderTo: (orderedIds) => {
            this.commitReorderByIds(orderedIds);
        },
    });

    private dndIdleId: number | null = null;
    private dndTimeoutId: ReturnType<typeof setTimeout> | null = null;
    /** Skip drag rebinding when row identity/order is unchanged (typing shouldn't resync 195 rows). */
    private dndRowSignature = '';

    protected override willUpdate(changed: PropertyValues): void {
        if (changed.has('rows')) {
            const incoming = Array.isArray(this.rows) ? this.rows : [];
            const previous = this.internalRows;
            // Preserve row identity across controlled writes. emitChange / consumers
            // often echo rows without `_id`; minting fresh ids each keystroke would
            // drop generated-cell AUTO modes and freeze handle/value after 1 char.
            this.internalRows = incoming.map((row, index) => {
                const existingId = typeof row._id === 'string'
                    ? row._id
                    : (typeof previous[index]?._id === 'string' ? String(previous[index]._id) : nextRowId());
                return { ...row, _id: existingId };
            });
            this.syncGeneratedModesFromRows();
            this.syncFormValue();
        }

        if (changed.has('allowReorder') || changed.has('disabled')) {
            this.scheduleDndHydration();
        }

        super.willUpdate(changed);
    }

    override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.scheduleDndHydration();
    }

    protected override shouldUpdate(changed: PropertyValues): boolean {
        // Pointer drag owns <tbody> order. Any Lit reconcile (controlled rows echo,
        // cell chrome, etc.) snaps rows back and fights the overlay — freeze paint.
        if (this.dndController.isSessionActive) {
            return false;
        }

        return super.shouldUpdate(changed);
    }

    // Match base visibility — `PkFormAssociatedElement.updated` is public.
    override updated(changed: PropertyValues): void {
        super.updated(changed);
        if (this.dndReady && this.allowReorder && !this.disabled) {
            // Skip while pointer drag owns tbody order (source row + placeholder).
            if (!this.dndController.isSessionActive) {
                this.syncDndSortables();
            }
        } else if (this.dndController.isActive && (!this.allowReorder || this.disabled || !this.dndReady)) {
            this.dndController.destroy();
            this.dndRowSignature = '';
        }
    }

    override disconnectedCallback(): void {
        this.cancelDndHydration();
        this.dndController.destroy();
        this.dndReady = false;
        super.disconnectedCallback();
    }

    /** Serialized rows, used for form submission and required validation (empty when no rows). */
    get value(): string {
        return this.internalRows.length ? JSON.stringify(this.cleanRows()) : '';
    }

    private get validColumns(): PkEditableTableColumn[] {
        return (Array.isArray(this.columns) ? this.columns : []).filter((column) => {
            return typeof column?.name === 'string' && column.name.trim() !== '';
        });
    }

    private get generatedColumns(): PkEditableTableColumn[] {
        return this.validColumns.filter(isGeneratedColumn);
    }

    private get showActionsColumn(): boolean {
        // Extra row-menu items need the actions column even when reorder/delete are off.
        return this.allowReorder || this.allowDelete || Boolean(this.getRowMenuItems);
    }

    private cleanRows(): PkEditableTableRow[] {
        return this.internalRows.map((row) => {
            const { _id, ...rest } = row;
            void _id;
            return rest;
        });
    }

    /**
     * Public cell write path for slotted / framework-projected custom cells.
     * Prefer this over mutating `rows` locally so generated columns + events stay in sync.
     */
    setCellValue(rowIndex: number, columnName: string, value: unknown): void {
        const row = this.internalRows[rowIndex];
        if (!row) {
            return;
        }

        const base = this.validColumns.find((column) => column.name === columnName);
        if (!base) {
            return;
        }

        this.updateCell(rowIndex, this.resolveColumn(row, base, rowIndex), value);
    }

    private resolveColumn(
        row: PkEditableTableRow,
        column: PkEditableTableColumn,
        rowIndex: number,
    ): PkEditableTableColumn {
        const patch = this.modifyColumn?.(row, column.name, column, rowIndex);
        if (!patch || typeof patch !== 'object') {
            return column;
        }

        return { ...column, ...patch, name: column.name };
    }

    private resolveRowModifier(row: PkEditableTableRow, rowIndex: number): PkEditableTableRowModifier {
        const patch = this.modifyRow?.(row, rowIndex);
        if (!patch || typeof patch !== 'object') {
            return {};
        }

        return patch;
    }

    private resolveRowMenuItems(row: PkEditableTableRow, rowIndex: number): PkEditableTableRowMenuItem[] {
        const items = this.getRowMenuItems?.(row, rowIndex);
        return Array.isArray(items) ? items.filter((item) => item && typeof item.label === 'string') : [];
    }

    private syncGeneratedModesFromRows(): void {
        const generated = this.generatedColumns;
        if (this.internalRows.length === 0 || generated.length === 0) {
            this.generatedCellModes.clear();
            return;
        }

        const validKeys = new Set<string>();

        for (const row of this.internalRows) {
            const rowId = String(row._id);
            for (const column of generated) {
                const key = getGeneratedCellKey(rowId, column.name);
                validKeys.add(key);

                if (this.generatedCellModes.has(key)) {
                    continue;
                }

                this.generatedCellModes.set(
                    key,
                    isEmptyCellValue(row[column.name]) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.SEEDED,
                );
            }
        }

        for (const key of [...this.generatedCellModes.keys()]) {
            if (!validKeys.has(key)) {
                this.generatedCellModes.delete(key);
            }
        }
    }

    protected override syncFormValue(): void {
        const serialized = JSON.stringify(this.cleanRows());
        this.setFormValue(serialized, serialized);
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state !== 'string') {
            return;
        }

        try {
            const parsed = JSON.parse(state);
            if (Array.isArray(parsed)) {
                this.rows = parsed;
            }
        } catch {
            // Ignore malformed restore payloads.
        }
    }

    /**
     * Inner cell controls (lightswitch, checkbox, select, pickers, inputs) all
     * dispatch `pk-change`/`input`/`change` with `bubbles` + `composed`, so those
     * events would otherwise escape this component's shadow root and masquerade as
     * the table's own events. Consumers bind `pk-change` and read `detail.rows`; a
     * leaked lightswitch `pk-change` carries `{ checked }` (no `rows`), which would
     * reset `rows` to `undefined` and wipe every row. We stop them at the table
     * wrapper — cell `@pk-change`/`@input` handlers already ran at their target, and
     * the table re-dispatches its own `{ rows }` payload from the host in emitChange.
     */
    private stopInnerControlEvent(event: Event): void {
        if (event.target !== this) {
            event.stopPropagation();
        }
    }

    private emitChange(): void {
        // Keep `_id` on the rows property / event so controlled bindings don't
        // invalidate generated-column AUTO tracking. Form submit still strips ids.
        const rows = this.internalRows.map((row) => ({ ...row }));
        this.rows = rows;
        this.syncFormValue();

        this.dispatchEvent(new CustomEvent<{ rows: PkEditableTableRow[] }>('pk-change', {
            detail: { rows },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private emitCellChange(rowIndex: number, columnName: string, value: unknown, row: PkEditableTableRow): void {
        this.dispatchEvent(new CustomEvent<{
            rowIndex: number;
            columnName: string;
            value: unknown;
            row: PkEditableTableRow;
        }>('pk-cell-change', {
            detail: { rowIndex, columnName, value, row },
            bubbles: true,
            composed: true,
        }));
    }

    private commitRows(next: PkEditableTableRow[], cellChanges: Array<{
        rowIndex: number;
        columnName: string;
        value: unknown;
        row: PkEditableTableRow;
    }> = []): void {
        this.internalRows = next;
        this.emitChange();
        for (const change of cellChanges) {
            this.emitCellChange(change.rowIndex, change.columnName, change.value, change.row);
        }
    }

    private updateCell(rowIndex: number, column: PkEditableTableColumn, value: unknown): void {
        const row = this.internalRows[rowIndex];
        if (!row) {
            return;
        }

        // Exclusive radio: checking one row clears others in that column.
        if (column.type === 'radio') {
            const nextChecked = Boolean(value);
            const allowUnselect = Boolean(column.allowUnselect);
            const next = this.internalRows.map((item) => ({ ...item }));
            const cellChanges: Array<{
                rowIndex: number;
                columnName: string;
                value: unknown;
                row: PkEditableTableRow;
            }> = [];

            if (nextChecked) {
                next.forEach((item, index) => {
                    const target = index === rowIndex;
                    if (Boolean(item[column.name]) !== target) {
                        next[index] = { ...item, [column.name]: target };
                        cellChanges.push({
                            rowIndex: index,
                            columnName: column.name,
                            value: target,
                            row: this.internalRows[index],
                        });
                    }
                });
            } else if (allowUnselect && Boolean(row[column.name])) {
                next[rowIndex] = { ...row, [column.name]: false };
                cellChanges.push({
                    rowIndex,
                    columnName: column.name,
                    value: false,
                    row,
                });
            } else {
                return;
            }

            if (cellChanges.length === 0) {
                return;
            }

            this.commitRows(next, cellChanges);
            return;
        }

        if (isGeneratedColumn(column)) {
            // Manual edits stick; clearing the cell returns it to auto-derived mode.
            this.generatedCellModes.set(
                getGeneratedCellKey(String(row._id), column.name),
                isEmptyCellValue(value) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.MANUAL,
            );
        }

        const sourceUpdate: Record<string, unknown> = { [column.name]: value };
        const derivedUpdates: Record<string, unknown> = {};

        for (const targetColumn of this.generatedColumns) {
            if (targetColumn.source !== column.name) {
                continue;
            }

            const targetKey = getGeneratedCellKey(String(row._id), targetColumn.name);
            const currentTargetValue = row[targetColumn.name];
            const existingMode = this.generatedCellModes.get(targetKey)
                ?? (isEmptyCellValue(currentTargetValue) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.SEEDED);

            // Manual or already-seeded cells stay put until cleared.
            if (existingMode === GENERATED_CELL_MODE.MANUAL || existingMode === GENERATED_CELL_MODE.SEEDED) {
                continue;
            }

            if (targetColumn.type === 'handle') {
                derivedUpdates[targetColumn.name] = generateHandle(String(value ?? ''));
                this.generatedCellModes.set(targetKey, GENERATED_CELL_MODE.AUTO);
            } else if (targetColumn.type === 'value') {
                derivedUpdates[targetColumn.name] = value;
                this.generatedCellModes.set(targetKey, GENERATED_CELL_MODE.AUTO);
            }
        }

        const allUpdates = { ...sourceUpdate, ...derivedUpdates };
        const hasRealChange = Object.entries(allUpdates).some(([key, nextValue]) => row[key] !== nextValue);
        if (!hasRealChange) {
            return;
        }

        const next = this.internalRows.slice();
        next[rowIndex] = { ...row, ...allUpdates };
        const cellChanges = Object.entries(allUpdates).map(([columnName, nextValue]) => ({
            rowIndex,
            columnName,
            value: nextValue,
            row,
        }));
        this.commitRows(next, cellChanges);
    }

    private addRow(): void {
        if (this.disabled || !this.allowAdd) {
            return;
        }

        const row: PkEditableTableRow = {
            _id: nextRowId(),
            ...(this.newRowDefaults && typeof this.newRowDefaults === 'object' ? this.newRowDefaults : {}),
        };

        for (const column of this.validColumns) {
            if (!(column.name in row)) {
                row[column.name] = defaultValueForColumn(column);
            }
        }

        this.internalRows = [...this.internalRows, row];
        this.syncGeneratedModesFromRows();
        this.emitChange();
    }

    private removeRow(rowIndex: number): void {
        if (this.disabled || !this.allowDelete) {
            return;
        }

        this.internalRows = this.internalRows.filter((_, index) => index !== rowIndex);
        this.syncGeneratedModesFromRows();
        this.emitChange();
    }

    private moveRow(rowIndex: number, direction: number): void {
        const target = rowIndex + direction;
        if (this.disabled || target < 0 || target >= this.internalRows.length) {
            return;
        }

        this.commitReorder(rowIndex, target);
    }

    private commitReorder(fromIndex: number, toIndex: number): void {
        if (
            this.disabled
            || fromIndex === toIndex
            || fromIndex < 0
            || toIndex < 0
            || fromIndex >= this.internalRows.length
            || toIndex >= this.internalRows.length
        ) {
            return;
        }

        const next = this.internalRows.slice();
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        this.internalRows = next;
        this.emitChange();
    }

    /**
     * Apply DOM-seated order after pointer drag. Uses stable `_id`s so a floated
     * source row left in the tbody can't skew from/to index arithmetic — and so a
     * cancelled drag that briefly moved the placeholder can't desync data vs DOM.
     */
    private commitReorderByIds(orderedIds: string[]): void {
        if (this.disabled || orderedIds.length === 0) {
            return;
        }

        const byId = new Map(this.internalRows.map((row) => [String(row._id), row]));
        if (orderedIds.length !== byId.size) {
            return;
        }

        const next: PkEditableTableRow[] = [];
        for (const id of orderedIds) {
            const row = byId.get(id);
            if (!row) {
                return;
            }
            next.push(row);
        }

        const unchanged = next.every((row, index) => row === this.internalRows[index]);
        if (unchanged) {
            return;
        }

        this.internalRows = next;
        this.emitChange();
    }

    private scheduleDndHydration(): void {
        this.cancelDndHydration();

        if (!this.allowReorder || this.disabled) {
            this.dndReady = false;
            this.dndController.destroy();
            return;
        }

        if (this.dndReady) {
            return;
        }

        // Defer Sortable registration past first paint (v1 requestIdleCallback + 1200ms cap).
        const enableDnd = () => {
            this.dndIdleId = null;
            this.dndTimeoutId = null;
            this.dndReady = true;
        };

        if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
            this.dndIdleId = window.requestIdleCallback(enableDnd, { timeout: 1200 });
        } else {
            this.dndTimeoutId = setTimeout(enableDnd, 250);
        }
    }

    private cancelDndHydration(): void {
        if (this.dndIdleId !== null && typeof window !== 'undefined' && typeof window.cancelIdleCallback === 'function') {
            window.cancelIdleCallback(this.dndIdleId);
            this.dndIdleId = null;
        }

        if (this.dndTimeoutId !== null) {
            clearTimeout(this.dndTimeoutId);
            this.dndTimeoutId = null;
        }
    }

    private syncDndSortables(): void {
        if (this.dndController.isSessionActive) {
            return;
        }

        const signature = `${this.internalRows.map((row) => String(row._id)).join('\0')}|${this.disabled ? '1' : '0'}`;
        if (signature === this.dndRowSignature && this.dndController.isActive) {
            return;
        }

        // Placeholder clones strip data-row-id; keep the :not guard for safety.
        const rows = [...this.renderRoot.querySelectorAll<HTMLTableRowElement>(
            'tr[data-row-id]:not([data-pk-dnd-placeholder])',
        )];
        this.dndController.sync(
            rows.map((row) => ({
                id: row.dataset.rowId ?? '',
                element: row,
                // Light-DOM span (v1) — pk-button shadow clicks otherwise hit PointerSensor's 200ms delay.
                handle: row.querySelector<HTMLElement>('.action-handle') ?? undefined,
            })).filter((row) => row.id !== ''),
            this.disabled,
        );
        this.dndRowSignature = signature;
    }

    private getCellErrors(rowIndex: number, columnName: string): string[] {
        const prefixed = this.fieldName
            ? this.cellErrors?.[`${this.fieldName}.${rowIndex}.${columnName}`]
            : undefined;
        const bare = this.cellErrors?.[`${rowIndex}.${columnName}`];
        const errors = prefixed ?? bare;

        if (!errors) {
            return [];
        }

        return Array.isArray(errors) ? errors.map(String) : [String(errors)];
    }

    private readValueFromEvent(event: Event): string {
        const detail = (event as CustomEvent<{ value?: unknown }>).detail;
        if (detail && 'value' in detail) {
            return String(detail.value ?? '');
        }

        return String((event.target as { value?: unknown }).value ?? '');
    }

    private readCheckedFromEvent(event: Event): boolean {
        const detail = (event as CustomEvent<{ checked?: unknown }>).detail;
        if (detail && 'checked' in detail) {
            return Boolean(detail.checked);
        }

        return Boolean((event.target as { checked?: unknown }).checked);
    }

    private renderOptionElements(column: PkEditableTableColumn): TemplateResult[] {
        return normalizeOptions(column.options).map((option) => {
            return html`<pk-option value=${option.value}>${option.label}</pk-option>`;
        });
    }

    private renderSelectLike(
        column: PkEditableTableColumn,
        value: unknown,
        rowIndex: number,
        invalid: boolean,
        { combobox = false }: { combobox?: boolean } = {},
    ): TemplateResult {
        const current = String(value ?? '');

        if (combobox) {
            return html`<pk-combobox
                class="cell-pk-control"
                size="sm"
                width="full"
                allow-custom-value
                .value=${current}
                placeholder=${column.placeholder ?? ''}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @pk-change=${(event: Event) => {
                    this.updateCell(rowIndex, column, this.readValueFromEvent(event));
                }}
            >
                ${this.renderOptionElements(column)}
            </pk-combobox>`;
        }

        // size=xs matches v1 EditableTable SelectInput — sm (~34px) fills the row and
        // looks flush against the gridlines. Adjacent toolbar selects outside the table
        // (conditions Show/All, Field picker) stay size=sm on their own.
        return html`<pk-select
            class="cell-pk-control"
            size="xs"
            width="full"
            .value=${current}
            placeholder=${column.placeholder ?? ''}
            ?disabled=${this.disabled}
            ?invalid=${invalid}
            aria-label=${column.label ?? column.name}
            @pk-change=${(event: Event) => {
                this.updateCell(rowIndex, column, this.readValueFromEvent(event));
            }}
        >
            ${this.renderOptionElements(column)}
        </pk-select>`;
    }

    private renderCell(
        column: PkEditableTableColumn,
        row: PkEditableTableRow,
        rowIndex: number,
        invalid: boolean,
    ): TemplateResult {
        const value = row[column.name];
        const type: PkEditableTableColumnType = column.type ?? 'text';
        const onInput = (event: Event) => {
            this.updateCell(
                rowIndex,
                column,
                this.readValueFromEvent(event),
            );
        };

        if (isCustomColumn(column)) {
            // Light-DOM projection — frameworks fill `slot={getCustomCellSlotName(rowId, name)}`.
            return html`<div class="cell-slot">
                <slot name=${getCustomCellSlotName(String(row._id), column.name)}></slot>
            </div>`;
        }

        if (type === 'heading') {
            return html`<div class="cell-static cell-heading">${String(value ?? '')}</div>`;
        }

        if (type === 'label') {
            return html`<div class="cell-static">${String(value ?? '')}</div>`;
        }

        if (type === 'textarea') {
            return html`<pk-textarea
                class="cell-pk-control"
                fit-cell
                size="sm"
                rows="1"
                .value=${String(value ?? '')}
                placeholder=${column.placeholder ?? nothing}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @input=${onInput}
            ></pk-textarea>`;
        }

        if (type === 'date') {
            return html`<pk-date-picker
                class="cell-pk-control"
                size="sm"
                width="full"
                .value=${String(value ?? '')}
                placeholder=${column.placeholder ?? ''}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @pk-change=${(event: Event) => {
                    this.updateCell(rowIndex, column, this.readValueFromEvent(event));
                }}
            ></pk-date-picker>`;
        }

        if (type === 'time') {
            return html`<pk-time-picker
                class="cell-pk-control"
                size="sm"
                width="full"
                .value=${String(value ?? '')}
                placeholder=${column.placeholder ?? ''}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @pk-change=${(event: Event) => {
                    this.updateCell(rowIndex, column, this.readValueFromEvent(event));
                }}
            ></pk-time-picker>`;
        }

        if (type === 'number' || type === 'email' || type === 'url') {
            return html`<pk-input
                class="cell-pk-control"
                fit-cell
                size="xs"
                type=${type}
                .value=${String(value ?? '')}
                placeholder=${column.placeholder ?? nothing}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @input=${onInput}
            ></pk-input>`;
        }

        if (type === 'select') {
            return this.renderSelectLike(column, value, rowIndex, invalid);
        }

        if (type === 'combobox') {
            return this.renderSelectLike(column, value, rowIndex, invalid, { combobox: true });
        }

        if (type === 'checkbox') {
            return html`<div class="cell-check">
                <pk-checkbox
                    aria-label=${column.label ?? column.name}
                    .checked=${Boolean(value)}
                    ?disabled=${this.disabled}
                    ?invalid=${invalid}
                    @pk-change=${(event: Event) => {
                        this.updateCell(rowIndex, column, this.readCheckedFromEvent(event));
                    }}
                ></pk-checkbox>
            </div>`;
        }

        if (type === 'radio') {
            return html`<div class="cell-check">
                <pk-checkbox
                    aria-label=${column.label ?? column.name}
                    .checked=${Boolean(value)}
                    ?disabled=${this.disabled}
                    ?invalid=${invalid}
                    @pk-change=${(event: Event) => {
                        // Radio columns intentionally use checkbox chrome, but the
                        // update path below remains exclusive across rows.
                        this.updateCell(rowIndex, column, this.readCheckedFromEvent(event));
                    }}
                ></pk-checkbox>
            </div>`;
        }

        if (type === 'lightswitch') {
            return html`<div class="cell-check cell-check--switch">
                <pk-lightswitch
                    size="sm"
                    aria-label=${column.label ?? column.name}
                    .checked=${Boolean(value)}
                    ?disabled=${this.disabled}
                    ?invalid=${invalid}
                    @pk-change=${(event: Event) => {
                        this.updateCell(rowIndex, column, this.readCheckedFromEvent(event));
                    }}
                ></pk-lightswitch>
            </div>`;
        }

        if (type === 'color') {
            return html`<pk-color-input
                class="cell-pk-control"
                fit-cell
                size="xs"
                .value=${String(value ?? '')}
                ?disabled=${this.disabled}
                ?invalid=${invalid}
                aria-label=${column.label ?? column.name}
                @pk-change=${(event: Event) => {
                    this.updateCell(rowIndex, column, this.readValueFromEvent(event));
                }}
            ></pk-color-input>`;
        }

        // text | handle | value | default
        return html`<pk-input
            class="cell-pk-control"
            fit-cell
            size="xs"
            type="text"
            ?mono=${type === 'handle' || type === 'value'}
            .value=${String(value ?? '')}
            placeholder=${column.placeholder ?? nothing}
            ?disabled=${this.disabled}
            ?invalid=${invalid}
            aria-label=${column.label ?? column.name}
            @input=${onInput}
        ></pk-input>`;
    }

    private renderExtraMenuItems(row: PkEditableTableRow, rowIndex: number): TemplateResult | typeof nothing {
        const items = this.resolveRowMenuItems(row, rowIndex);
        if (items.length === 0) {
            return nothing;
        }

        return html`${items.map((item) => {
            const iconHtml = startIconHtml(item.icon);
            return html`<pk-dropdown-item
                type=${item.type ?? 'normal'}
                value=${item.value ?? item.action ?? ''}
                radio-group=${item.radioGroup ?? nothing}
                ?checked=${Boolean(item.checked)}
                ?disabled=${this.disabled || Boolean(item.disabled)}
                @click=${() => {
                    if (this.disabled || item.disabled) {
                        return;
                    }

                    this.dispatchEvent(new CustomEvent<{
                        rowIndex: number;
                        row: PkEditableTableRow;
                        item: PkEditableTableRowMenuItem;
                        action: string;
                        value: string;
                    }>('pk-row-menu-select', {
                        detail: {
                            rowIndex,
                            row,
                            item,
                            action: String(item.action ?? item.value ?? ''),
                            value: String(item.value ?? ''),
                        },
                        bubbles: true,
                        composed: true,
                    }));
                }}
            >
                ${iconHtml ? unsafeHTML(iconHtml) : nothing}
                ${item.label}
            </pk-dropdown-item>`;
        })}`;
    }

    private renderRow(row: PkEditableTableRow, rowIndex: number): TemplateResult {
        const columns = this.validColumns;
        const rowCount = this.internalRows.length;
        const rowId = String(row._id);
        const rowMod = this.resolveRowModifier(row, rowIndex);
        const extraMenuItems = this.resolveRowMenuItems(row, rowIndex);
        const showRowMenu = this.allowReorder || extraMenuItems.length > 0;

        return html`<tr
            data-row-id=${rowId}
            data-tone=${rowMod.tone || nothing}
            class=${rowMod.class
                ? classMap(Object.fromEntries(rowMod.class.split(/\s+/).filter(Boolean).map((token) => [token, true])))
                : nothing}
            title=${rowMod.title || nothing}
        >
            ${columns.map((column) => {
                const resolved = this.resolveColumn(row, column, rowIndex);
                const errors = this.getCellErrors(rowIndex, column.name);
                const columnClass = resolved.class || column.class || '';
                return html`<td
                    class=${classMap({
                        thin: isThinColumn(resolved),
                        'has-error': errors.length > 0,
                        ...(columnClass
                            ? Object.fromEntries(columnClass.split(/\s+/).filter(Boolean).map((token) => [token, true]))
                            : {}),
                    })}
                    style=${resolved.width || column.width ? `width: ${resolved.width || column.width}` : nothing}
                    title=${errors.length ? errors.join('\n') : nothing}
                >
                    ${this.renderCell(resolved, row, rowIndex, errors.length > 0)}
                </td>`;
            })}
            ${this.showActionsColumn
                ? html`<td class="actions">
                    <div class="row-actions">
                        ${this.allowReorder
                            ? html`
                                <span
                                    class=${classMap({
                                        'action-handle': true,
                                        'is-pending': !this.dndReady,
                                    })}
                                >
                                    <pk-button
                                        type="button"
                                        class="action-btn"
                                        variant="none"
                                        size="xs"
                                        aria-label="Reorder row"
                                        ?disabled=${this.disabled || !this.dndReady}
                                        title=${!this.dndReady && !this.disabled ? 'Preparing drag…' : nothing}
                                    >${unsafeHTML(START_GRIP_ICON)}</pk-button>
                                </span>`
                            : nothing}
                        ${showRowMenu
                            ? html`<pk-dropdown-menu size="sm" placement="bottom-end" side-offset="2">
                                    <pk-button
                                        slot="trigger"
                                        type="button"
                                        class="action-btn"
                                        variant="none"
                                        size="xs"
                                        aria-label="Row actions"
                                        ?disabled=${this.disabled}
                                    >${unsafeHTML(START_ELLIPSIS_ICON)}</pk-button>
                                    ${this.renderExtraMenuItems(row, rowIndex)}
                                    ${this.allowReorder
                                        ? html`
                                            <pk-dropdown-item
                                                ?disabled=${this.disabled || rowIndex === 0}
                                                @click=${() => { this.moveRow(rowIndex, -1); }}
                                            >
                                                ${unsafeHTML(START_ARROW_UP_ICON)}
                                                Move up
                                            </pk-dropdown-item>
                                            <pk-dropdown-item
                                                ?disabled=${this.disabled || rowIndex === rowCount - 1}
                                                @click=${() => { this.moveRow(rowIndex, 1); }}
                                            >
                                                ${unsafeHTML(START_ARROW_DOWN_ICON)}
                                                Move down
                                            </pk-dropdown-item>`
                                        : nothing}
                                </pk-dropdown-menu>`
                            : nothing}
                        ${this.allowDelete
                            ? html`<pk-button
                                type="button"
                                class="action-btn action-delete"
                                variant="none"
                                size="xs"
                                aria-label="Delete row"
                                ?disabled=${this.disabled}
                                @click=${() => { this.removeRow(rowIndex); }}
                            >${unsafeHTML(START_XMARK_ICON)}</pk-button>`
                            : nothing}
                    </div>
                </td>`
                : nothing}
        </tr>`;
    }

    override render(): TemplateResult {
        const columns = this.validColumns;

        return html`
            <div
                class="et-scroll"
                @pk-change=${this.stopInnerControlEvent}
                @input=${this.stopInnerControlEvent}
                @change=${this.stopInnerControlEvent}
            >
                <table class="et">
                    <thead>
                        <tr>
                            ${columns.map((column) => {
                                const columnClass = column.class || '';
                                return html`<th
                                    class=${classMap({
                                        thin: isThinColumn(column),
                                        ...(columnClass
                                            ? Object.fromEntries(columnClass.split(/\s+/).filter(Boolean).map((token) => [token, true]))
                                            : {}),
                                    })}
                                    style=${column.width ? `width: ${column.width}` : nothing}
                                >
                                    ${column.label ?? column.name}
                                    ${column.required ? html`<span class="required">*</span>` : nothing}
                                </th>`;
                            })}
                            ${this.showActionsColumn ? html`<th class="actions"></th>` : nothing}
                        </tr>
                    </thead>
                    <tbody>
                        ${repeat(
                            this.internalRows,
                            (row) => String(row._id),
                            (row, index) => this.renderRow(row, index),
                        )}
                    </tbody>
                </table>
            </div>
            ${this.allowAdd
                ? html`<pk-button
                    type="button"
                    class="add-row"
                    variant="dashed"
                    ?disabled=${this.disabled}
                    @click=${() => { this.addRow(); }}
                >
                    ${unsafeHTML(START_PLUS_ICON)}
                    ${this.addRowLabel || 'Add row'}
                </pk-button>`
                : nothing}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-editable-table': PkEditableTable;
    }
}
