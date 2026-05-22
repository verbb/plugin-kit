import { useRef, useState } from 'react';
import { EditableTable } from '@verbb/plugin-kit-react/components';
import { VisualTestPage, VisualTestSection, VisualTestCard } from '../shared/visualTestLayouts';
import type { VisualTestDefinition } from '../types';

function PerformanceTable() {
    const columns = Array.from({ length: 8 }, (_, i) => ({
        name: `col${i + 1}`,
        label: `Col ${i + 1}`,
        type: 'text',
    }));

    const initialRows = Array.from({ length: 100 }, (_, i) => ({
        col1: i === 0 ? 'Row 1' : '',
        col2: i === 0 ? 'Seed' : '',
        col3: '',
        col4: '',
        col5: '',
        col6: '',
        col7: '',
        col8: '',
    }));

    const [rows, setRows] = useState(initialRows);
    const renderCountRef = useRef(0);
    renderCountRef.current += 1;

    return (
        <div className="space-y-3">
            <div className="text-xs text-gray-600">
                100 rows x 8 text columns. Render count: <strong>{renderCountRef.current}</strong>
            </div>
            <EditableTable columns={columns} rows={rows} onChange={setRows} addRowLabel="Add row" />
        </div>
    );
}

function OverflowTable() {
    const columns = [
        { name: 'text1', label: 'Text', type: 'text', required: true, width: '120px' },
        { name: 'text2', label: 'Text 2', type: 'text', width: '120px' },
        { name: 'heading', label: 'Heading', type: 'heading', width: '100px' },
        { name: 'label', label: 'Label', type: 'label', width: '100px' },
        {
            name: 'select1',
            label: 'Select',
            type: 'select',
            width: '120px',
            options: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c' },
            ],
        },
        { name: 'textarea1', label: 'Textarea', type: 'textarea', width: '160px' },
        { name: 'checkbox1', label: 'Check', type: 'checkbox', width: '70px' },
        { name: 'radio1', label: 'Radio', type: 'radio', width: '70px' },
        { name: 'lightswitch1', label: 'Switch', type: 'lightswitch', width: '90px' },
        { name: 'handle', label: 'Handle', type: 'handle', source: 'text1', width: '120px' },
        { name: 'value', label: 'Value', type: 'value', source: 'text1', width: '120px' },
        { name: 'color1', label: 'Color', type: 'color', width: '100px' },
        { name: 'date1', label: 'Date', type: 'date', width: '130px' },
        { name: 'time1', label: 'Time', type: 'time', width: '100px' },
        { name: 'email1', label: 'Email', type: 'email', width: '180px' },
        { name: 'url1', label: 'URL', type: 'url', width: '180px' },
        { name: 'number1', label: 'Num', type: 'number', width: '90px' },
    ];

    const [rows, setRows] = useState([
        {
            text1: 'Row 1',
            text2: 'Sample',
            heading: 'Section',
            label: 'Read-only',
            select1: 'a',
            textarea1: 'Some text',
            checkbox1: true,
            radio1: true,
            lightswitch1: true,
            handle: 'row1',
            value: 'Row 1',
            color1: '#8b5cf6',
            date1: '2026-01-27',
            time1: '09:30',
            email1: 'one@example.com',
            url1: 'https://example.com',
            number1: 42,
        },
        {
            text1: 'Row 2',
            text2: 'Other',
            heading: 'Details',
            label: 'Static',
            select1: 'b',
            textarea1: '',
            checkbox1: false,
            radio1: false,
            lightswitch1: false,
            handle: 'row2',
            value: 'Row 2',
            color1: '#10b981',
            date1: '2026-03-01',
            time1: '12:00',
            email1: 'hello@test.com',
            url1: 'https://test.com',
            number1: 0,
        },
    ]);

    return (
        <div className="overflow-x-auto rounded-md border border-gray-200">
            <EditableTable columns={columns} rows={rows} onChange={setRows} addRowLabel="Add row" />
        </div>
    );
}

function HandleManyRowsTable() {
    const columns = [
        { name: 'label', label: 'Label', type: 'text', required: true },
        {
            name: 'handle',
            label: 'Handle',
            type: 'handle',
            source: 'label',
        },
    ];

    const initialRows = Array.from({ length: 100 }, (_, i) => {
        let label = '';
        let handle = '';
        if (i === 0) {
            label = 'First';
            handle = 'first';
        } else if (i === 1) {
            label = 'Second';
            handle = 'second';
        }

        return { label, handle };
    });

    const [rows, setRows] = useState(initialRows);

    return (
        <EditableTable columns={columns} rows={rows} onChange={setRows} addRowLabel="Add row" />
    );
}

function EditableTableVisualTestPage() {
    return (
        <VisualTestPage
            eyebrow="Visual Tests"
            title="EditableTable"
            description="Regression coverage for the heavy table cases: typing performance, handle syncing, and horizontal overflow."
            maxWidth="1400px"
        >
            <VisualTestSection
                title="Performance Benchmark"
                description="Use this when changing row state management, derived fields, or cell rendering behavior."
            >
                <VisualTestCard>
                    <PerformanceTable />
                </VisualTestCard>
            </VisualTestSection>

            <VisualTestSection
                title="Derived-Field Scaling"
                description="This checks that source-driven handle generation stays responsive with many rows."
            >
                <VisualTestCard>
                    <HandleManyRowsTable />
                </VisualTestCard>
            </VisualTestSection>

            <VisualTestSection
                title="Overflow Stress"
                description="Wide column mixes should still render correctly and remain horizontally scrollable."
            >
                <VisualTestCard>
                    <OverflowTable />
                </VisualTestCard>
            </VisualTestSection>
        </VisualTestPage>
    );
}

export const editableTableVisualTest: VisualTestDefinition = {
    id: 'editable-table',
    title: 'EditableTable',
    description: 'Regression coverage for the heavy table cases: typing performance, handle syncing, and horizontal overflow.',
    Component: EditableTableVisualTestPage,
};
