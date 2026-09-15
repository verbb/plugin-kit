import { useEffect, useState, useSyncExternalStore, type CSSProperties } from 'react';

import { Button } from '@verbb/plugin-kit-react/components';
import { SchemaFormEngine, useSchemaFormEngine } from '@verbb/plugin-kit-react/forms';
import { setTranslateFunction } from '@verbb/plugin-kit-forms';
import { PlaygroundPage, PlaygroundSection, PreviewCard } from '../shared/playgroundLayouts.js';
import type { SurfacePreviewDefinition } from '../types.js';

// Keep this workshop form focused on required fields, validation, and a
// lightswitch-driven conditional field; other facades have their own previews.
const schema = [
    {
        $field: 'text',
        name: 'title',
        label: 'Title',
        instructions: 'Required single-line text.',
        required: true,
        placeholder: 'Launch announcement',
    },
    {
        $field: 'select',
        name: 'category',
        label: 'Category',
        required: true,
        placeholder: 'Select a category',
        options: [
            { label: 'Marketing', value: 'marketing' },
            { label: 'Product', value: 'product' },
            { label: 'Support', value: 'support' },
        ],
    },
    {
        $field: 'lightswitch',
        name: 'enabled',
        label: 'Add internal notes',
        instructions: 'Toggle to reveal the conditional field below.',
    },
    {
        $field: 'text',
        name: 'notes',
        label: 'Internal notes',
        instructions: 'Only visible (and validated) when the switch is on.',
        required: true,
        if: 'enabled == true',
    },
];

const schemaIndex = {
    schema,
    fieldEntries: schema.map((field) => {
        return { path: field.name as string, field };
    }),
};

const defaultValues = {
    title: '',
    category: '',
    enabled: false,
    notes: '',
};

const gridStyle: CSSProperties = {
    display: 'grid',
    gap: '16px',
    maxWidth: '520px',
};

const panelStyle: CSSProperties = {
    marginTop: '16px',
    borderRadius: '8px',
    border: '1px solid var(--pk-color-border, rgb(203 213 225))',
    background: 'var(--pk-color-surface-muted, rgb(248 250 252))',
    overflow: 'hidden',
};

const panelHeaderStyle: CSSProperties = {
    padding: '8px 16px',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    color: 'var(--pk-color-text-muted, rgb(51 65 85))',
    borderBottom: '1px solid var(--pk-color-border, rgb(203 213 225))',
};

const panelCodeStyle: CSSProperties = {
    margin: 0,
    padding: '14px 16px',
    overflowX: 'auto',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '12px',
    lineHeight: 1.6,
    color: 'var(--pk-color-text, rgb(51 65 85))',
    whiteSpace: 'pre',
};

function SchemaFormDemo() {
    const form = useSchemaFormEngine({ schemaIndex, defaultValues });
    const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

    useEffect(() => {
        // Craft is absent in the standalone workshop; retain its parameter interpolation.
        setTranslateFunction((_category, message, params) => message.replace(/\{([^}]+)\}/g, (_match, key: string) => params?.[key] ?? `{${key}}`));
        return () => setTranslateFunction();
    }, []);

    const values = useSyncExternalStore(
        form.store.subscribe.bind(form.store),
        () => { return form.store.state.values || defaultValues; },
        () => { return defaultValues; },
    );

    useEffect(() => {
        form.onSubmit(async (nextValues) => {
            setSubmitted({ ...nextValues });
        });
    }, [form]);

    return (
        <div>
            <form
                style={gridStyle}
                onSubmit={(event) => {
                    event.preventDefault();
                    form.handleSubmit();
                }}
            >
                <SchemaFormEngine form={form} withoutForm className="pg-schemaform-fields" />

                <div>
                    <Button type="submit" variant="primary">Submit</Button>
                </div>
            </form>

            <div className="pg-schemaform-live-values" style={panelStyle}>
                <div style={panelHeaderStyle}>Live values</div>
                <pre style={panelCodeStyle}>{JSON.stringify(values, null, 2)}</pre>
            </div>

            {submitted ? (
                <div style={panelStyle}>
                    <div style={panelHeaderStyle}>Last submitted payload</div>
                    <pre style={panelCodeStyle}>{JSON.stringify(submitted, null, 2)}</pre>
                </div>
            ) : null}
        </div>
    );
}

function FieldPreviewPage() {
    return (
        <PlaygroundPage
            eyebrow="Workshop"
            title="Field & SchemaForm"
            description="Live SchemaForm engine driving the React field facades: labels, instructions, conditional visibility, and validation-on-submit — all rendered through pk-field."
        >
            <PlaygroundSection
                title="Schema-driven form"
                description="One schema, rendered by the engine. Submitting an empty required field surfaces validation; toggling the switch reveals a conditional, conditionally-validated field."
            >
                <PreviewCard>
                    <SchemaFormDemo />
                </PreviewCard>
            </PlaygroundSection>
        </PlaygroundPage>
    );
}

export const formsPreview: SurfacePreviewDefinition = {
    id: 'field',
    title: 'Field',
    Component: FieldPreviewPage,
};
