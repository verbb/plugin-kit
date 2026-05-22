// #region example
import { useState } from 'react';
import { CheckboxSelect, type CheckboxSelectValue } from '@verbb/plugin-kit-react/components';

const sourceOptions = [
    { label: 'Blog', value: 'blog' },
    { label: 'Blog: Another', value: 'blog-another' },
    { label: 'Blog: Auto-Title', value: 'blog-auto-title' },
    { label: 'Blog: Blog', value: 'blog-blog' },
    { label: 'CP Custom Source', value: 'cp-custom' },
    { label: 'Dynamic Title', value: 'dynamic-title' },
    { label: 'Dynamic Title: Dynamic Title', value: 'dynamic-title-dt' },
    { label: 'Formie Form Translate', value: 'formie-translate' },
];

export function CheckboxSelectAllOptionExample() {
    const [value, setValue] = useState<CheckboxSelectValue>([]);

    return (
        <div className="text-sm">
            <h3 className="mb-2 text-sm font-bold">Sources</h3>
            <p className="mb-3 text-slate-600">Which sources do you want to select entries from?</p>
            <CheckboxSelect
                options={sourceOptions}
                value={value}
                onChange={setValue}
                showAllOption
                allLabel="All entries"
            />
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

function ValuePreview({ value }: { value: CheckboxSelectValue }) {
    return (
        <div className="rounded bg-slate-100 p-3 text-xs font-mono">
            <strong>Value:</strong> {JSON.stringify(value)}
        </div>
    );
}

function CheckboxSelectAllOptionPreview() {
    const [value, setValue] = useState<CheckboxSelectValue>([]);

    return (
        <div className="space-y-4 text-sm">
            <div>
                <h3 className="mb-2 text-sm font-bold">Sources</h3>
                <p className="mb-3 text-slate-600">Which sources do you want to select entries from?</p>
                <CheckboxSelect
                    options={sourceOptions}
                    value={value}
                    onChange={setValue}
                    showAllOption
                    allLabel="All entries"
                />
            </div>
            <ValuePreview value={value} />
        </div>
    );
}

const preview: PreviewSourceDefinition = {
    label: 'All Option',
    title: 'All option example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxSelectAllOptionPreview />
        </div>
    ),
};

export default preview;
