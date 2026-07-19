import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { SchemaFormPreviewHarness } from './schema-form-preview-harness';

const schema = [
    {
        $field: 'text',
        name: 'plainInstructions',
        label: 'Plain instructions',
        instructions: 'Instructions can be normal text.',
        placeholder: 'Plain instruction text',
    },
    {
        $field: 'text',
        name: 'markdownInstructions',
        label: 'Markdown instructions',
        instructions: 'Instructions support **inline Markdown**, links, and code tokens like `gmail.com`.',
        placeholder: 'Formatted instruction text',
    },
] satisfies Record<string, unknown>[];

const preview: PreviewSourceDefinition = {
    label: 'Instructions',
    title: 'Instructions',
    note: 'Schema field instructions support plain text and inline Markdown.',
    render: () => (
        <SchemaFormPreviewHarness
            schema={schema}
            fieldEntries={[
                { path: 'plainInstructions', field: schema[0] },
                { path: 'markdownInstructions', field: schema[1] },
            ]}
            defaultValues={{ plainInstructions: '', markdownInstructions: '' }}
        />
    ),
};

export default preview;
