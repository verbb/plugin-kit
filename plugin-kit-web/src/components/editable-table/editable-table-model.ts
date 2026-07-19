/**
 * Shared types and pure helpers for `<pk-editable-table>`.
 * Kept free of Lit so facades and tests can reuse the same shapes.
 */

export type PkEditableTableColumnType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'email'
    | 'url'
    | 'select'
    | 'combobox'
    | 'checkbox'
    | 'radio'
    | 'lightswitch'
    | 'color'
    | 'date'
    | 'time'
    | 'heading'
    | 'label'
    | 'handle'
    | 'value'
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

export type PkEditableTableRow = Record<string, unknown> & { _id?: string };

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

export type PkEditableTableModifyColumn = (
    row: PkEditableTableRow,
    columnName: string,
    column: PkEditableTableColumn,
    rowIndex: number,
) => Partial<PkEditableTableColumn> | null | undefined;

export type PkEditableTableModifyRow = (
    row: PkEditableTableRow,
    rowIndex: number,
) => PkEditableTableRowModifier | null | undefined;

export type PkEditableTableGetRowMenuItems = (
    row: PkEditableTableRow,
    rowIndex: number,
) => PkEditableTableRowMenuItem[] | null | undefined;

export const GENERATED_CELL_MODE = {
    EMPTY: 'empty',
    AUTO: 'auto',
    MANUAL: 'manual',
    SEEDED: 'seeded',
} as const;

export type GeneratedCellMode = (typeof GENERATED_CELL_MODE)[keyof typeof GENERATED_CELL_MODE];

export const isGeneratedColumn = (column: PkEditableTableColumn): boolean => {
    return (column.type === 'handle' || column.type === 'value')
        && Boolean(column.name)
        && Boolean(column.source);
};

export const isThinColumn = (column: PkEditableTableColumn): boolean => {
    return Boolean(
        column.thin
        || column.type === 'checkbox'
        || column.type === 'lightswitch'
        || column.type === 'radio',
    );
};

export const isEmptyCellValue = (value: unknown): boolean => {
    return value === undefined || value === null || value === '';
};

export const getGeneratedCellKey = (rowId: string, columnName: string): string => {
    return `${rowId}:${columnName}`;
};

export const normalizeOptions = (options: PkEditableTableColumn['options']): PkEditableTableOption[] => {
    if (!Array.isArray(options)) {
        return [];
    }

    return options.map((option) => {
        if (typeof option === 'string') {
            return { label: option, value: option };
        }

        return { label: String(option.label ?? option.value ?? ''), value: String(option.value ?? '') };
    });
};

export const defaultValueForColumn = (column: PkEditableTableColumn): unknown => {
    if (column.type === 'checkbox' || column.type === 'lightswitch' || column.type === 'radio') {
        return false;
    }

    return '';
};

/**
 * Craft-free handle slug for derived `handle` columns.
 * Mirrors the camelCase path of `@verbb/plugin-kit-core` `generateHandle` without `window.Craft`.
 */
export const generateHandle = (sourceValue: string): string => {
    const words = sourceValue
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/['"'""[\](){}:]/g, '')
        .split(/[^a-z0-9]+/)
        .filter(Boolean);

    if (words.length === 0) {
        return '';
    }

    return words
        .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join('');
};

let rowIdCounter = 0;

export const nextRowId = (): string => {
    rowIdCounter += 1;
    return `etr_${Date.now().toString(36)}_${rowIdCounter}`;
};

/** Named slot for a `type: 'custom'` cell — light-DOM projection into the `<td>`. */
export const getCustomCellSlotName = (rowId: string, columnName: string): string => {
    return `cell:${rowId}:${columnName}`;
};

export const BUILTIN_COLUMN_TYPES = new Set<string>([
    'text',
    'textarea',
    'number',
    'email',
    'url',
    'select',
    'combobox',
    'checkbox',
    'radio',
    'lightswitch',
    'color',
    'date',
    'time',
    'heading',
    'label',
    'handle',
    'value',
    'custom',
]);

export const isCustomColumn = (column: PkEditableTableColumn): boolean => {
    const type = column.type;
    if (type === 'custom') {
        return true;
    }

    // Unknown / product types (e.g. Formie `variablePicker`) project via custom slots.
    return typeof type === 'string' && !BUILTIN_COLUMN_TYPES.has(type);
};
