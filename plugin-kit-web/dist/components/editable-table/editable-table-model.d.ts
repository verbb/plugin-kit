/**
 * Shared types and pure helpers for `<pk-editable-table>`.
 * Kept free of Lit so facades and tests can reuse the same shapes.
 */
export type PkEditableTableColumnType = 'text' | 'textarea' | 'number' | 'email' | 'url' | 'select' | 'combobox' | 'checkbox' | 'radio' | 'lightswitch' | 'color' | 'date' | 'time' | 'heading' | 'label' | 'handle' | 'value'
/** Light-DOM projection via named slot — see `getCustomCellSlotName`. */
 | 'custom';
export interface PkEditableTableOption {
    label: string;
    value: string;
}
export interface PkEditableTableColumn {
    name: string;
    type?: PkEditableTableColumnType;
    label?: string;
    required?: boolean;
    placeholder?: string;
    /** Explicit CSS width for the column (e.g. `120px`, `20%`). */
    width?: string;
    /** Narrow, content-width column (defaults on for checkbox/lightswitch/radio). */
    thin?: boolean;
    /**
     * Extra class names on `<th>` / `<td>` (space-separated).
     * Prefer over framework-specific `className` — facades can map.
     */
    class?: string;
    options?: Array<PkEditableTableOption | string>;
    /**
     * For `handle` / `value` columns: derive from this source column while the
     * cell is empty / auto-filled. Manual edits stick until cleared.
     */
    source?: string;
    /** Radio columns: allow clearing the selected row (otherwise one must stay on). */
    allowUnselect?: boolean;
}
export type PkEditableTableRow = Record<string, unknown> & {
    _id?: string;
};
/**
 * Descriptor for an extra row-menu item (rendered inside the ellipsis menu).
 * Nested host→menu slots cannot feed `pk-dropdown-menu` light DOM, so extras
 * stay data-driven; frameworks handle product logic via `pk-row-menu-select`.
 */
export interface PkEditableTableRowMenuItem {
    label: string;
    type?: 'normal' | 'radio' | 'checkbox';
    value?: string;
    radioGroup?: string;
    checked?: boolean;
    disabled?: boolean;
    /** Echoed on `pk-row-menu-select` so consumers can branch without parsing labels. */
    action?: string;
    /** Kit icon registry name (e.g. `gear`) — rendered as `slot="start"`. */
    icon?: string;
}
export interface PkEditableTableRowModifier {
    /** Space-separated class names applied to the `<tr>`. */
    class?: string;
    /** Native `title` on the `<tr>` (tooltip). */
    title?: string;
    /**
     * Semantic row chrome styled inside the CE (host Tailwind cannot reach shadow `<tr>`).
     * `warning` ≈ amber highlight; `muted` ≈ slate/disabled highlight.
     */
    tone?: 'warning' | 'muted';
}
export type PkEditableTableModifyColumn = (row: PkEditableTableRow, columnName: string, column: PkEditableTableColumn, rowIndex: number) => Partial<PkEditableTableColumn> | null | undefined;
export type PkEditableTableModifyRow = (row: PkEditableTableRow, rowIndex: number) => PkEditableTableRowModifier | null | undefined;
export type PkEditableTableGetRowMenuItems = (row: PkEditableTableRow, rowIndex: number) => PkEditableTableRowMenuItem[] | null | undefined;
export declare const GENERATED_CELL_MODE: {
    readonly EMPTY: "empty";
    readonly AUTO: "auto";
    readonly MANUAL: "manual";
    readonly SEEDED: "seeded";
};
export type GeneratedCellMode = (typeof GENERATED_CELL_MODE)[keyof typeof GENERATED_CELL_MODE];
export declare const isGeneratedColumn: (column: PkEditableTableColumn) => boolean;
export declare const isThinColumn: (column: PkEditableTableColumn) => boolean;
export declare const isEmptyCellValue: (value: unknown) => boolean;
export declare const getGeneratedCellKey: (rowId: string, columnName: string) => string;
export declare const normalizeOptions: (options: PkEditableTableColumn["options"]) => PkEditableTableOption[];
export declare const defaultValueForColumn: (column: PkEditableTableColumn) => unknown;
/**
 * Craft-free handle slug for derived `handle` columns.
 * Mirrors the camelCase path of `@verbb/plugin-kit-core` `generateHandle` without `window.Craft`.
 */
export declare const generateHandle: (sourceValue: string) => string;
export declare const nextRowId: () => string;
/** Named slot for a `type: 'custom'` cell — light-DOM projection into the `<td>`. */
export declare const getCustomCellSlotName: (rowId: string, columnName: string) => string;
export declare const BUILTIN_COLUMN_TYPES: Set<string>;
export declare const isCustomColumn: (column: PkEditableTableColumn) => boolean;
//# sourceMappingURL=editable-table-model.d.ts.map