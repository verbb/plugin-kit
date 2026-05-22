import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';
import './configure-preview-environment';
import { Button } from '../../../src/components/Button';
import { SchemaFormEngine, useSchemaFormEngine } from '../../../src/forms';

const previewContainerStyle: CSSProperties = {
    width: '100%',
};

const panelStyle: CSSProperties = {
    marginTop: '16px',
    marginLeft: '-20px',
    marginRight: '-20px',
    marginBottom: '-16px',
    borderTop: '1px solid rgb(203 213 225)',
    background: 'rgb(248 250 252)',
};

const panelHeaderStyle: CSSProperties = {
    padding: '8px 20px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgb(51 65 85)',
    borderBottom: '1px solid rgb(203 213 225)',
};

const panelCodeStyle: CSSProperties = {
    margin: 0,
    padding: '16px 20px 18px',
    overflowX: 'auto',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
    fontSize: '12px',
    lineHeight: 1.6,
    color: 'rgb(51 65 85)',
    whiteSpace: 'pre',
};

const schema = [
    {
        '$field': 'text',
        'name': 'title',
        'label': 'Title',
        'instructions': 'Required text field',
        'required': true,
    },
    {
        '$field': 'select',
        'name': 'category',
        'label': 'Category',
        'required': true,
        'placeholder': 'Select a category',
        'options': [
            { 'label': 'Select an option', 'value': '' },
            { 'label': 'Marketing', 'value': 'marketing' },
            { 'label': 'Product', 'value': 'product' },
            { 'label': 'Support', 'value': 'support' },
        ],
    },
    {
        '$field': 'lightswitch',
        'name': 'enabled',
        'label': 'Enabled',
        'instructions': 'Toggle to reveal conditional field.',
    },
    {
        '$field': 'text',
        'name': 'notes',
        'label': 'Notes',
        'instructions': 'Only visible when enabled.',
        'if': 'enabled == true',
    },
] as const;

const schemaIndex = {
    schema,
    fieldEntries: [
        { path: 'title', field: schema[0] },
        { path: 'category', field: schema[1] },
        { path: 'enabled', field: schema[2] },
        { path: 'notes', field: schema[3] },
    ],
};

const defaultValues = {
    title: '',
    category: '',
    enabled: false,
    notes: '',
};

function MinimalWorkingSchemaFormPreview() {
    const form = useSchemaFormEngine({
        schemaIndex,
        defaultValues,
    });
    const [submittedValues, setSubmittedValues] = useState<Record<string, unknown> | null>(null);
    const currentValues = useSyncExternalStore(
        form.store.subscribe.bind(form.store),
        () => {
            return form.store.state.values || defaultValues;
        },
        () => {
            return defaultValues;
        },
    );

    useEffect(() => {
        form.onSubmit(async (values) => {
            setSubmittedValues({ ...values });
        });

        return () => {
            form.onSubmit(null);
        };
    }, [form]);

    return (
        <div style={previewContainerStyle}>
            <form
                className="grid grid-cols-1 gap-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    form.handleSubmit();
                }}
            >
                <SchemaFormEngine form={form} withoutForm className="grid grid-cols-1 gap-4" />

                <div>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </div>
            </form>

            <div style={panelStyle}>
                <div style={panelHeaderStyle}>Form Data (JSON)</div>
                <pre style={panelCodeStyle}>{JSON.stringify(currentValues, null, 2)}</pre>
            </div>

            {submittedValues && (
                <div style={panelStyle}>
                    <div style={panelHeaderStyle}>Last Submitted Payload</div>
                    <pre style={panelCodeStyle}>{JSON.stringify(submittedValues, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

const code = `const form = useSchemaFormEngine({
  schemaIndex,
  defaultValues: {
    title: "",
    category: "",
    enabled: false,
    notes: "",
  },
});

useEffect(() => {
  form.onSubmit(async (values) => {
    setSubmittedValues(values);
  });

  return () => {
    form.onSubmit(null);
  };
}, [form]);

return (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      form.handleSubmit();
    }}
    className="grid grid-cols-1 gap-4"
  >
    <SchemaFormEngine form={form} withoutForm className="grid grid-cols-1 gap-4" />

    <Button type="submit" variant="primary">
      Submit
    </Button>
  </form>
);`;

const preview: PreviewSourceDefinition = {
    label: 'Working Form Example',
    title: 'Working form example',
    language: 'tsx',
    note: 'Preview includes a native form wrapper, submit button, live values, and submitted payload.',
    code,
    render: () => <MinimalWorkingSchemaFormPreview />,
};

export default preview;
