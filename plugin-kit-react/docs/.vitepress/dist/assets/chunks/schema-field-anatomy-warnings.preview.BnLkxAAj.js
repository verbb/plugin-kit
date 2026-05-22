const n=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';
import { SchemaFormPreviewHarness } from './schema-form-preview-harness';

const schema = [
    {
        $field: 'text',
        name: 'plainWarning',
        label: 'Plain warning',
        warning: 'This is a plain warning.',
        placeholder: 'Plain warning text',
    },
    {
        $field: 'text',
        name: 'markdownWarning',
        label: 'Markdown warning',
        warning: 'Warnings can include \`code\`, **emphasis**, and links.',
        placeholder: 'Formatted warning text',
    },
] satisfies Record<string, unknown>[];

const preview: PreviewSourceDefinition = {
    label: 'Warnings',
    title: 'Warnings',
    note: 'Warnings are non-blocking guidance rendered below field errors.',
    render: () => (
        <SchemaFormPreviewHarness
            schema={schema}
            fieldEntries={[
                { path: 'plainWarning', field: schema[0] },
                { path: 'markdownWarning', field: schema[1] },
            ]}
            defaultValues={{ plainWarning: '', markdownWarning: '' }}
        />
    ),
};

export default preview;
`;export{n as default};
