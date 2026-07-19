import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'checkboxSelect',
        'name': 'tags',
        'label': 'Tags',
        'showAllOption': true,
        'options': [
            { 'value': 'a', 'label': 'Option A' },
            { 'value': 'b', 'label': 'Option B' },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "checkboxSelect",
  "name": "tags",
  "label": "Tags",
  "showAllOption": true,
  "options": [
    { "value": "a", "label": "Option A" },
    { "value": "b", "label": "Option B" }
  ]
}`,
    schema,
    fieldEntries: [
    {
        path: 'tags',
        field: {
            '$field': 'checkboxSelect',
            'name': 'tags',
            'label': 'Tags',
            'showAllOption': true,
            'options': [
                { 'value': 'a', 'label': 'Option A' },
                { 'value': 'b', 'label': 'Option B' },
            ],
        },
    },
],
    defaultValues: {
    tags: ['a'],
},
    showValues: true,
});

export default preview;
