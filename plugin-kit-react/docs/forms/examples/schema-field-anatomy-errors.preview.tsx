import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';
import { SchemaFormPreviewHarness } from './schema-form-preview-harness';

const schema = [
    {
        $field: 'text',
        name: 'plainErrors',
        label: 'Plain error',
        placeholder: 'Plain error text',
    },
    {
        $field: 'text',
        name: 'markdownErrors',
        label: 'Markdown errors',
        placeholder: 'Formatted error text',
    },
] satisfies Record<string, unknown>[];

const preview: PreviewSourceDefinition = {
    label: 'Errors',
    title: 'Errors',
    note: 'SchemaForm receives field errors from validation or server error maps.',
    render: () => (
        <SchemaFormPreviewHarness
            schema={schema}
            fieldEntries={[
                { path: 'plainErrors', field: schema[0] },
                { path: 'markdownErrors', field: schema[1] },
            ]}
            defaultValues={{ plainErrors: '', markdownErrors: '' }}
            errors={{
                plainErrors: ['This is a plain validation error.'],
                markdownErrors: [
                    'Enter a value for **Markdown errors**.',
                    'The value `example.com` is not allowed.',
                ],
            }}
        />
    ),
};

export default preview;
