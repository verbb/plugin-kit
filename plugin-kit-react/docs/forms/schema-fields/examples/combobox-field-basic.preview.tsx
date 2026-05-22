import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'combobox',
        'name': 'country',
        'label': 'Country',
        'multiple': false,
        'options': [
            { 'value': 'us', 'label': 'United States' },
            { 'value': 'au', 'label': 'Australia' },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "combobox",
  "name": "country",
  "label": "Country",
  "multiple": false,
  "options": [{ "value": "us", "label": "United States" }]
}`,
    schema,
    fieldEntries: [
    {
        path: 'country',
        field: {
            '$field': 'combobox',
            'name': 'country',
            'label': 'Country',
            'multiple': false,
            'options': [
                { 'value': 'us', 'label': 'United States' },
                { 'value': 'au', 'label': 'Australia' },
            ],
        },
    },
],
    defaultValues: {
    country: 'us',
},
    showValues: true,
});

export default preview;
