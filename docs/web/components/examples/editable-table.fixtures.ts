import type {
    PkEditableTable,
    PkEditableTableColumn,
    PkEditableTableRow,
} from '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';

export type EditableTableDemo = {
    addRowLabel: string;
    columns: PkEditableTableColumn[];
    rows: PkEditableTableRow[];
    fieldName?: string;
    cellErrors?: Record<string, string[] | string>;
};

/** Shared Editable Table demos — docs web previews + playground. */
export const editableTableMixedFieldTypes: EditableTableDemo = {
    addRowLabel: 'Add row',
    columns: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'heading', label: 'Heading', type: 'heading' },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            width: '140px',
            options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Tertiary', value: 'tertiary' },
            ],
        },
        { name: 'checkbox', label: 'Checkbox', type: 'checkbox', width: '80px' },
        { name: 'lightswitch', label: 'Lightswitch', type: 'lightswitch', width: '110px' },
        { name: 'color', label: 'Color', type: 'color', width: '110px' },
        { name: 'date', label: 'Date', type: 'date', width: '140px' },
        { name: 'time', label: 'Time', type: 'time', width: '120px' },
        { name: 'email', label: 'Email', type: 'email', width: '200px' },
        { name: 'url', label: 'URL', type: 'url', width: '200px' },
        { name: 'number', label: 'Number', type: 'number', width: '110px' },
        { name: 'notes', label: 'Notes', type: 'textarea', width: '220px' },
    ],
    rows: [
        {
            name: 'First Name',
            heading: 'Basic',
            category: 'primary',
            checkbox: true,
            lightswitch: true,
            color: '#8b5cf6',
            date: '2026-01-27',
            time: '09:30',
            email: 'hello@example.com',
            url: 'https://example.com',
            number: 3,
            notes: '',
        },
        {
            name: 'Age',
            heading: 'Details',
            category: 'secondary',
            checkbox: false,
            lightswitch: false,
            color: '#f97316',
            date: '2026-02-14',
            time: '17:15',
            email: 'team@example.com',
            url: 'https://verbb.io',
            number: 42,
            notes: 'Optional',
        },
    ],
};

export const editableTableCellValidation: EditableTableDemo = {
    addRowLabel: 'Add row',
    fieldName: 'demoTable',
    columns: [
        { name: 'name', label: 'Name', type: 'text', required: true, width: '180px' },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            width: '140px',
            options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
            ],
        },
        { name: 'color', label: 'Color', type: 'color', width: '110px' },
        { name: 'date', label: 'Date', type: 'date', width: '140px' },
        { name: 'time', label: 'Time', type: 'time', width: '120px' },
        { name: 'email', label: 'Email', type: 'email', width: '200px' },
        { name: 'notes', label: 'Notes', type: 'textarea', width: '220px' },
    ],
    rows: [
        {
            name: '',
            category: '',
            color: '#a9',
            date: '',
            time: '',
            email: 'not-an-email',
            notes: '',
        },
        {
            name: 'Valid Row',
            category: 'primary',
            color: '#35e533',
            date: '2026-02-14',
            time: '09:30',
            email: 'team@example.com',
            notes: 'No errors on this row.',
        },
    ],
    cellErrors: {
        'demoTable.0.name': ['Name is required.'],
        'demoTable.0.category': ['Category is required.'],
        'demoTable.0.color': ['Enter a valid 3 or 6 digit hex color.'],
        'demoTable.0.date': ['Date is required.'],
        'demoTable.0.time': ['Time is required.'],
        'demoTable.0.email': ['Enter a valid email address.'],
        'demoTable.0.notes': ['Notes are required for this example.'],
    },
};

export const editableTableDerivedColumns: EditableTableDemo = {
    addRowLabel: 'Add row',
    columns: [
        { name: 'label', label: 'Label', type: 'text', required: true },
        {
            name: 'handle',
            label: 'Handle',
            type: 'handle',
            source: 'label',
            placeholder: 'Auto from label',
        },
        {
            name: 'value',
            label: 'Value (exact copy)',
            type: 'value',
            source: 'label',
            placeholder: 'Auto from label',
        },
    ],
    rows: [
        { label: '', handle: '', value: '' },
        { label: 'My First Row', handle: '', value: '' },
        { label: 'Another Option', handle: 'anotherOption', value: 'Another Option' },
    ],
};

export const editableTableCompactSelection = {
    addRowLabel: 'Add an option',
    thin: {
        columns: [
            { name: 'label', label: 'Option Label', type: 'text', required: true },
            { name: 'value', label: 'Value', type: 'text' },
            { name: 'isDefault', label: 'Default', type: 'checkbox', thin: true },
            { name: 'isDisabled', label: 'Disabled', type: 'checkbox', thin: true },
        ] satisfies PkEditableTableColumn[],
        rows: [
            { label: 'Some Label', value: 'Some Label', isDefault: false, isDisabled: false },
            { label: 'More Label', value: 'More Label', isDefault: false, isDisabled: false },
        ] satisfies PkEditableTableRow[],
    },
    radio: {
        columns: [
            { name: 'label', label: 'Option Label', type: 'text', required: true },
            { name: 'value', label: 'Value', type: 'text' },
            { name: 'isDefault', label: 'Default (allow unselect)', type: 'radio', allowUnselect: true },
            { name: 'isDisabled', label: 'Disabled', type: 'checkbox' },
        ] satisfies PkEditableTableColumn[],
        rows: [
            { label: 'Select an option', value: 'Select an option', isDefault: true, isDisabled: true },
            { label: 'Option 1', value: 'Option 1', isDefault: false, isDisabled: true },
            { label: 'Option 2', value: 'Option 2', isDefault: false, isDisabled: true },
        ] satisfies PkEditableTableRow[],
    },
} as const;

type EditableTablePreviewSourceOptions = {
    /** Variable name for the element (default `table`). */
    varName?: string;
    /** `document.querySelector(...)` argument (default `pk-editable-table`). */
    selector?: string;
    /** Optional mount markup comment attrs, e.g. `add-row-label="Add row"`. */
    htmlAttrs?: string;
    /** When false, omit the import line (multi-table examples share one import). */
    includeImport?: boolean;
};

/**
 * Copyable docs source for web previews. Live markup stays a mount shell; columns /
 * rows are JS properties, so falling back to `html` alone omits the real example.
 */
export function editableTablePreviewSource(
    demo: EditableTableDemo,
    options: EditableTablePreviewSourceOptions = {},
): string {
    const varName = options.varName ?? 'table';
    const selector = options.selector ?? 'pk-editable-table';
    const attrs = options.htmlAttrs ?? '';
    const attrSuffix = attrs ? ` ${attrs.trim()}` : '';
    const lines: string[] = [];

    if (options.includeImport !== false) {
        lines.push(
            `import '@verbb/plugin-kit-web/components/editable-table.js';`,
            '',
        );
    }

    lines.push(
        `const ${varName} = document.querySelector('${selector}');`,
        '',
        `${varName}.columns = ${serializeForPreview(demo.columns)};`,
        `${varName}.rows = ${serializeForPreview(demo.rows)};`,
        `${varName}.addRowLabel = ${JSON.stringify(demo.addRowLabel)};`,
    );

    if (demo.fieldName !== undefined) {
        lines.push(`${varName}.fieldName = ${JSON.stringify(demo.fieldName)};`);
    }

    if (demo.cellErrors !== undefined) {
        lines.push(`${varName}.cellErrors = ${serializeForPreview(demo.cellErrors)};`);
    }

    lines.push(
        '',
        `${varName}.addEventListener('pk-change', (event) => {`,
        `  ${varName}.rows = event.detail.rows;`,
        `});`,
        '',
        `// <pk-editable-table${attrSuffix}></pk-editable-table>`,
    );

    return lines.join('\n');
}

function serializeForPreview(value: unknown, indent = 0): string {
    const pad = '  '.repeat(indent);
    const next = '  '.repeat(indent + 1);

    if (value === null || typeof value !== 'object') {
        return JSON.stringify(value);
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return '[]';
        }

        const items = value.map((item) => `${next}${serializeForPreview(item, indent + 1)},`);
        return `[\n${items.join('\n')}\n${pad}]`;
    }

    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) {
        return '{}';
    }

    const fields = entries.map(([key, entry]) => {
        const safeKey = /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
        return `${next}${safeKey}: ${serializeForPreview(entry, indent + 1)},`;
    });

    return `{\n${fields.join('\n')}\n${pad}}`;
}

/** Bind columns/rows (and optional field errors) onto an existing `<pk-editable-table>`. */
export function bindEditableTable(
    table: PkEditableTable,
    demo: EditableTableDemo,
): void {
    table.columns = demo.columns;
    // Clone rows so controlled updates do not mutate the shared fixture.
    table.rows = demo.rows.map((row) => ({ ...row }));
    table.addRowLabel = demo.addRowLabel;

    if (demo.fieldName !== undefined) {
        table.fieldName = demo.fieldName;
    }

    if (demo.cellErrors !== undefined) {
        table.cellErrors = demo.cellErrors;
    }

    table.addEventListener('pk-change', ((event: CustomEvent<{ rows: PkEditableTableRow[] }>) => {
        table.rows = event.detail.rows;
    }) as EventListener);
}

export function bindEditableTableInRoot(
    root: ParentNode,
    selector: string,
    demo: EditableTableDemo,
): void {
    const table = root.querySelector(selector) as PkEditableTable | null;
    if (table) {
        bindEditableTable(table, demo);
    }
}
