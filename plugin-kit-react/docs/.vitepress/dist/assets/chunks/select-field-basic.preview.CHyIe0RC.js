const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'select',
        'name': 'status',
        'label': 'Status',
        'options': [
            { 'value': 'live', 'label': 'Live' },
            { 'value': 'draft', 'label': 'Draft' },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "select",
  "name": "status",
  "label": "Status",
  "options": [
    { "value": "live", "label": "Live" },
    { "value": "draft", "label": "Draft" }
  ]
}\`,
    schema,
    fieldEntries: [
    {
        path: 'status',
        field: {
            '$field': 'select',
            'name': 'status',
            'label': 'Status',
            'options': [
                { 'value': 'live', 'label': 'Live' },
                { 'value': 'draft', 'label': 'Draft' },
            ],
        },
    },
],
    defaultValues: {
    status: 'live',
},
    showValues: true,
});

export default preview;
`;export{e as default};
