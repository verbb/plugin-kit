import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'table',
        'name': 'columns',
        'label': 'Columns',
        'columns': [
            { 'name': 'label', 'type': 'text', 'label': 'Label' },
            { 'name': 'required', 'type': 'lightswitch', 'label': 'Required' },
        ],
        'allowAdd': true,
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "table",
  "name": "columns",
  "label": "Columns",
  "columns": [
    { "name": "label", "type": "text", "label": "Label" },
    { "name": "required", "type": "lightswitch", "label": "Required" }
  ],
  "allowAdd": true
}`,
    schema,
    fieldEntries: [
    {
        path: 'columns',
        field: {
            '$field': 'table',
            'name': 'columns',
            'label': 'Columns',
            'columns': [
                { 'name': 'label', 'type': 'text', 'label': 'Label' },
                { 'name': 'required', 'type': 'lightswitch', 'label': 'Required' },
            ],
            'allowAdd': true,
        },
    },
],
    defaultValues: {
    columns: [
        { label: 'Title', required: true },
        { label: 'Summary', required: false },
    ],
},
    showValues: true,
});

export default preview;
