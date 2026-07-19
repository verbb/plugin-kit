import { useState } from 'react';
import {
    buildCraftCheckboxSelectComparisonHtml,
    checkboxSelectComparisonOptions,
    checkboxSelectPlaygroundSections,
} from '@verbb/plugin-kit-playground';

import { CheckboxSelect } from '@verbb/plugin-kit-react/components';
import { Field } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

const DEMO_OPTIONS = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];

function ComparisonRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="cmp-row">
            <h3 className="cmp-row-heading">{label}</h3>
            <div className="cmp-row-items">{children}</div>
        </div>
    );
}

/** React previews — one function per section id from checkboxSelectPlaygroundSpec. */
export const checkboxSelectReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>
                <div className="cmp-rows">
                    <ComparisonRow label="With “All” option">
                        <CheckboxSelect
                            showAllOption
                            allLabel="All users"
                            options={[...checkboxSelectComparisonOptions]}
                            value={[]}
                        />
                    </ComparisonRow>
                    <ComparisonRow label="All selected">
                        <CheckboxSelect
                            showAllOption
                            allLabel="All users"
                            options={[...checkboxSelectComparisonOptions]}
                            value="*"
                        />
                    </ComparisonRow>
                    <ComparisonRow label="Selected values">
                        <CheckboxSelect
                            options={[...checkboxSelectComparisonOptions]}
                            value={['admins', 'editors']}
                        />
                    </ComparisonRow>
                </div>
            </div>
            <div className="cmp-column">
                <span className="cmp-column-title">Craft</span>
                <div dangerouslySetInnerHTML={{ __html: buildCraftCheckboxSelectComparisonHtml() }} />
            </div>
        </div>
    ),

    basic: () => (
        <CheckboxSelect options={DEMO_OPTIONS} value={['contact']} />
    ),

    withAll: function WithAllSection() {
        const [value, setValue] = useState<string | string[]>('*');

        return (
            <>
                <CheckboxSelect
                    showAllOption
                    options={DEMO_OPTIONS}
                    value={value}
                    onPkChange={(event) => { setValue(event.detail.value); }}
                />
                <p
                    className="pg-demo-output"
                    style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--pk-color-gray-500)' }}
                >
                    {`Value: ${JSON.stringify(value)}`}
                </p>
            </>
        );
    },

    withLabel: () => {
        const { fieldLabel, fieldInstructions } = checkboxSelectPlaygroundSections.withLabel;

        return (
            <Field label={fieldLabel} instructions={fieldInstructions}>
                <CheckboxSelect
                    options={DEMO_OPTIONS}
                    value={['contact', 'newsletter']}
                />
            </Field>
        );
    },
};
