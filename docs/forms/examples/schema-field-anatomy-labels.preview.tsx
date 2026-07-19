import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { SchemaFormPreviewHarness } from './schema-form-preview-harness';

const schema = [
    {
        $field: 'text',
        name: 'plainLabel',
        label: 'Label only',
        placeholder: 'No required indicator',
    },
    {
        $field: 'text',
        name: 'requiredLabel',
        label: 'Required label',
        required: true,
        placeholder: 'Required indicator beside the label',
    },
] satisfies Record<string, unknown>[];

const preview: PreviewSourceDefinition = {
    label: 'Labels',
    title: 'Labels',
    note: 'Schema fields render labels and required indicators through FieldLayout.',
    render: () => (
        <SchemaFormPreviewHarness
            schema={schema}
            fieldEntries={[
                { path: 'plainLabel', field: schema[0] },
                { path: 'requiredLabel', field: schema[1] },
            ]}
            defaultValues={{ plainLabel: '', requiredLabel: '' }}
        />
    ),
};

export default preview;
