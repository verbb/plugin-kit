import { useEffect, useState, useSyncExternalStore, type CSSProperties } from 'react';

import { Button } from '@verbb/plugin-kit-react/components';
import { SchemaFormEngine, useSchemaFormEngine } from '@verbb/plugin-kit-react/forms';
import { PlaygroundPage, PlaygroundSection, PreviewCard } from '../shared/playgroundLayouts.js';
import type { SurfacePreviewDefinition } from '../types.js';

// A representative schema exercising several field facades through the engine:
// text (+ email validation), number, select, radio group, color, lightswitch, and a
// conditional text field driven by `if`.
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
        $field: 'text',
        name: 'email',
        label: 'Reply-to email',
        instructions: 'Optional, but must be a valid email when provided.',
        validation: 'email',
        placeholder: 'you@example.com',
    },
    {
        $field: 'number',
        name: 'priority',
        label: 'Priority',
        instructions: 'Higher runs first.',
        size: 6,
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
        $field: 'radioGroup',
        name: 'visibility',
        label: 'Visibility',
        options: [
            { label: 'Everyone', value: 'public' },
            { label: 'Team only', value: 'team' },
            { label: 'Just me', value: 'private' },
        ],
    },
    {
        $field: 'color',
        name: 'accent',
        label: 'Accent colour',
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
    email: '',
    priority: 1,
    category: '',
    visibility: 'public',
    accent: '#e12d39',
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
                <SchemaFormEngine form={form} withoutForm />

                <div>
                    <Button type="submit" variant="primary">Submit</Button>
                </div>
            </form>

            <div style={panelStyle}>
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
