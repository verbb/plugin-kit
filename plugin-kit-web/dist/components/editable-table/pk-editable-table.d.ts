import { PropertyValues, TemplateResult } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { PkEditableTableColumn, PkEditableTableGetRowMenuItems, PkEditableTableModifyColumn, PkEditableTableModifyRow, PkEditableTableRow } from './editable-table-model.js';
export type { PkEditableTableColumn, PkEditableTableColumnType, PkEditableTableGetRowMenuItems, PkEditableTableModifyColumn, PkEditableTableModifyRow, PkEditableTableOption, PkEditableTableRow, PkEditableTableRowMenuItem, PkEditableTableRowModifier, } from './editable-table-model.js';
export { getCustomCellSlotName, isCustomColumn, nextRowId, } from './editable-table-model.js';
/**
 * Editable table — inline-editable rows with add/delete and drag/keyboard reorder.
 * Form-associated: submits a JSON array of row objects (internal `_id`s stripped).
 *
 * Canonical composite; framework facades wrap this rather than reimplementing the table.
 * Cell controls compose the same `pk-*` primitives exposed to consumers so the web
 * component keeps v1/Craft feel while owning the canonical table behaviour.
 */
export declare class PkEditableTable extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult;
    static get validators(): import('../../index.js').PkValidator[];
    columns: PkEditableTableColumn[];
    rows: PkEditableTableRow[];
    allowAdd: boolean;
    allowDelete: boolean;
    allowReorder: boolean;
    addRowLabel: string;
    /**
     * Optional form-field prefix for `cellErrors` keys.
     * Looks up `${fieldName}.${rowIndex}.${columnName}` then falls back to `${rowIndex}.${columnName}`.
     */
    fieldName: string;
    /** Errors keyed by `${rowIndex}.${columnName}` or `${fieldName}.${rowIndex}.${columnName}`. */
    cellErrors: Record<string, string[] | string>;
    /** Merged into each newly added row after column defaults. */
    newRowDefaults: Record<string, unknown>;
    /**
     * Per-cell column override (e.g. swap value column to a select based on another cell).
     * Return a partial column merged over the base definition for that render.
     */
    modifyColumn: PkEditableTableModifyColumn | null;
    /** Per-row chrome — class/title on the `<tr>` (availability highlights, etc.). */
    modifyRow: PkEditableTableModifyRow | null;
    /**
     * Extra ellipsis-menu items for a row (data descriptors — not React nodes).
     * Selection fires `pk-row-menu-select` with `{ rowIndex, row, item, action, value }`.
     */
    getRowMenuItems: PkEditableTableGetRowMenuItems | null;
    private internalRows;
    /**
     * Deferred drag binding. Grips render immediately but stay inactive until idle
     * so large tables don't pay pointer-listener setup on first paint.
     */
    private dndReady;
    /** Per-cell mode for generated handle/value columns (`rowId:columnName` → mode). */
    private generatedCellModes;
    private dndController;
    private dndIdleId;
    private dndTimeoutId;
    /** Skip drag rebinding when row identity/order is unchanged (typing shouldn't resync 195 rows). */
    private dndRowSignature;
    protected willUpdate(changed: PropertyValues): void;
    protected firstUpdated(changed: PropertyValues): void;
    protected shouldUpdate(changed: PropertyValues): boolean;
    updated(changed: PropertyValues): void;
    disconnectedCallback(): void;
    /** Serialized rows, used for form submission and required validation (empty when no rows). */
    get value(): string;
    private get validColumns();
    private get generatedColumns();
    private get showActionsColumn();
    private cleanRows;
    /**
     * Public cell write path for slotted / framework-projected custom cells.
     * Prefer this over mutating `rows` locally so generated columns + events stay in sync.
     */
    setCellValue(rowIndex: number, columnName: string, value: unknown): void;
    private resolveColumn;
    private resolveRowModifier;
    private resolveRowMenuItems;
    private syncGeneratedModesFromRows;
    protected syncFormValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
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
    private stopInnerControlEvent;
    private emitChange;
    private emitCellChange;
    private commitRows;
    private updateCell;
    private addRow;
    private removeRow;
    private moveRow;
    private commitReorder;
    /**
     * Apply DOM-seated order after pointer drag. Uses stable `_id`s so a floated
     * source row left in the tbody can't skew from/to index arithmetic — and so a
     * cancelled drag that briefly moved the placeholder can't desync data vs DOM.
     */
    private commitReorderByIds;
    private scheduleDndHydration;
    private cancelDndHydration;
    private syncDndSortables;
    private getCellErrors;
    private readValueFromEvent;
    private readCheckedFromEvent;
    private renderOptionElements;
    private renderSelectLike;
    private renderCell;
    private renderExtraMenuItems;
    private renderRow;
    render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-editable-table': PkEditableTable;
    }
}
//# sourceMappingURL=pk-editable-table.d.ts.map