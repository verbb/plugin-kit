const e=`import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import { SchemaFormPreviewHarness } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        $cmp: 'FieldWrap',
        name: 'settings',
        label: 'Settings',
        instructions: 'Optional help text.',
        children: [
            {
                $field: 'text',
                name: 'settings.title',
                label: 'Title',
            },
            {
                $field: 'lightswitch',
                name: 'settings.enabled',
                label: 'Enabled',
            },
        ],
    },
] satisfies Record<string, unknown>[];

const children = schema[0].children as Record<string, unknown>[];

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage',
    language: 'json',
    note: 'Preview rendered inside a minimal SchemaFormEngine fixture.',
    code: \`{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" },
    { "$field": "lightswitch", "name": "settings.enabled", "label": "Enabled" }
  ]
}\`,
    render: () => (
        <SchemaFormPreviewHarness
            schema={schema}
            fieldEntries={[
                { path: 'settings.title', field: children[0] },
                { path: 'settings.enabled', field: children[1] },
            ]}
            defaultValues={{
                settings: {
                    title: 'My Widget',
                    enabled: true,
                },
            }}
        />
    ),
};

export default preview;
`;export{e as default};
