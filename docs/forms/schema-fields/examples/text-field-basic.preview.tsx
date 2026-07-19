import type { PreviewSourceDefinition } from '../../../../.vitepress/theme/components/codeBlocks';
import { SchemaFormPreviewHarness } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        $field: 'text',
        name: 'title',
        label: 'Title',
        instructions: 'Shown at the top of the widget.',
        placeholder: 'Enter a title',
        required: true,
    },
] satisfies Record<string, unknown>[];

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage',
    language: 'json',
    note: 'Preview rendered inside a minimal SchemaFormEngine fixture.',
    code: `{
  "$field": "text",
  "name": "title",
  "label": "Title",
  "instructions": "Shown at the top of the widget.",
  "placeholder": "Enter a title",
  "required": true
}`,
    render: () => (
        <SchemaFormPreviewHarness
            schema={schema}
            fieldEntries={[
                { path: 'title', field: schema[0] },
            ]}
            defaultValues={{ title: '' }}
            showValues
        />
    ),
};

export default preview;
