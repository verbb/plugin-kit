const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'list',
        'name': 'items',
        'label': 'Items',
        'schema': [
            { '$field': 'text', 'name': 'title', 'label': 'Row title' },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "list",
  "name": "items",
  "label": "Items",
  "schema": [
    { "$field": "text", "name": "title", "label": "Row title" }
  ]
}\`,
    schema,
    fieldEntries: [{ path: 'items.*.title', field: { '$field': 'text', 'name': 'title', 'label': 'Row title' } }],
    defaultValues: {
    items: [
        { title: 'First item' },
    ],
},
    showValues: true,
});

export default preview;
`;export{e as default};
