import { useState, type CSSProperties } from 'react';

import {
    EditableTable,
    type EditableTableColumn,
    type PkEditableTableRow,
} from '@verbb/plugin-kit-react/components';
import { PlaygroundPage, PlaygroundSection, PreviewCard } from '../shared/playgroundLayouts.js';
import type { SurfacePreviewDefinition } from '../types.js';

const columns: EditableTableColumn[] = [
    { name: 'label', label: 'Label', type: 'text', placeholder: 'Option label', required: true },
    { name: 'value', label: 'Value', type: 'text', placeholder: 'optionValue' },
    {
        name: 'kind',
        label: 'Kind',
        type: 'select',
        placeholder: 'Select…',
        options: [
            { label: 'Text', value: 'text' },
            { label: 'Number', value: 'number' },
            { label: 'Date', value: 'date' },
        ],
    },
    { name: 'colour', label: 'Colour', type: 'color', thin: true },
    { name: 'default', label: 'Default', type: 'lightswitch', thin: true },
];

const initialRows: PkEditableTableRow[] = [
    { label: 'First', value: 'first', kind: 'text', colour: '#e12d39', default: true },
    { label: 'Second', value: 'second', kind: 'number', colour: '#0284c7', default: false },
];

const panelStyle: CSSProperties = {
    marginTop: '16px',
    borderRadius: '8px',
    border: '1px solid var(--pk-color-gray-200, rgb(203 213 225))',
    overflow: 'hidden',
};

const panelHeaderStyle: CSSProperties = {
    padding: '8px 16px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    color: 'var(--pk-color-gray-600, rgb(51 65 85))',
    borderBottom: '1px solid var(--pk-color-gray-200, rgb(203 213 225))',
    background: 'var(--pk-color-gray-50, rgb(248 250 252))',
};

const panelCodeStyle: CSSProperties = {
    margin: 0,
    padding: '14px 16px',
    overflowX: 'auto',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '12px',
    lineHeight: 1.6,
    whiteSpace: 'pre',
};

function ControlledEditableTableDemo() {
    const [rows, setRows] = useState<PkEditableTableRow[]>(initialRows);

    return (
        <div>
            <EditableTable
                columns={columns}
                rows={rows}
                addRowLabel="Add option"
                onChange={setRows}
            />

            <div style={panelStyle}>
                <div style={panelHeaderStyle}>Rows (controlled)</div>
                <pre style={panelCodeStyle}>{JSON.stringify(rows, null, 2)}</pre>
            </div>
        </div>
    );
}

function ExtensionPointsDemo() {
    const [rows, setRows] = useState<PkEditableTableRow[]>([
        { label: 'Visible', note: 'hello', availability: 'visible' },
        { label: 'Hidden', note: 'world', availability: 'hidden' },
    ]);

    const extensionColumns: EditableTableColumn[] = [
        { name: 'label', label: 'Label', type: 'text' },
        {
            name: 'note',
            label: 'Custom note',
            // Forces type:custom + light-DOM projection via the facade.
            renderCell: ({ value, updateValue, isInvalid }) => (
                <input
                    value={String(value ?? '')}
                    aria-invalid={isInvalid || undefined}
                    onChange={(event) => { updateValue(event.target.value); }}
                    style={{
                        width: '100%',
                        height: '36px',
                        border: 0,
                        padding: '0 8px',
                        font: 'inherit',
                        background: isInvalid ? 'rgb(255 241 242)' : 'transparent',
                    }}
                />
            ),
        },
    ];

    return (
        <EditableTable
            columns={extensionColumns}
            rows={rows}
            onChange={setRows}
            modifyRow={(row) => {
                if (row.availability === 'hidden') {
                    return { tone: 'warning', title: 'Hidden' };
                }

                return null;
            }}
            getRowMenuItems={(row) => {
                const current = String(row.availability ?? 'visible');
                return [
                    {
                        type: 'radio',
                        radioGroup: 'availability',
                        value: 'visible',
                        label: 'Visible',
                        checked: current === 'visible',
                        action: 'availability',
                    },
                    {
                        type: 'radio',
                        radioGroup: 'availability',
                        value: 'hidden',
                        label: 'Hidden',
                        checked: current === 'hidden',
                        action: 'availability',
                    },
                ];
            }}
            onRowMenuSelect={({ rowIndex, value, action }) => {
                if (action !== 'availability') {
                    return;
                }

                setRows((prev) => prev.map((row, index) => (
                    index === rowIndex ? { ...row, availability: value } : row
                )));
            }}
        />
    );
}

function EditableTablePreviewPage() {
    return (
        <PlaygroundPage
            eyebrow="Workshop"
            title="EditableTable"
            description="React facade over <pk-editable-table>: inline cell editing, add/delete rows, and drag / arrow reorder. Extension points: renderCell (light-DOM slots), getRowMenuItems + onRowMenuSelect, modifyRow / modifyColumn."
        >
            <PlaygroundSection
                title="Controlled"
                description="columns[] + rows[] with onChange driving React state. Try editing cells, reordering via the handle or arrows, and adding/removing rows."
            >
                <PreviewCard>
                    <ControlledEditableTableDemo />
                </PreviewCard>
            </PlaygroundSection>

            <PlaygroundSection
                title="Extension points"
                description="Custom cell via renderCell (projected into a named slot), row chrome via modifyRow, and descriptor-based ellipsis extras via getRowMenuItems."
            >
                <PreviewCard>
                    <ExtensionPointsDemo />
                </PreviewCard>
            </PlaygroundSection>

            <PlaygroundSection
                title="Read-only affordances off"
                description="allowAdd / allowDelete / allowReorder toggle the row controls."
            >
                <PreviewCard>
                    <EditableTable
                        columns={columns}
                        rows={initialRows}
                        allowAdd={false}
                        allowDelete={false}
                        allowReorder={false}
                    />
                </PreviewCard>
            </PlaygroundSection>
        </PlaygroundPage>
    );
}

export const editableTablePreview: SurfacePreviewDefinition = {
    id: 'editable-table',
    title: 'EditableTable',
    Component: EditableTablePreviewPage,
};
