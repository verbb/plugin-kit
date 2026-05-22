const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'group',
        'name': 'seo',
        'label': 'SEO',
        'children': [
            { '$field': 'text', 'name': 'title', 'label': 'SEO title' },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "group",
  "name": "seo",
  "label": "SEO",
  "children": [
    { "$field": "text", "name": "title", "label": "SEO title" }
  ]
}\`,
    schema,
    fieldEntries: [{ path: 'seo.title', field: { '$field': 'text', 'name': 'title', 'label': 'SEO title' } }],
    defaultValues: {
    seo: {
        title: 'Homepage',
    },
},
    showValues: true,
});

export default preview;
`;export{e as default};
